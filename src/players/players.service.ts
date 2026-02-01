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

    // Verificar si el jugador ya existe
    const existingPlayer = await this.prisma.players.findUnique({
      where: { name },
    });

    if (existingPlayer) {
      throw new ConflictException(`El jugador "${name}" ya existe`);
    }

    // Crear el jugador
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
   * Obtener un jugador por nombre
   */
  async findOne(name: string): Promise<PlayerResponse> {
    const player = await this.prisma.players.findUnique({
      where: { name },
    });

    if (!player) {
      throw new NotFoundException(`Jugador "${name}" no encontrado`);
    }

    return player;
  }

  /**
   * Actualizar un jugador (cambiar nombre)
   */
  async update(
    currentName: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<PlayerResponse> {
    const { name: newName } = updatePlayerDto;

    // Verificar que el jugador existe
    const existingPlayer = await this.prisma.players.findUnique({
      where: { name: currentName },
    });

    if (!existingPlayer) {
      throw new NotFoundException(`Jugador "${currentName}" no encontrado`);
    }

    // Si el nombre es diferente, verificar que no exista otro con ese nombre
    if (newName !== currentName) {
      const playerWithNewName = await this.prisma.players.findUnique({
        where: { name: newName },
      });

      if (playerWithNewName) {
        throw new ConflictException(`El nombre "${newName}" ya está en uso`);
      }
    }

    // Actualizar el jugador
    const player = await this.prisma.players.update({
      where: { name: currentName },
      data: { name: newName },
    });

    return player;
  }

  /**
   * Eliminar un jugador
   */
  async remove(name: string): Promise<{ message: string }> {
    // Verificar que el jugador existe
    const existingPlayer = await this.prisma.players.findUnique({
      where: { name },
    });

    if (!existingPlayer) {
      throw new NotFoundException(`Jugador "${name}" no encontrado`);
    }

    // Eliminar el jugador (las partidas se eliminan en cascada)
    await this.prisma.players.delete({
      where: { name },
    });

    return { message: `Jugador "${name}" eliminado exitosamente` };
  }
}
