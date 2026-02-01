import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto/index.js';
import { getExpirationInSeconds } from '../common/index.js';

/**
 * Interfaz para el payload del JWT
 */
interface JwtPayload {
  sub: string; // ID de la sesión
  user_name: string;
}

/**
 * Interfaz para la respuesta de tokens
 */
export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Registrar un nuevo usuario
   * Crea una nueva sesión con las credenciales hasheadas
   */
  async register(registerDto: RegisterDto): Promise<TokenResponse> {
    const { user_name, password } = registerDto;

    // Verificar si el usuario ya existe
    const existingUser = await this.prisma.auth_sessions.findFirst({
      where: { user_name },
    });

    if (existingUser) {
      throw new ConflictException('El nombre de usuario ya está en uso');
    }

    // Hashear la contraseña
    const hashedPassword = await this.hashData(password);

    // Crear la sesión del usuario
    const session = await this.prisma.auth_sessions.create({
      data: {
        user_name,
        password: hashedPassword,
      },
    });

    // Generar tokens
    const tokens = await this.generateTokens(session.id, session.user_name);

    // Guardar el refresh token hasheado
    await this.updateRefreshToken(session.id, tokens.refresh_token);

    return tokens;
  }

  /**
   * Iniciar sesión con credenciales existentes
   * Valida las credenciales y genera nuevos tokens
   */
  async login(loginDto: LoginDto): Promise<TokenResponse> {
    const { user_name, password } = loginDto;

    // Buscar la sesión del usuario
    const session = await this.prisma.auth_sessions.findFirst({
      where: { user_name },
    });

    if (!session) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, session.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar nuevos tokens
    const tokens = await this.generateTokens(session.id, session.user_name);

    // Actualizar el refresh token
    await this.updateRefreshToken(session.id, tokens.refresh_token);

    return tokens;
  }

  /**
   * Refrescar el token de acceso
   * Valida el refresh token y genera un nuevo access token
   */
  async refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<TokenResponse> {
    const { refresh_token } = refreshTokenDto;

    // Decodificar el refresh token para obtener el ID de sesión
    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify(refresh_token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }

    // Buscar la sesión
    const session = await this.prisma.auth_sessions.findUnique({
      where: { id: payload.sub },
    });

    if (!session || !session.refresh_token) {
      throw new UnauthorizedException('Sesión no encontrada o cerrada');
    }

    // Verificar que el refresh token coincida
    const isRefreshTokenValid = await bcrypt.compare(
      refresh_token,
      session.refresh_token,
    );

    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    // Generar nuevos tokens
    const tokens = await this.generateTokens(session.id, session.user_name);

    // Actualizar el refresh token
    await this.updateRefreshToken(session.id, tokens.refresh_token);

    return tokens;
  }

  /**
   * Cerrar sesión
   * Elimina el refresh token de la base de datos
   */
  async logout(sessionId: string): Promise<{ message: string }> {
    const session = await this.prisma.auth_sessions.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException('Sesión no encontrada');
    }

    // Eliminar el refresh token
    await this.prisma.auth_sessions.update({
      where: { id: sessionId },
      data: { refresh_token: null },
    });

    return { message: 'Sesión cerrada exitosamente' };
  }

  /**
   * Hashear datos usando bcrypt
   */
  private async hashData(data: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(data, saltRounds);
  }

  /**
   * Generar access token y refresh token
   */
  private async generateTokens(
    sessionId: string,
    userName: string,
  ): Promise<TokenResponse> {
    const payload: JwtPayload = {
      sub: sessionId,
      user_name: userName,
    };

    // Obtener tiempo de expiración del access token (por defecto 1 hora = 3600 segundos)
    const accessTokenExpiration = getExpirationInSeconds(
      this.configService.get<string>('JWT_EXPIRES_IN'),
      3600,
    );

    const [accessToken, refreshToken] = await Promise.all([
      // Access token: expira según JWT_EXPIRES_IN
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: accessTokenExpiration,
      }),
      // Refresh token: expira en 7 días (604800 segundos)
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: 604800,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  /**
   * Actualizar el refresh token hasheado en la base de datos
   */
  private async updateRefreshToken(
    sessionId: string,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await this.hashData(refreshToken);

    await this.prisma.auth_sessions.update({
      where: { id: sessionId },
      data: { refresh_token: hashedRefreshToken },
    });
  }
}
