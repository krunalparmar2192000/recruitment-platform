# 🚀 MySQL Setup Guide - START HERE!

## ✅ Configuration Updated!

I've switched the platform from PostgreSQL to **MySQL**!

**Your MySQL Credentials:**
```
Username: root
Password: password
Database: recruitment_db
Host: localhost
Port: 3306
```

---

## 📋 STEP-BY-STEP SETUP

### **STEP 1: Start MySQL Service**

```bash
# Check if MySQL is running
sudo systemctl status mysql

# If not running, start it:
sudo systemctl start mysql
```

---

### **STEP 2: Create Database (Optional)**

The database will be created automatically when you start the backend!

But if you want to create it manually:

```bash
mysql -u root -p
# Enter password: password
```

Then in MySQL prompt:
```sql
CREATE DATABASE recruitment_db;
EXIT;
```

---

### **STEP 3: Start the Backend**

```bash
cd /media/root329/Data/Recruitment/recruitment-platform/backend
mvn spring-boot:run
```

**Wait for this message:**
```
Started RecruitmentApplication in X.XXX seconds
```

You'll see Hibernate creating tables:
```
Hibernate: create table users ...
Hibernate: create table recruiters ...
Hibernate: create table candidates ...
... (8 tables total)
```

**✅ Keep this terminal running!**

---

### **STEP 4: Insert Test Data**

Open a **NEW terminal** and run:

```bash
cd /media/root329/Data/Recruitment/recruitment-platform

# Insert test data
mysql -u root -p recruitment_db < database-setup-mysql.sql
# Enter password: password
```

---

### **STEP 5: Start the Frontend**

Open **another NEW terminal**:

```bash
cd /media/root329/Data/Recruitment/recruitment-platform/frontend
npm install
npm run dev
```

---

### **STEP 6: Open Browser**

Go to: **http://localhost:5173**

---

## 🔑 Test Accounts

### Admin:
- Email: `admin@recruithub.com`
- Password: `admin123`

### Recruiter:
- Email: `recruiter@agency.com`
- Password: `recruiter123`

### Candidate:
- Email: `john.doe@example.com`
- Password: `candidate123`

---

## 🆘 Troubleshooting

### MySQL Access Denied Error

If you get "Access denied for user 'root'@'localhost'":

**Option 1: Reset root password**
```bash
sudo mysql
```

Then in MySQL prompt:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
EXIT;
```

**Option 2: Use sudo**
```bash
sudo mysql -u root
```

Then:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
EXIT;
```

### MySQL Not Installed?

**Install MySQL:**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

**Secure installation:**
```bash
sudo mysql_secure_installation
# Set root password to: password
```

### Can't Connect to MySQL

**Check MySQL is running:**
```bash
sudo systemctl status mysql
```

**Check MySQL port:**
```bash
sudo netstat -tlnp | grep 3306
```

---

## 📊 Verify Setup

### Check Database Created

```bash
mysql -u root -p -e "SHOW DATABASES;" | grep recruitment
```

### Check Tables Created

```bash
mysql -u root -p recruitment_db -e "SHOW TABLES;"
```

Should show 8 tables:
- users
- recruiters
- candidates
- companies
- departments
- jobs
- job_requests
- applications

### Check Test Data

```bash
mysql -u root -p recruitment_db -e "SELECT COUNT(*) FROM users;"
```

Should return: 3 users

---

## 🎯 Quick Command Summary

```bash
# Terminal 1: Start backend
cd /media/root329/Data/Recruitment/recruitment-platform/backend
mvn spring-boot:run

# Terminal 2: Insert test data (after backend starts)
cd /media/root329/Data/Recruitment/recruitment-platform
mysql -u root -p recruitment_db < database-setup-mysql.sql

# Terminal 3: Start frontend
cd /media/root329/Data/Recruitment/recruitment-platform/frontend
npm install && npm run dev
```

---

## ✅ What Changed from PostgreSQL

1. **pom.xml** - Changed driver from `postgresql` to `mysql-connector-j`
2. **application.properties** - Updated:
   - URL: `jdbc:mysql://localhost:3306/recruitment_db`
   - Driver: `com.mysql.cj.jdbc.Driver`
   - Dialect: `MySQLDialect`
   - Username: `root`
   - Password: `password`
3. **database-setup-mysql.sql** - MySQL-compatible SQL script

---

## 🚀 START NOW!

**Run these commands:**

```bash
# 1. Check MySQL is running
sudo systemctl status mysql

# 2. Start backend
cd /media/root329/Data/Recruitment/recruitment-platform/backend
mvn spring-boot:run
```

**That's it!** The database will be created automatically! 🎉
