import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller.js';
import { PlayersService } from './players.service.js';

/**
 * Módulo de jugadores
 * Gestiona las operaciones CRUD de jugadores
 */
@Module({
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
