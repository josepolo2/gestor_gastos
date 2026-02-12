# Gestor de Gastos Personales

Aplicativo web completo para gestionar gastos personales

### Frontend
- **React** con **TypeScript**
- **Tailwind CSS** para estilos
- Puerto: `3000`

### Backend
- **Flask** (Python)
- Puerto: `5000`
- Base de datos: PostgreSQL

### Requisitos Previos
- Docker
- Docker Compose

### Instrucciones

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repo>
   cd expense-manager
   ```

2. **Iniciar los contenedores**
   ```bash
   docker-compose up --build
   ```

3. **Acceder a la aplicación**
   - Frontend: http://localhost:5173
   - Backend Flask: http://localhost:5000
   - PostgreSQL: `localhost:5432`

## 🗄️ PostgreSQL

### Configuración por defecto (Docker)
- Usuario: `expense`
- Contraseña: `expense`
- Base de datos: `expense_db`
- Host: `localhost`
- Puerto: `5432`

### Conexión desde pgAdmin
- **Host**: `localhost`
- **Port**: `5432`
- **Username**: `expense`
- **Password**: `expense`
- **Database**: `expense_db`

## 📁 Estructura del Proyecto

```
expense-manager/
├── frontend/                 # React + TypeScript + Tailwind
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── backend-flask/            # Flask backend
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
└── docker-compose.yml
```

## 🔌 API Endpoints

Todos los backends comparten la misma lógica y endpoints:

### Gastos
- `GET /api/expenses` - Obtener todos los gastos
- `GET /api/expenses/:id` - Obtener gasto por ID
- `POST /api/expenses` - Crear un nuevo gasto
- `PUT /api/expenses/:id` - Actualizar gasto
- `DELETE /api/expenses/:id` - Eliminar gasto

### Categorías
- `GET /api/categories` - Obtener categorías

### Estadísticas
- `GET /api/stats` - Obtener estadísticas de gastos

## 🛠️ Desarrollo

Cada servicio tiene su propio Dockerfile y puede ser desarrollado de forma independiente.

### Cambios en Caliente
Los volúmenes en `docker-compose.yml` permiten desarrollo con cambios automáticos:
- Frontend: Hot reload con React
- Backends: Recarga automática en modo desarrollo

## 📝 Notas

- Los tres backends implementan la misma lógica y endpoints
- El frontend puede cambiar entre backends modificando la URL de la API
- Cada backend usa SQLite para simplicidad (puede cambiar a PostgreSQL en producción)

## 📄 Licencia

MIT
