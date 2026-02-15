# 🚀 Quick Reference - New Laptop Setup

## ⚡ Fastest Setup (Docker - Recommended)

```bash
# 1. Clone repository
git clone https://github.com/krunalparmar2192000/recruitment-platform.git
cd recruitment-platform

# 2. Start everything
docker-compose up -d

# 3. Access application
# Frontend: http://localhost:5173
# Backend: http://localhost:8080
```

**Done! Database is automatically loaded with all data.**

---

## 🛠️ Manual Setup (Without Docker)

```bash
# 1. Clone repository
git clone https://github.com/krunalparmar2192000/recruitment-platform.git
cd recruitment-platform

# 2. Import database
chmod +x import-database.sh
./import-database.sh database-export.sql

# 3. Start backend (in one terminal)
cd backend
mvn spring-boot:run

# 4. Start frontend (in another terminal)
cd frontend
npm install
npm run dev
```

---

## 📦 What's Included

✅ Complete source code (Backend + Frontend)  
✅ **Database backup file: `database-export.sql` (16KB)**  
✅ Docker configuration for one-command deployment  
✅ All setup scripts and documentation  

---

## 📚 Important Files

- **SETUP_NEW_LAPTOP.md** - Detailed setup guide
- **DOCKER_DEPLOYMENT.md** - Docker instructions
- **GIT_PUSH_SUMMARY.md** - What was pushed
- **database-export.sql** - **COMPLETE DATABASE BACKUP**
- **docker-compose.yml** - Docker orchestration

---

## 🔧 Useful Commands

### Docker
```bash
docker-compose up -d          # Start all services
docker-compose down           # Stop all services
docker-compose logs -f        # View logs
docker-compose restart        # Restart services
```

### Database
```bash
./export-database.sh          # Export current database
./import-database.sh file.sql # Import database
```

### Git
```bash
git pull origin main          # Get latest changes
git add .                     # Stage changes
git commit -m "message"       # Commit changes
git push origin main          # Push to GitHub
```

---

## 🆘 Troubleshooting

**Port in use?**
```bash
sudo lsof -i :8080   # Backend
sudo lsof -i :5173   # Frontend
sudo lsof -i :3306   # MySQL
```

**Docker issues?**
```bash
docker-compose down -v        # Clean restart
docker-compose up -d --build  # Rebuild
```

**Database issues?**
```bash
# Re-import database
./import-database.sh database-export.sql
```

---

## 📞 Repository

**GitHub**: https://github.com/krunalparmar2192000/recruitment-platform

**Clone**: `git clone https://github.com/krunalparmar2192000/recruitment-platform.git`

---

**That's it! Your recruitment platform is ready to deploy anywhere! 🎉**
