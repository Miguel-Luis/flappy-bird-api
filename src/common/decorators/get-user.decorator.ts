import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Interfaz para el usuario autenticado
 */
export interface AuthenticatedUser {
  sessionId: string;
  userName: string;
}

/**
 * Decorador para obtener el usuario autenticado de la petición
 * Uso: @GetUser() user: AuthenticatedUser
 * También se puede obtener una propiedad específica: @GetUser('sessionId') sessionId: string
 */
export const GetUser = createParamDecorator(
  (data: keyof AuthenticatedUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as AuthenticatedUser;

    // Si se especifica una propiedad, retornar solo esa propiedad
    if (data) {
      return user[data];
    }

    // Si no, retornar el usuario completo
    return user;
  },
);
