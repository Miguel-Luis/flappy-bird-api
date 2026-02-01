import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para el inicio de sesión
 * Valida las credenciales del usuario
 */
export class LoginDto {
  @ApiProperty({
    description: 'Nombre de usuario',
    example: 'jugador1',
  })
  @IsString({ message: 'El nombre de usuario debe ser texto' })
  @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
  user_name: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'miPassword123',
  })
  @IsString({ message: 'La contraseña debe ser texto' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;
}
