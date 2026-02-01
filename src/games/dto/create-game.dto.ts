import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para crear una nueva partida/puntuación
 */
export class CreateGameDto {
  @ApiProperty({
    description: 'Nombre del jugador que realizó la partida',
    example: 'jugador1',
  })
  @IsString({ message: 'El nombre del jugador debe ser texto' })
  @IsNotEmpty({ message: 'El nombre del jugador es requerido' })
  player_id: string;

  @ApiProperty({
    description: 'Puntuación obtenida en la partida',
    example: 100,
    minimum: 0,
  })
  @IsInt({ message: 'La puntuación debe ser un número entero' })
  @Min(0, { message: 'La puntuación no puede ser negativa' })
  score: number;
}
