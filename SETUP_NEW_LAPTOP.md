# 🚀 Quick Setup Guide for New Laptop

This guide will help you set up the Recruitment Platform on a new machine in minutes.

## 📋 What's Included

This repository contains:
- ✅ Complete source code (Backend + Frontend)
- ✅ Database export with all schema and data
- ✅ Docker configuration for one-command deployment
- ✅ Setup scripts for manual installation
- ✅ Comprehensive documentation

## 🎯 Choose Your Setup Method

### Option 1: Docker Setup (Recommended - Easiest) 🐳

**Prerequisites:**
- Docker
- Docker Compose
- Git

**Steps:**

```bash
# 1. Clone the repository
git clone https://github.com/krunalparmar2192000/recruitment-platform.git
cd recruitment-platform

# 2. Start everything with one command
docker-compose up -d

# 3. Access the application
# Frontend: http://localhost:5173
# Backend: http://localhost:8080
# MySQL: localhost:3306
```

That's it! The database will be automatically initialized with all data.

**View logs:**
```bash
docker-compose logs -f
```

**Stop services:**
```bash
docker-compose down
```

📖 **For detailed Docker instructions, see [DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md)**

---

### Option 2: Manual Setup (Traditional)

**Prerequisites:**
- Java 17+
- Node.js 18+
- MySQL 8.0+
- Maven 3.8+

#### Step 1: Clone Repository

```bash
git clone https://github.com/krunalparmar2192000/recruitment-platform.git
cd recruitment-platform
```

#### Step 2: Setup Database

**Option A: Using the import script (Recommended)**

```bash
# Make script executable
chmod +x import-database.sh

# Import database
./import-database.sh database-export.sql
```

**Option B: Manual import**

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE recruitment_db;"

# Import data
mysql -u root -p recruitment_db < database-export.sql
```

#### Step 3: Configure Backend

Edit `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/recruitment_db
spring.datasource.username=root
spring.datasource.password=your_password
```

#### Step 4: Start Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend will start on: http://localhost:8080

#### Step 5: Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will start on: http://localhost:5173

---

## 🔐 Default Database Credentials

When using Docker or the database export:

- **Database**: recruitment_db
- **User**: recruitment_user (Docker) or root (Manual)
- **Password**: recruitment_pass (Docker) or your MySQL password (Manual)

## 📊 Verify Installation

### Check Backend
```bash
curl http://localhost:8080/api/jobs
```

### Check Frontend
Open browser: http://localhost:5173

### Check Database
```bash
# Docker
docker-compose exec mysql mysql -u recruitment_user -p recruitment_db

# Manual
mysql -u root -p recruitment_db
```

## 🛠️ Troubleshooting

### Port Already in Use

**Backend (8080):**
```bash
# Find process
sudo lsof -i :8080

# Kill process
kill -9 <PID>
```

**Frontend (5173):**
```bash
# Find process
sudo lsof -i :5173

# Kill process
kill -9 <PID>
```

**MySQL (3306):**
```bash
# Find process
sudo lsof -i :3306

# Kill process
kill -9 <PID>
```

### Database Connection Failed

1. Ensure MySQL is running
2. Check credentials in `application.properties`
3. Verify database exists: `SHOW DATABASES;`

### Docker Issues

```bash
# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Rebuild
docker-compose up -d --build

# Clean start
docker-compose down -v
docker-compose up -d
```

## 📚 Documentation

- **[README.md](README.md)** - Project overview and features
- **[DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md)** - Detailed Docker guide
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - API endpoints
- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Testing instructions
- **[PRODUCTION_DEPLOYMENT_GUIDE.md](PRODUCTION_DEPLOYMENT_GUIDE.md)** - Production deployment

## 🎨 Features

- **Multi-role System**: Admin, Recruiter, Candidate
- **Company Management**: Manage multiple companies and departments
- **Job Posting**: Create and manage job listings
- **Application Tracking**: Track candidate applications
- **Modern UI**: Beautiful, responsive design
- **Secure**: JWT authentication, role-based access control

## 🔄 Updating the Code

```bash
# Pull latest changes
git pull origin main

# Docker: Rebuild and restart
docker-compose down
docker-compose up -d --build

# Manual: Restart services
# Backend: Ctrl+C and run mvn spring-boot:run
# Frontend: Ctrl+C and run npm run dev
```

## 💾 Database Management

### Export Current Database

```bash
chmod +x export-database.sh
./export-database.sh
```

This creates `database-export.sql` with current data.

### Import Database

```bash
chmod +x import-database.sh
./import-database.sh database-export.sql
```

## 🆘 Need Help?

1. Check the troubleshooting section above
2. Review the documentation files
3. Check logs:
   - Docker: `docker-compose logs -f`
   - Backend: Check console output
   - Frontend: Check browser console
4. Create an issue on GitHub

## 📞 Support

- **GitHub**: https://github.com/krunalparmar2192000/recruitment-platform
- **Email**: krunalparmar2192000@gmail.com

## 🎉 Quick Start Summary

**Docker (Recommended):**
```bash
git clone https://github.com/krunalparmar2192000/recruitment-platform.git
cd recruitment-platform
docker-compose up -d
```

**Manual:**
```bash
git clone https://github.com/krunalparmar2192000/recruitment-platform.git
cd recruitment-platform
./import-database.sh database-export.sql
cd backend && mvn spring-boot:run &
cd frontend && npm install && npm run dev
```

---

**Built with ❤️ using Spring Boot, React, and Docker**
