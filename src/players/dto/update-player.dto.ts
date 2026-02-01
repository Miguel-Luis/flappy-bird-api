import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para actualizar un jugador
 */
export class UpdatePlayerDto {
  @ApiProperty({
    description: 'Nuevo nombre del jugador',
    example: 'nuevoNombre',
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres' })
  name: string;
}
