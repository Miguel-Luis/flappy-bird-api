import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

/**
 * Servicio de Prisma para manejar la conexión con la base de datos
 * Extiende PrismaClient y usa el adaptador de PostgreSQL (Prisma 7)
 */
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    // Crear el adaptador de PostgreSQL con la URL de conexión
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL as string,
    });

    // Inicializar PrismaClient con el adaptador
    super({ adapter });
  }
}
