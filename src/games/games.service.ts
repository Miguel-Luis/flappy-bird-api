import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateGameDto, UpdateGameDto } from './dto/index.js';

/**
 * Interfaz para la respuesta de una partida
 */
export interface GameResponse {
  id: string;
  player_id: string;
  score: number;
  achieved_at: Date;
}

/**
 * Interfaz para la respuesta de una partida con datos del jugador
 */
export interface GameWithPlayerResponse extends GameResponse {
  player: {
    name: string;
    created_at: Date;
    updated_at: Date;
  };
}

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crear una nueva partida
   */
  async create(createGameDto: CreateGameDto): Promise<GameResponse> {
    const { player_id, score } = createGameDto;

    // Verificar que el jugador existe
    const player = await this.prisma.players.findUnique({
      where: { name: player_id },
    });

    if (!player) {
      throw new BadRequestException(`El jugador "${player_id}" no existe`);
    }

    // Crear la partida
    const game = await this.prisma.games.create({
      data: {
        player_id,
        score,
      },
    });

    return game;
  }

  /**
   * Obtener todas las partidas
   */
  async findAll(): Promise<GameWithPlayerResponse[]> {
    return this.prisma.games.findMany({
      include: { player: true },
      orderBy: { achieved_at: 'desc' },
    });
  }

  /**
   * Obtener partidas por jugador
   */
  async findByPlayer(playerName: string): Promise<GameResponse[]> {
    // Verificar que el jugador existe
    const player = await this.prisma.players.findUnique({
      where: { name: playerName },
    });

    if (!player) {
      throw new NotFoundException(`Jugador "${playerName}" no encontrado`);
    }

    return this.prisma.games.findMany({
      where: { player_id: playerName },
      orderBy: { achieved_at: 'desc' },
    });
  }

  /**
   * Obtener una partida por ID
   */
  async findOne(id: string): Promise<GameWithPlayerResponse> {
    const game = await this.prisma.games.findUnique({
      where: { id },
      include: { player: true },
    });

    if (!game) {
      throw new NotFoundException(`Partida con ID "${id}" no encontrada`);
    }

    return game;
  }

  /**
   * Obtener el ranking (top scores)
   */
  async getTopScores(limit: number = 10): Promise<GameWithPlayerResponse[]> {
    return this.prisma.games.findMany({
      include: { player: true },
      orderBy: { score: 'desc' },
      take: limit,
    });
  }

  /**
   * Actualizar una partida
   */
  async update(id: string, updateGameDto: UpdateGameDto): Promise<GameResponse> {
    // Verificar que la partida existe
    const existingGame = await this.prisma.games.findUnique({
      where: { id },
    });

    if (!existingGame) {
      throw new NotFoundException(`Partida con ID "${id}" no encontrada`);
    }

    // Actualizar la partida
    const game = await this.prisma.games.update({
      where: { id },
      data: updateGameDto,
    });

    return game;
  }

  /**
   * Eliminar una partida
   */
  async remove(id: string): Promise<{ message: string }> {
    // Verificar que la partida existe
    const existingGame = await this.prisma.games.findUnique({
      where: { id },
    });

    if (!existingGame) {
      throw new NotFoundException(`Partida con ID "${id}" no encontrada`);
    }

    // Eliminar la partida
    await this.prisma.games.delete({
      where: { id },
    });

    return { message: `Partida con ID "${id}" eliminada exitosamente` };
  }
}
