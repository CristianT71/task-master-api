# TaskMaster API

API REST para gestionar tareas de usuarios construida con **NestJS**, **TypeORM** y **PostgreSQL**.

> **Proyecto de Práctica**: Ejercicio para aprender relaciones ManyToOne, DTOs validados, servicios y modelos en NestJS.

## Características

- ✓ Crear, leer, actualizar y eliminar usuarios
- ✓ Crear, leer, actualizar y eliminar tareas asociadas a usuarios
- ✓ Relación ManyToOne entre User y Task
- ✓ Validación de datos con class-validator
- ✓ Manejo de errores centralizado
- ✓ Base de datos PostgreSQL con Docker

## Requisitos

- Node.js (v18+)
- npm
- Docker y Docker Compose
- PostgreSQL (vía Docker)

## Instalación

```bash
# Clonar o descargar el proyecto
cd task-master-api

# Instalar dependencias
npm install

# Levantar la base de datos
docker-compose up

# Ejecutar en modo desarrollo
npm run start:dev

```

La API estará disponible en `http://localhost:3000/api`

Desarrollado como parte de mi ruta de aprendizaje profesional en el desarrollo Backend.