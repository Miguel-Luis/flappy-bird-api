import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
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
  ApiQuery,
} from '@nestjs/swagger';
import { GamesService } from './games.service.js';
import { CreateGameDto, UpdateGameDto } from './dto/index.js';
import { JwtAuthGuard } from '../common/index.js';

/**
 * Controlador de partidas/puntuaciones
 * Todos los endpoints requieren autenticación JWT
 */
@ApiTags('Partidas')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  /**
   * POST /games
   * Crear una nueva partida
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar nueva partida' })
  @ApiResponse({
    status: 201,
    description: 'Partida registrada exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'El jugador no existe.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o expirado.',
  })
  async create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  /**
   * GET /games
   * Obtener todas las partidas
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todas las partidas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de partidas obtenida exitosamente.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o expirado.',
  })
  async findAll() {
    return this.gamesService.findAll();
  }

  /**
   * GET /games/ranking
   * Obtener el ranking de mejores puntuaciones
   */
  @Get('ranking')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener ranking de mejores puntuaciones' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Número de resultados a retornar (por defecto 10)',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Ranking obtenido exitosamente.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o expirado.',
  })
  async getTopScores(@Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    return this.gamesService.getTopScores(parsedLimit);
  }

  /**
   * GET /games/player/:playerId
   * Obtener partidas de un jugador específico
   */
  @Get('player/:playerId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener partidas de un jugador' })
  @ApiParam({
    name: 'playerId',
    description: 'ID del jugador (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Partidas del jugador obtenidas exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Jugador no encontrado.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o expirado.',
  })
  async findByPlayer(@Param('playerId') playerId: string) {
    return this.gamesService.findByPlayer(playerId);
  }

  /**
   * GET /games/:id
   * Obtener una partida por ID
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener una partida por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la partida (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Partida encontrada.',
  })
  @ApiResponse({
    status: 404,
    description: 'Partida no encontrada.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o expirado.',
  })
  async findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }

  /**
   * PUT /games/:id
   * Actualizar una partida
   */
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar puntuación de una partida' })
  @ApiParam({
    name: 'id',
    description: 'ID de la partida (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Partida actualizada exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Partida no encontrada.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o expirado.',
  })
  async update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(id, updateGameDto);
  }

  /**
   * DELETE /games/:id
   * Eliminar una partida
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar una partida' })
  @ApiParam({
    name: 'id',
    description: 'ID de la partida a eliminar (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Partida eliminada exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Partida no encontrada.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o expirado.',
  })
  async remove(@Param('id') id: string) {
    return this.gamesService.remove(id);
  }
}
