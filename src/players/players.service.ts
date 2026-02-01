import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePlayerDto, UpdatePlayerDto } from './dto/index.js';

/**
 * Interfaz para la respuesta de un jugador
 */
export interface PlayerResponse {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

@Injectable()
export class PlayersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crear un nuevo jugador
   */
  async create(createPlayerDto: CreatePlayerDto): Promise<PlayerResponse> {
    const { name } = createPlayerDto;

    // Verificar si el jugador ya existe (por nombre único)
    const existingPlayer = await this.prisma.players.findUnique({
      where: { name },
    });

    if (existingPlayer) {
      throw new ConflictException(`El jugador "${name}" ya existe`);
    }

    // Crear el jugador (el ID se genera automáticamente)
    const player = await this.prisma.players.create({
      data: { name },
    });

    return player;
  }

  /**
   * Obtener todos los jugadores
   */
  async findAll(): Promise<PlayerResponse[]> {
    return this.prisma.players.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  /**
   * Obtener un jugador por ID
   */
  async findOne(id: string): Promise<PlayerResponse> {
    const player = await this.prisma.players.findUnique({
      where: { id },
    });

    if (!player) {
      throw new NotFoundException(`Jugador con ID "${id}" no encontrado`);
    }

    return player;
  }

  /**
   * Actualizar un jugador
   */
  async update(
    id: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<PlayerResponse> {
    // Verificar que el jugador existe
    const existingPlayer = await this.prisma.players.findUnique({
      where: { id },
    });

    if (!existingPlayer) {
      throw new NotFoundException(`Jugador con ID "${id}" no encontrado`);
    }

    // Si se está cambiando el nombre, verificar que no exista otro con ese nombre
    if (updatePlayerDto.name && updatePlayerDto.name !== existingPlayer.name) {
      const playerWithNewName = await this.prisma.players.findUnique({
        where: { name: updatePlayerDto.name },
      });

      if (playerWithNewName) {
        throw new ConflictException(`El nombre "${updatePlayerDto.name}" ya está en uso`);
      }
    }

    // Actualizar el jugador
    const player = await this.prisma.players.update({
      where: { id },
      data: updatePlayerDto,
    });

    return player;
  }

  /**
   * Eliminar un jugador
   */
  async remove(id: string): Promise<{ message: string }> {
    // Verificar que el jugador existe
    const existingPlayer = await this.prisma.players.findUnique({
      where: { id },
    });

    if (!existingPlayer) {
      throw new NotFoundException(`Jugador con ID "${id}" no encontrado`);
    }

    // Eliminar el jugador (las partidas se eliminan en cascada)
    await this.prisma.players.delete({
      where: { id },
    });

    return { message: `Jugador "${existingPlayer.name}" eliminado exitosamente` };
  }
}
