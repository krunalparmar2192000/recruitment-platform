# ✅ SWITCHED TO MYSQL!

## What I Changed

✅ **Database:** PostgreSQL → **MySQL**  
✅ **Driver:** `postgresql` → `mysql-connector-j`  
✅ **Dialect:** `PostgreSQLDialect` → `MySQLDialect`  
✅ **Credentials:** root / password  
✅ **Port:** 5432 → 3306  

---

## 🎯 QUICK START (3 Steps)

### **Step 1: Start Backend**

The database will be created automatically!

```bash
cd /media/root329/Data/Recruitment/recruitment-platform/backend
mvn spring-boot:run
```

**Wait for:** `Started RecruitmentApplication in X seconds`

---

### **Step 2: Insert Test Data** (New Terminal)

```bash
cd /media/root329/Data/Recruitment/recruitment-platform
mysql -u root -p recruitment_db < database-setup-mysql.sql
```

Enter password: `password`

---

### **Step 3: Start Frontend** (New Terminal)

```bash
cd /media/root329/Data/Recruitment/recruitment-platform/frontend
npm install
npm run dev
```

---

## 🌐 Access Application

**Open:** http://localhost:5173

---

## 🔑 Login Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@recruithub.com | admin123 |
| **Recruiter** | recruiter@agency.com | recruiter123 |
| **Candidate** | john.doe@example.com | candidate123 |

---

## 📁 Files Updated

✅ `backend/pom.xml` - MySQL driver  
✅ `backend/src/main/resources/application.properties` - MySQL config  
✅ `database-setup-mysql.sql` - MySQL test data  
✅ `MYSQL_SETUP.md` - Complete MySQL guide  

---

## 🆘 If MySQL Password Doesn't Work

```bash
sudo mysql
```

Then:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
EXIT;
```

---

## 🚀 YOU'RE READY!

**Just run Step 1 to start!** The database will be created automatically with `createDatabaseIfNotExist=true` in the connection URL.

**No manual database creation needed!** 🎉
