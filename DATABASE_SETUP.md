# 🗄️ Database Setup Guide

## Your Database Credentials

```
Username: root
Password: password
Database: recruitment_db
Host: localhost
Port: 5432
```

These credentials have been configured in:
- `backend/src/main/resources/application.properties`

---

## 🚀 Quick Setup (Automated)

### Option 1: Use Setup Script (Recommended)

```bash
# 1. Make script executable (already done)
chmod +x setup-database.sh

# 2. Run the setup script
./setup-database.sh
```

The script will:
- ✅ Check PostgreSQL connection
- ✅ Create database
- ✅ Wait for you to start Spring Boot
- ✅ Insert test data
- ✅ Display summary

---

## 📝 Manual Setup

### Step 1: Create Database

```bash
# Using createdb command
createdb -U root recruitment_db

# Or using psql
psql -U root -c "CREATE DATABASE recruitment_db;"
```

### Step 2: Start Spring Boot Application

```bash
cd backend
mvn spring-boot:run
```

**Wait for this message in logs:**
```
Hibernate: create table users ...
Hibernate: create table recruiters ...
...
Started RecruitmentApplication in X seconds
```

### Step 3: Insert Test Data

```bash
# Run the SQL script
psql -U root -d recruitment_db -f database-setup.sql

# Or copy and paste from database-setup.sql
```

---

## 🔑 Test Accounts

After setup, you'll have these test accounts:

### Admin Account
```
Email: admin@recruithub.com
Password: admin123
Role: ADMIN
```

### Recruiter Account
```
Email: recruiter@agency.com
Password: recruiter123
Role: RECRUITER
Company: Top Talent Agency
```

### Candidate Account
```
Email: john.doe@example.com
Password: candidate123
Role: CANDIDATE
Name: John Doe
```

---

## 📊 Sample Data Included

After setup, your database will have:

- **3 Users** (1 Admin, 1 Recruiter, 1 Candidate)
- **1 Recruiter Profile** (Top Talent Agency)
- **1 Candidate Profile** (John Doe)
- **2 Companies** (Tech Innovations Inc, Digital Solutions Corp)
- **5 Departments** (IT, HR, Sales, Engineering, Finance)
- **3 Job Postings** (Senior Software Engineer, Frontend Developer, DevOps Engineer)
- **1 Job Application** (John Doe → Senior Software Engineer)
- **1 Job Request** (ABC Corporation)

---

## 🔍 Verify Setup

### Check Database Connection

```bash
psql -U root -d recruitment_db -c "\dt"
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

### View All Users

```sql
psql -U root -d recruitment_db

SELECT id, email, role, active FROM users;
```

Expected output:
```
 id |          email           |   role    | active 
----+--------------------------+-----------+--------
  1 | admin@recruithub.com     | ADMIN     | t
  2 | recruiter@agency.com     | RECRUITER | t
  3 | john.doe@example.com     | CANDIDATE | t
```

### View All Jobs

```sql
SELECT j.id, j.title, c.name as company, j.status 
FROM jobs j 
JOIN companies c ON j.company_id = c.id;
```

---

## 🧪 Test the Application

### 1. Start Backend
```bash
cd backend
mvn spring-boot:run
```
✅ Backend running on http://localhost:8080

### 2. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend running on http://localhost:5173

### 3. Login and Test

**Test Admin:**
1. Go to http://localhost:5173/login
2. Login with: admin@recruithub.com / admin123
3. Should redirect to /admin/dashboard

**Test Recruiter:**
1. Login with: recruiter@agency.com / recruiter123
2. Should redirect to /recruiter/dashboard
3. View companies, departments, jobs

**Test Candidate:**
1. Login with: john.doe@example.com / candidate123
2. Should redirect to /candidate/dashboard
3. Browse jobs, view applications

---

## 🔧 Troubleshooting

### Database Connection Failed

**Check PostgreSQL is running:**
```bash
sudo systemctl status postgresql
# or
pg_isready
```

**Start PostgreSQL if needed:**
```bash
sudo systemctl start postgresql
```

### Authentication Failed

**Check credentials:**
```bash
psql -U root -d recruitment_db
```

If password is wrong, you may need to:
1. Check `pg_hba.conf` for authentication method
2. Reset password if needed

### Tables Not Created

**Make sure Spring Boot started successfully:**
- Check backend logs for errors
- Look for "Hibernate: create table..." messages
- Verify `spring.jpa.hibernate.ddl-auto=update` in application.properties

### Test Data Not Inserted

**Check if tables exist first:**
```bash
psql -U root -d recruitment_db -c "\dt"
```

**Re-run the insert statements:**
```bash
psql -U root -d recruitment_db -f database-setup.sql
```

---

## 🗑️ Reset Database

If you need to start fresh:

```bash
# Drop and recreate database
dropdb -U root recruitment_db
createdb -U root recruitment_db

# Restart Spring Boot to recreate tables
cd backend
mvn spring-boot:run

# Re-insert test data
psql -U root -d recruitment_db -f database-setup.sql
```

---

## 📚 Useful SQL Queries

### Count Records in All Tables
```sql
SELECT 'Users' as table_name, COUNT(*) FROM users
UNION ALL SELECT 'Recruiters', COUNT(*) FROM recruiters
UNION ALL SELECT 'Candidates', COUNT(*) FROM candidates
UNION ALL SELECT 'Companies', COUNT(*) FROM companies
UNION ALL SELECT 'Departments', COUNT(*) FROM departments
UNION ALL SELECT 'Jobs', COUNT(*) FROM jobs
UNION ALL SELECT 'Applications', COUNT(*) FROM applications
UNION ALL SELECT 'Job Requests', COUNT(*) FROM job_requests;
```

### View All Jobs with Details
```sql
SELECT 
    j.id, 
    j.title, 
    c.name as company, 
    d.name as department,
    j.location,
    j.status,
    j.created_at
FROM jobs j
JOIN companies c ON j.company_id = c.id
JOIN departments d ON j.department_id = d.id
ORDER BY j.created_at DESC;
```

### View Applications with Candidate Info
```sql
SELECT 
    a.id,
    cand.full_name as candidate,
    j.title as job,
    c.name as company,
    a.status,
    a.applied_at
FROM applications a
JOIN candidates cand ON a.candidate_id = cand.id
JOIN jobs j ON a.job_id = j.id
JOIN companies c ON j.company_id = c.id
ORDER BY a.applied_at DESC;
```

---

## ✅ Setup Checklist

- [ ] PostgreSQL installed and running
- [ ] Database `recruitment_db` created
- [ ] Spring Boot application started
- [ ] Tables created by Hibernate
- [ ] Test data inserted
- [ ] Can login with test accounts
- [ ] Frontend connected to backend
- [ ] All features working

---

## 🎉 You're Ready!

Once setup is complete, you can:

✅ Login with any test account
✅ Browse jobs as a guest
✅ Apply for jobs as a candidate
✅ Manage companies as a recruiter
✅ View statistics as an admin

**Happy Recruiting!** 🚀
