# 🔧 TROUBLESHOOTING GUIDE

## ❌ Problem: Registration Failed

Based on your screenshot, the registration is failing because:

### **The backend server is NOT running!**

---

## ✅ SOLUTION - Start the Backend

### **Step 1: Start the Backend Server**

```bash
cd /media/root329/Data/Recruitment/recruitment-platform/backend
mvn spring-boot:run
```

**Wait for this message:**
```
Started RecruitmentApplication in X.XXX seconds
```

---

## 📋 How to Check Server Logs

### **Option 1: Check Console Output**

The logs appear in the terminal where you ran `mvn spring-boot:run`

Look for:
- ✅ `Started RecruitmentApplication` - Server started successfully
- ❌ `Error` or `Exception` - Something went wrong

### **Option 2: Use the Check Logs Script**

```bash
cd /media/root329/Data/Recruitment/recruitment-platform
./check-logs.sh
```

### **Option 3: Check Specific Errors**

**See last 50 lines of output:**
```bash
# If you redirected output to a file:
tail -50 backend.log
```

**Search for errors:**
```bash
# In the terminal where backend is running, look for lines with:
ERROR
Exception
Failed
```

---

## 🔍 Common Registration Errors

### **1. Backend Not Running**
**Symptom:** "Registration failed" with no details  
**Solution:** Start backend with `mvn spring-boot:run`

### **2. Database Connection Error**
**Symptom:** Logs show "Access denied" or "Connection refused"  
**Solution:** Check MySQL credentials in `application.properties`

```bash
# Test MySQL connection:
mysql -u root -ppassword -e "USE recruitment_db; SELECT 1;"
```

### **3. Tables Not Created**
**Symptom:** Logs show "Table 'users' doesn't exist"  
**Solution:** Backend will create tables automatically on first start

```bash
# Check if tables exist:
mysql -u root -ppassword recruitment_db -e "SHOW TABLES;"
```

### **4. Port Already in Use**
**Symptom:** "Port 8080 is already in use"  
**Solution:** Kill the process using port 8080

```bash
# Find process on port 8080:
sudo lsof -i :8080

# Kill it:
sudo kill -9 <PID>
```

### **5. CORS Error**
**Symptom:** Browser console shows "CORS policy" error  
**Solution:** Already configured in `CorsConfig.java` (should work)

---

## 🧪 Test the Backend API

### **Check if backend is responding:**

```bash
# Test health endpoint:
curl http://localhost:8080/api/jobs

# Should return: [] (empty array) or list of jobs
```

### **Test registration endpoint:**

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "role": "CANDIDATE",
    "fullName": "Test User",
    "phone": "+1234567890",
    "location": "Test City"
  }'
```

**Expected response:**
```json
{
  "token": "eyJhbGc...",
  "email": "test@example.com",
  "role": "CANDIDATE"
}
```

---

## 📊 Check Database

### **Verify database exists:**
```bash
mysql -u root -ppassword -e "SHOW DATABASES;" | grep recruitment
```

### **Check tables:**
```bash
mysql -u root -ppassword recruitment_db -e "SHOW TABLES;"
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

### **Check if any users exist:**
```bash
mysql -u root -ppassword recruitment_db -e "SELECT email, role FROM users;"
```

---

## 🚀 Quick Fix Steps

### **1. Start Backend**
```bash
cd /media/root329/Data/Recruitment/recruitment-platform/backend
mvn spring-boot:run
```

### **2. Wait for Startup**
Look for: `Started RecruitmentApplication in X seconds`

### **3. Check Tables Created**
```bash
mysql -u root -ppassword recruitment_db -e "SHOW TABLES;"
```

### **4. Test Registration**
Go to: http://localhost:5173/register

Fill in the form and click "Create Account"

### **5. Check Logs if It Fails**
Look at the terminal where backend is running for error messages

---

## 📝 View Real-Time Logs

### **Terminal 1: Backend Logs**
```bash
cd backend
mvn spring-boot:run
# Watch this terminal for errors
```

### **Terminal 2: Frontend Logs**
```bash
cd frontend
npm run dev
# Watch this terminal for errors
```

### **Browser Console:**
Press `F12` → Console tab
Look for red error messages

---

## 🆘 Still Not Working?

### **Get detailed error info:**

1. **Backend Terminal:** Copy the full error stack trace
2. **Browser Console (F12):** Copy any red errors
3. **Network Tab (F12):** Check the failed request

### **Common fixes:**

**MySQL not running:**
```bash
sudo systemctl start mysql
sudo systemctl status mysql
```

**Wrong MySQL password:**
```bash
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
EXIT;
```

**Port 8080 in use:**
```bash
sudo lsof -i :8080
sudo kill -9 <PID>
```

---

## ✅ Success Checklist

- [ ] MySQL is running: `sudo systemctl status mysql`
- [ ] Database exists: `mysql -u root -ppassword -e "SHOW DATABASES;" | grep recruitment`
- [ ] Backend is running: `curl http://localhost:8080/api/jobs`
- [ ] Frontend is running: Open http://localhost:5173
- [ ] Can see registration page
- [ ] Registration works!

---

## 💡 Pro Tip

**Always check these 3 things when something fails:**

1. **Backend Terminal** - Is it running? Any errors?
2. **Browser Console (F12)** - Any JavaScript errors?
3. **Network Tab (F12)** - What's the API response?

---

**Start by running the backend and watch the logs!** 🚀
