import { IsString, IsNotEmpty, IsInt, Min, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para crear una nueva partida/puntuación
 */
export class CreateGameDto {
  @ApiProperty({
    description: 'ID del jugador que realizó la partida (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString({ message: 'El ID del jugador debe ser texto' })
  @IsNotEmpty({ message: 'El ID del jugador es requerido' })
  @IsUUID('4', { message: 'El ID del jugador debe ser un UUID válido' })
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
