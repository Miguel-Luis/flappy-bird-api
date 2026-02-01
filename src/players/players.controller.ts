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
   * GET /players/:id
   * Obtener un jugador por ID
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener un jugador por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del jugador (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
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
  async findOne(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }

  /**
   * PUT /players/:id
   * Actualizar un jugador
   */
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar jugador' })
  @ApiParam({
    name: 'id',
    description: 'ID del jugador (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
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
    @Param('id') id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return this.playersService.update(id, updatePlayerDto);
  }

  /**
   * DELETE /players/:id
   * Eliminar un jugador
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar jugador' })
  @ApiParam({
    name: 'id',
    description: 'ID del jugador a eliminar (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
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
  async remove(@Param('id') id: string) {
    return this.playersService.remove(id);
  }
}
