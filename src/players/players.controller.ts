import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { PlayersService } from './players.service.js';
import { CreatePlayerDto, UpdatePlayerDto } from './dto/index.js';
import { JwtAuthGuard } from '../common/index.js';

/**
 * Controlador de jugadores
 * Todos los endpoints requieren autenticación JWT
 */
@ApiTags('Jugadores')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  /**
   * POST /players
   * Crear un nuevo jugador
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear nuevo jugador' })
  @ApiResponse({
    status: 201,
    description: 'Jugador creado exitosamente.',
  })
  @ApiResponse({
    status: 409,
    description: 'El jugador ya existe.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o expirado.',
  })
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  /**
   * GET /players
   * Obtener todos los jugadores
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todos los jugadores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de jugadores obtenida exitosamente.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o expirado.',
  })
  async findAll() {
    return this.playersService.findAll();
  }

  /**
   * GET /players/:name
   * Obtener un jugador por nombre
   */
  @Get(':name')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener un jugador por nombre' })
  @ApiParam({
    name: 'name',
    description: 'Nombre del jugador',
    example: 'jugador1',
  })
  @ApiResponse({
    status: 200,
    description: 'Jugador encontrado.',
  })
  @ApiResponse({
    status: 404,
    description: 'Jugador no encontrado.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o expirado.',
  })
  async findOne(@Param('name') name: string) {
    return this.playersService.findOne(name);
  }

  /**
   * PUT /players/:name
   * Actualizar un jugador (cambiar nombre)
   */
  @Put(':name')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar jugador (cambiar nombre)' })
  @ApiParam({
    name: 'name',
    description: 'Nombre actual del jugador',
    example: 'jugador1',
  })
  @ApiResponse({
    status: 200,
    description: 'Jugador actualizado exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Jugador no encontrado.',
  })
  @ApiResponse({
    status: 409,
    description: 'El nuevo nombre ya está en uso.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o expirado.',
  })
  async update(
    @Param('name') name: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return this.playersService.update(name, updatePlayerDto);
  }

  /**
   * DELETE /players/:name
   * Eliminar un jugador
   */
  @Delete(':name')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar jugador' })
  @ApiParam({
    name: 'name',
    description: 'Nombre del jugador a eliminar',
    example: 'jugador1',
  })
  @ApiResponse({
    status: 200,
    description: 'Jugador eliminado exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Jugador no encontrado.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o expirado.',
  })
  async remove(@Param('name') name: string) {
    return this.playersService.remove(name);
  }
}
