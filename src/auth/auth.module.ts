import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { getExpirationInSeconds } from '../common/index.js';

/**
 * Módulo de autenticación
 * Configura JWT, Passport y expone el controlador y servicio de auth
 */
@Module({
  imports: [
    // Módulo de Passport para estrategias de autenticación
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // Módulo JWT configurado asíncronamente para usar variables de entorno
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          // Convertir a segundos (por defecto 1 hora = 3600 segundos)
          expiresIn: getExpirationInSeconds(
            configService.get<string>('JWT_EXPIRES_IN'),
            3600,
          ),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
