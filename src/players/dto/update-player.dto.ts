import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO para actualizar un jugador
 */
export class UpdatePlayerDto {
  @ApiPropertyOptional({
    description: 'Nuevo nombre del jugador',
    example: 'nuevoNombre',
    minLength: 2,
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres' })
  name?: string;
}
