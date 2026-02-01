import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { PlayersModule } from './players/players.module.js';

@Module({
  imports: [
    // Cargar variables de entorno globalmente
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Módulo de Prisma (global)
    PrismaModule,
    // Módulo de autenticación
    AuthModule,
    // Módulo de jugadores
    PlayersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
