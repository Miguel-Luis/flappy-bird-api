import { IsInt, Min, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO para actualizar una partida
 * Solo se puede actualizar la puntuación
 */
export class UpdateGameDto {
  @ApiPropertyOptional({
    description: 'Nueva puntuación de la partida',
    example: 150,
    minimum: 0,
  })
  @IsOptional()
  @IsInt({ message: 'La puntuación debe ser un número entero' })
  @Min(0, { message: 'La puntuación no puede ser negativa' })
  score?: number;
}
