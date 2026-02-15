# 🔧 FIX: PostgreSQL Authentication Error

## Problem
```
FATAL: password authentication failed for user "root"
```

The PostgreSQL user "root" with password "password" doesn't exist or the password is wrong.

---

## ✅ SOLUTION - Choose One Option:

### **Option 1: Use Default PostgreSQL User (Easiest)**

PostgreSQL usually comes with a default user called `postgres`. Let's use that:

#### Step 1: Update application.properties

Change these lines in `backend/src/main/resources/application.properties`:

```properties
# FROM:
spring.datasource.username=root
spring.datasource.password=password

# TO:
spring.datasource.username=postgres
spring.datasource.password=postgres
```

#### Step 2: Create database as postgres user

```bash
# Try without password first (peer authentication)
sudo -u postgres createdb recruitment_db

# Or if you know the postgres password:
createdb -U postgres recruitment_db
```

---

### **Option 2: Create a 'root' User in PostgreSQL**

If you want to keep using "root" as the username:

#### Step 1: Access PostgreSQL as superuser

```bash
sudo -u postgres psql
```

#### Step 2: Create the 'root' user (in PostgreSQL prompt)

```sql
CREATE USER root WITH PASSWORD 'password';
ALTER USER root WITH SUPERUSER;
CREATE DATABASE recruitment_db OWNER root;
\q
```

#### Step 3: Test connection

```bash
psql -U root -d recruitment_db -c "SELECT 1;"
```

---

### **Option 3: Find Your Existing PostgreSQL Credentials**

#### Check what users exist:

```bash
sudo -u postgres psql -c "\du"
```

#### Check if database already exists:

```bash
sudo -u postgres psql -c "\l" | grep recruitment
```

---

## 🚀 RECOMMENDED: Use 'postgres' User (Simplest)

**I'll update the configuration for you to use the default 'postgres' user:**

1. **Update application.properties** (I'll do this for you)
2. **Create database:**
   ```bash
   sudo -u postgres createdb recruitment_db
   ```
3. **Start backend again:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

---

## 📝 After Fixing

Once the backend starts successfully, you'll see:

```
Hibernate: create table users ...
Hibernate: create table recruiters ...
...
Started RecruitmentApplication in X.XXX seconds
```

Then insert test data:

```bash
sudo -u postgres psql -d recruitment_db -f database-setup.sql
```

---

## 🆘 Still Having Issues?

### Check PostgreSQL is running:
```bash
sudo systemctl status postgresql
```

### Check pg_hba.conf authentication method:
```bash
sudo cat /etc/postgresql/*/main/pg_hba.conf | grep -v "^#" | grep -v "^$"
```

### Reset postgres user password:
```bash
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
```

---

**Let me update the configuration to use 'postgres' user now...**
