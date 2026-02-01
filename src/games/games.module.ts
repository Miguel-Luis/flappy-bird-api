import { Module } from '@nestjs/common';
import { GamesController } from './games.controller.js';
import { GamesService } from './games.service.js';

/**
 * Módulo de partidas/puntuaciones
 * Gestiona las operaciones CRUD de partidas
 */
@Module({
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService],
})
export class GamesModule {}
