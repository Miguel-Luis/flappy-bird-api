import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para refrescar el token de acceso
 * Recibe el refresh token para generar un nuevo access token
 */
export class RefreshTokenDto {
  @ApiProperty({
    description: 'Token de refresco para obtener un nuevo access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString({ message: 'El refresh token debe ser texto' })
  @IsNotEmpty({ message: 'El refresh token es requerido' })
  refresh_token: string;
}
