```
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║    ███████╗██╗      █████╗ ██████╗ ██████╗ ██╗   ██╗    ██████╗ ██╗██████╗   ║
║    ██╔════╝██║     ██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝    ██╔══██╗██║██╔══██╗  ║
║    █████╗  ██║     ███████║██████╔╝██████╔╝ ╚████╔╝     ██████╔╝██║██████╔╝  ║
║    ██╔══╝  ██║     ██╔══██║██╔═══╝ ██╔═══╝   ╚██╔╝      ██╔══██╗██║██╔══██╗  ║
║    ██║     ███████╗██║  ██║██║     ██║        ██║       ██████╔╝██║██║  ██║  ║
║    ╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝        ╚═╝       ╚═════╝ ╚═╝╚═╝  ╚═╝  ║
║                                                                              ║
║                        ░█▀▀█ ░█▀▀█ ▀█▀                                       ║
║                        ░█▄▄█ ░█▄▄█ ░█░                                       ║
║                        ░█░░░ ░█░░░ ▄█▄                                       ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

<div align="center">

```
    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
    █  ★  API Backend para el clásico juego Flappy Bird  ★  █
    ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
```

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

</div>

---

## 🎮 OBJETIVO DEL PROYECTO

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║   Esta API proporciona el backend completo para un juego Flappy Bird.     ║
║   Permite gestionar jugadores, registrar partidas, mantener un ranking    ║
║   global y manejar autenticación segura con JWT.                          ║
║                                                                           ║
║   ┌─────────────────────────────────────────────────────────────────┐     ║
║   │  ⬡ Registro y autenticación de usuarios                        │     ║
║   │  ⬡ Gestión de jugadores (CRUD completo)                        │     ║
║   │  ⬡ Registro de partidas y puntuaciones                         │     ║
║   │  ⬡ Ranking global de mejores puntajes                          │     ║
║   │  ⬡ Documentación interactiva con Swagger                       │     ║
║   └─────────────────────────────────────────────────────────────────┘     ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

---

## 📋 REQUISITOS PREVIOS

```
┌──────────────────────────────────────────────────────────────────────────┐
│                       ANTES DE COMENZAR                                  │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ◈ Node.js      v125.5.0 o superior [https://nodejs.org]                │
│   ◈ npm          v11.8.0 o superior  (viene con Node.js)                 │
│   ◈ nvm          v1.2.2 o superior   [https://www.nvmnode.com/guide/download.html]
│   ◈ PostgreSQL   v18.1 o superior    [https://postgresql.org]            │
│   ◈ Git          cualquier versión   [https://git-scm.com]               │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 GUÍA DE INICIO RÁPIDO

### ░▒▓█ PASO 1: CLONAR EL REPOSITORIO █▓▒░

```bash
git clone https://github.com/tu-usuario/flappy-bird-api.git
cd flappy-bird-api
```

### ░▒▓█ PASO 2: INSTALAR DEPENDENCIAS █▓▒░

```bash
npm install
```

### ░▒▓█ PASO 3: CONFIGURAR VARIABLES DE ENTORNO █▓▒░

```
┌──────────────────────────────────────────────────────────────────────────┐
│  💡 TIP: ¡Simplemente renombra el archivo de ejemplo para crear tu       │
│          configuración!                                                  │
└──────────────────────────────────────────────────────────────────────────┘
```

**Opción A - Usando línea de comandos:**
```bash
# Windows (CMD)
copy .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env

# Linux / macOS
cp .env.example .env
```

**Opción B - Manualmente:**
1. Busca el archivo `.env.example` en la carpeta raíz
2. Renómbralo a `.env` (solo quítale la parte `.example`)
3. ¡Listo! ✅

**📝 Explicación de las Variables de Entorno:**

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | `3000` |
| `DATABASE_URL` | Cadena de conexión a PostgreSQL | `postgresql://postgres:admin@localhost:5432/flappy_db?schema=public` |
| `JWT_SECRET` | Clave secreta para tokens JWT | *(¡cambia esto en producción!)* |
| `JWT_EXPIRES_IN` | Tiempo de expiración del token | `3600s` (1 hora) |

### ░▒▓█ PASO 4: CREAR LA BASE DE DATOS █▓▒░

```
┌──────────────────────────────────────────────────────────────────────────┐
│  🗄️  ¡Asegúrate de que PostgreSQL esté corriendo antes de este paso!     │
└──────────────────────────────────────────────────────────────────────────┘
```

**Crear la base de datos manualmente en PostgreSQL:**
```sql
CREATE DATABASE flappy_db;
```

**O usando la línea de comandos psql:**
```bash
psql -U postgres -c "CREATE DATABASE flappy_db;"
```

### ░▒▓█ PASO 5: EJECUTAR MIGRACIONES █▓▒░

```bash
npx prisma migrate dev

npx prisma generate
```

Este comando:
- Creará todas las tablas en la base de datos
- Configurará las relaciones entre tablas
- Generará el cliente de Prisma

### ░▒▓█ PASO 6: INICIAR EL SERVIDOR █▓▒░

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                        ¡LISTO PARA JUGAR! 🎮                              ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

**Modo desarrollo (con recarga automática):**
```bash
npm run start:dev
```

**Modo producción:**
```bash
npm run build
npm run start:prod
```

---

## 📖 REFERENCIA DE COMANDOS

```
┌────────────────────────────────────────────────────────────────────────────┐
│                          COMANDOS DISPONIBLES                              │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│   npm run start:dev      ➤  Iniciar en modo desarrollo (recarga auto)     │
│   npm run start:prod     ➤  Iniciar en modo producción                    │
│   npm run build          ➤  Compilar para producción                      │
│   npm run start          ➤  Iniciar sin recarga automática                │
│   npm run lint           ➤  Ejecutar ESLint para revisar código           │
│   npm run format         ➤  Formatear código con Prettier                 │
│                                                                            │
├────────────────────────────────────────────────────────────────────────────┤
│                       COMANDOS DE BASE DE DATOS                            │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│   npx prisma migrate dev     ➤  Ejecutar migraciones en desarrollo        │
│   npx prisma migrate reset   ➤  Reiniciar base de datos (¡BORRA TODO!)    │
│   npx prisma generate        ➤  Regenerar cliente de Prisma               │
│   npx prisma studio          ➤  Abrir editor visual de base de datos      │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 🌐 ENDPOINTS DE LA API

```
┌──────────────────────────────────────────────────────────────────────────┐
│  🔗 URL Base: http://localhost:3000/api/v1                               │
└──────────────────────────────────────────────────────────────────────────┘
```

### 🔐 Autenticación

| Método | Endpoint | Descripción | Requiere Auth |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Registrar nuevo usuario | ❌ No |
| `POST` | `/auth/login` | Iniciar sesión | ❌ No |
| `POST` | `/auth/refresh` | Refrescar token de acceso | ❌ No |
| `POST` | `/auth/logout` | Cerrar sesión | ✅ Sí |

### 👤 Jugadores

| Método | Endpoint | Descripción | Requiere Auth |
|--------|----------|-------------|---------------|
| `POST` | `/players` | Crear jugador | ✅ Sí |
| `GET` | `/players` | Obtener todos los jugadores | ✅ Sí |
| `GET` | `/players/:id` | Obtener jugador por ID | ✅ Sí |
| `PUT` | `/players/:id` | Actualizar jugador | ✅ Sí |
| `DELETE` | `/players/:id` | Eliminar jugador | ✅ Sí |

### 🎯 Partidas

| Método | Endpoint | Descripción | Requiere Auth |
|--------|----------|-------------|---------------|
| `POST` | `/games` | Crear registro de partida | ✅ Sí |
| `GET` | `/games` | Obtener todas las partidas | ✅ Sí |
| `GET` | `/games/:id` | Obtener partida por ID | ✅ Sí |
| `GET` | `/games/ranking` | Obtener mejores puntajes | ✅ Sí |
| `GET` | `/games/player/:playerId` | Obtener partidas por jugador | ✅ Sí |
| `PUT` | `/games/:id` | Actualizar partida | ✅ Sí |
| `DELETE` | `/games/:id` | Eliminar partida | ✅ Sí |

---

## 📊 FORMATO DE RESPUESTAS DE LA API

```
┌──────────────────────────────────────────────────────────────────────────┐
│                       RESPUESTAS ESTANDARIZADAS                          │
└──────────────────────────────────────────────────────────────────────────┘
```

**✅ Respuesta Exitosa:**
```json
{
  "success": true,
  "message": "Solicitud exitosa",
  "data": { ... }
}
```

**❌ Respuesta de Error:**
```json
{
  "success": false,
  "message": "Descripción del error",
  "data": null
}
```

---

## 🗂️ ESTRUCTURA DEL PROYECTO

```
flappy-bird-api/
│
├── 📁 prisma/
│   └── schema.prisma          # Definición del esquema de base de datos
│
├── 📁 src/
│   ├── 📁 auth/               # Módulo de autenticación
│   │   ├── dto/               # Objetos de transferencia de datos
│   │   ├── strategies/        # Estrategia JWT de Passport
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   │
│   ├── 📁 common/             # Utilidades compartidas
│   │   ├── decorators/        # Decoradores personalizados
│   │   ├── filters/           # Filtros de excepciones
│   │   ├── guards/            # Guards de autenticación
│   │   ├── interceptors/      # Interceptores de respuesta
│   │   ├── interfaces/        # Interfaces de TypeScript
│   │   └── utils/             # Funciones utilitarias
│   │
│   ├── 📁 games/              # Módulo de partidas
│   ├── 📁 players/            # Módulo de jugadores
│   ├── 📁 prisma/             # Servicio de Prisma
│   │
│   ├── app.module.ts          # Módulo raíz
│   └── main.ts                # Punto de entrada de la aplicación
│
├── .env.example               # Plantilla de variables de entorno
├── .env                       # Tu configuración local (¡crea este archivo!)
└── package.json               # Dependencias del proyecto
```

---

## 🎨 DOCUMENTACIÓN SWAGGER

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║   📚 Documentación interactiva de la API disponible en:                   ║
║                                                                           ║
║      ➤  http://localhost:3000/api-docs/v1                                 ║
║                                                                           ║
║   ¡Prueba todos los endpoints directamente desde tu navegador!            ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

---

## 🛠️ SOLUCIÓN DE PROBLEMAS

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        PROBLEMAS COMUNES                                 │
└──────────────────────────────────────────────────────────────────────────┘
```

**❓ Error "Connection refused" (Conexión rechazada):**
- Asegúrate de que PostgreSQL esté corriendo
- Verifica el DATABASE_URL en tu archivo `.env`
- Comprueba que la base de datos `flappy_db` exista

**❓ Error "Module not found" (Módulo no encontrado):**
```bash
npm install
npx prisma generate
```

**❓ Error en migración de Prisma:**
```bash
npx prisma migrate reset
```
⚠️ Advertencia: ¡Esto eliminará todos los datos!

**❓ Puerto ya está en uso:**
- Cambia el valor de `PORT` en el archivo `.env`
- O mata el proceso que está usando ese puerto

---

## 📜 LICENCIA

```
Licencia MIT - ¡Siéntete libre de usar esto para tus proyectos! 🎉
```

---

<div align="center">

```
═══════════════════════════════════════════════════════════════════════════════

                    ░█▀▀░█▀█░█▄█░█▀▀░░░█▀█░█░█░█▀▀░█▀▄░█
                    ░█░█░█▀█░█░█░█▀▀░░░█░█░▀▄▀░█▀▀░█▀▄░▀
                    ░▀▀▀░▀░▀░▀░▀░▀▀▀░░░▀▀▀░░▀░░▀▀▀░▀░▀░▀

                  Hecho con ❤️ por Luis Miguel Gonzalez G.♞
                    
═══════════════════════════════════════════════════════════════════════════════
```

</div>
