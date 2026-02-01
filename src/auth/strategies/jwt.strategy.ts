import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service.js';

/**
 * Interfaz para el payload del JWT
 */
interface JwtPayload {
  sub: string; // ID de la sesión
  user_name: string;
}

/**
 * Estrategia JWT para Passport
 * Valida el token y extrae la información del usuario
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');

    if (!jwtSecret) {
      throw new Error('JWT_SECRET no está configurado en las variables de entorno');
    }

    super({
      // Extraer el token del header Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // No ignorar la expiración del token
      ignoreExpiration: false,
      // Clave secreta para verificar el token
      secretOrKey: jwtSecret,
    });
  }

  /**
   * Validar el payload del JWT
   * Este método es llamado automáticamente por Passport después de verificar el token
   * El valor retornado se adjunta a request.user
   */
  async validate(payload: JwtPayload) {
    // Verificar que la sesión existe y tiene refresh token (no está cerrada)
    const session = await this.prisma.auth_sessions.findUnique({
      where: { id: payload.sub },
    });

    if (!session || !session.refresh_token) {
      throw new UnauthorizedException('Sesión inválida o cerrada');
    }

    // Retornar los datos del usuario que estarán disponibles en request.user
    return {
      sessionId: payload.sub,
      userName: payload.user_name,
    };
  }
}
