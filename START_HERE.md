# ✅ FIXED! Ready to Start

## What I Fixed

❌ **Before:** username=root, password=password (doesn't exist in PostgreSQL)  
✅ **After:** username=postgres, password=postgres (default PostgreSQL user)

---

## 🚀 NOW FOLLOW THESE EXACT STEPS:

### **STEP 1: Create the Database**

```bash
# Try this first (uses system authentication):
sudo -u postgres createdb recruitment_db
```

**If that doesn't work, try:**
```bash
createdb -U postgres recruitment_db
# (enter password: postgres)
```

---

### **STEP 2: Start the Backend**

```bash
cd /media/root329/Data/Recruitment/recruitment-platform/backend
mvn spring-boot:run
```

**Wait for this message:**
```
Started RecruitmentApplication in X.XXX seconds
```

You should see tables being created:
```
Hibernate: create table users ...
Hibernate: create table recruiters ...
Hibernate: create table candidates ...
... (8 tables total)
```

**✅ Keep this terminal running!**

---

### **STEP 3: Insert Test Data**

Open a **NEW terminal** and run:

```bash
cd /media/root329/Data/Recruitment/recruitment-platform

# Try this first:
sudo -u postgres psql -d recruitment_db -f database-setup.sql
```

**If that doesn't work, try:**
```bash
psql -U postgres -d recruitment_db -f database-setup.sql
# (enter password: postgres)
```

---

### **STEP 4: Start the Frontend**

Open **another NEW terminal**:

```bash
cd /media/root329/Data/Recruitment/recruitment-platform/frontend
npm install
npm run dev
```

---

### **STEP 5: Open Browser**

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

## 🆘 If You Still Get Password Error

### Option A: Reset postgres password

```bash
sudo -u postgres psql
```

Then in PostgreSQL prompt:
```sql
ALTER USER postgres PASSWORD 'postgres';
\q
```

### Option B: Use peer authentication

Edit pg_hba.conf to allow local connections:
```bash
sudo nano /etc/postgresql/*/main/pg_hba.conf
```

Change this line:
```
local   all             postgres                                peer
```

To:
```
local   all             postgres                                trust
```

Then restart PostgreSQL:
```bash
sudo systemctl restart postgresql
```

---

## 📋 Quick Command Summary

```bash
# Terminal 1: Create DB and start backend
sudo -u postgres createdb recruitment_db
cd /media/root329/Data/Recruitment/recruitment-platform/backend
mvn spring-boot:run

# Terminal 2: Insert test data (after backend starts)
cd /media/root329/Data/Recruitment/recruitment-platform
sudo -u postgres psql -d recruitment_db -f database-setup.sql

# Terminal 3: Start frontend
cd /media/root329/Data/Recruitment/recruitment-platform/frontend
npm install && npm run dev
```

---

**START WITH STEP 1 NOW!** 🚀
