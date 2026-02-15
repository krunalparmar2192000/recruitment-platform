# 🐳 Docker Deployment Guide

This guide will help you deploy the Recruitment Platform using Docker on any machine.

## 📋 Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)
- Git

## 🚀 Quick Start (New Machine Setup)

### 1. Clone the Repository

```bash
git clone https://github.com/krunalparmar2192000/recruitment-platform.git
cd recruitment-platform
```

### 2. Start the Application

```bash
# Start all services (MySQL, Backend, Frontend)
docker-compose up -d

# View logs
docker-compose logs -f
```

### 3. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **MySQL**: localhost:3306

The database will be automatically initialized with the schema and data from `database-export.sql`.

## 🛠️ Manual Setup (Without Docker)

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8.0+

### 1. Database Setup

```bash
# Make the import script executable
chmod +x import-database.sh

# Import the database
./import-database.sh database-export.sql
```

Or manually:
```bash
mysql -u root -p < database-export.sql
```

### 2. Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 📦 Docker Commands

### Start Services
```bash
# Start all services in background
docker-compose up -d

# Start with build (if you made changes)
docker-compose up -d --build

# Start specific service
docker-compose up -d mysql
docker-compose up -d backend
docker-compose up -d frontend
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: deletes database data)
docker-compose down -v
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### Restart Services
```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart backend
```

### Execute Commands in Containers
```bash
# Access MySQL
docker-compose exec mysql mysql -u recruitment_user -p recruitment_db

# Access backend shell
docker-compose exec backend sh

# Access frontend shell
docker-compose exec frontend sh
```

## 🔧 Configuration

### Environment Variables

You can customize the deployment by creating a `.env` file in the project root:

```env
# Database
DB_HOST=mysql
DB_PORT=3306
DB_NAME=recruitment_db
DB_USER=recruitment_user
DB_PASSWORD=recruitment_pass

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=900000
JWT_REFRESH_EXPIRATION=604800000

# Application
APP_URL=http://localhost:5173
```

### Port Configuration

To change the default ports, edit `docker-compose.yml`:

```yaml
services:
  backend:
    ports:
      - "8080:8080"  # Change first port (host:container)
  
  frontend:
    ports:
      - "5173:5173"  # Change first port (host:container)
  
  mysql:
    ports:
      - "3306:3306"  # Change first port (host:container)
```

## 💾 Database Management

### Export Current Database

```bash
# Make the export script executable
chmod +x export-database.sh

# Export database
./export-database.sh
```

This creates `database-export.sql` with the current database state.

### Import Database

```bash
# Make the import script executable
chmod +x import-database.sh

# Import database
./import-database.sh database-export.sql
```

### Backup Database from Docker

```bash
# Export from running container
docker-compose exec mysql mysqldump -u recruitment_user -p recruitment_db > backup.sql

# Import to running container
docker-compose exec -T mysql mysql -u recruitment_user -p recruitment_db < backup.sql
```

## 🔍 Troubleshooting

### Port Already in Use

If you get "port already in use" errors:

```bash
# Check what's using the port
sudo lsof -i :8080
sudo lsof -i :5173
sudo lsof -i :3306

# Kill the process or change ports in docker-compose.yml
```

### Database Connection Issues

```bash
# Check MySQL logs
docker-compose logs mysql

# Verify MySQL is healthy
docker-compose ps

# Restart MySQL
docker-compose restart mysql
```

### Backend Not Starting

```bash
# Check backend logs
docker-compose logs backend

# Rebuild backend
docker-compose up -d --build backend

# Check if MySQL is ready
docker-compose exec mysql mysqladmin ping -h localhost -u root -p
```

### Frontend Build Issues

```bash
# Check frontend logs
docker-compose logs frontend

# Rebuild frontend
docker-compose up -d --build frontend

# Clear node_modules and rebuild
docker-compose down
docker-compose up -d --build
```

## 🚀 Production Deployment

### 1. Update Environment Variables

Create a `.env.production` file:

```env
DB_PASSWORD=strong-password-here
JWT_SECRET=strong-secret-key-here
APP_URL=https://yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

### 2. Use Production Compose File

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  mysql:
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
      MYSQL_PASSWORD: ${DB_PASSWORD}
  
  backend:
    restart: always
    environment:
      SPRING_PROFILES_ACTIVE: production
  
  frontend:
    restart: always
```

### 3. Deploy

```bash
# Start with production config
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 4. Setup SSL (Optional)

Use nginx-proxy or Traefik for SSL termination.

## 📊 Health Checks

### Check Service Status

```bash
# All services
docker-compose ps

# Health check
curl http://localhost:8080/actuator/health
curl http://localhost:5173
```

### Monitor Resources

```bash
# View resource usage
docker stats

# View specific service
docker stats recruitment-backend
```

## 🔄 Updates and Maintenance

### Update Application

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

### Clean Up

```bash
# Remove stopped containers
docker-compose rm

# Remove unused images
docker image prune -a

# Remove unused volumes (WARNING: deletes data)
docker volume prune
```

## 📝 Default Credentials

### Database
- **Host**: localhost:3306
- **Database**: recruitment_db
- **User**: recruitment_user
- **Password**: recruitment_pass
- **Root Password**: password

### Application Users
Check the database export file for default user accounts.

## 🆘 Support

If you encounter issues:

1. Check the logs: `docker-compose logs -f`
2. Verify all services are running: `docker-compose ps`
3. Check the troubleshooting section above
4. Create an issue on GitHub

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Spring Boot Docker Guide](https://spring.io/guides/gs/spring-boot-docker/)
- [React Docker Guide](https://create-react-app.dev/docs/deployment/#docker)

---

**Built with ❤️ using Docker, Spring Boot, and React**
