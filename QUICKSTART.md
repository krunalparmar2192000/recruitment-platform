# 🚀 Quick Start Guide

## Get Started in 5 Minutes!

### Step 1: Setup Database (Automated)
```bash
# Run the automated setup script
./setup-database.sh
```

**Or manually:**
```bash
# Create database with your credentials
# Username: root, Password: password
createdb -U root recruitment_db

# Start Spring Boot (it will create tables automatically)
cd backend
mvn spring-boot:run

# In another terminal, insert test data
psql -U root -d recruitment_db -f database-setup.sql
```

### Step 2: Start Backend
```bash
cd backend
mvn spring-boot:run
```
✅ Backend running on http://localhost:8080

### Step 3: Start Frontend
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend running on http://localhost:5173

### Step 4: Access the Application
Open your browser and navigate to: **http://localhost:5173**

---

## 🎯 Quick Test Flow

### 1. Register as Candidate
1. Click "Sign Up" button
2. Fill in registration form
3. Automatically logged in after registration

### 2. Browse Jobs
1. Navigate to "Browse Jobs"
2. View available job listings
3. Click on a job to see details
4. Click "Apply Now" (requires login)

### 3. Test Client Job Request (No Login Required)
1. Go to "Submit Requirement" page
2. Fill in company details and job requirements
3. Submit request to recruiter

---

## 🔑 Default Test Accounts

### Create Admin Account (Via Database)
```sql
INSERT INTO users (email, password, role, active, created_at, updated_at)
VALUES ('admin@recruithub.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhCu', 'ADMIN', true, NOW(), NOW());
-- Password: admin123
```

### Create Recruiter Account (Via Database)
```sql
-- Insert user
INSERT INTO users (email, password, role, active, created_at, updated_at)
VALUES ('recruiter@agency.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhCu', 'RECRUITER', true, NOW(), NOW());

-- Insert recruiter profile
INSERT INTO recruiters (user_id, company_name, contact_number)
VALUES ((SELECT id FROM users WHERE email = 'recruiter@agency.com'), 'Top Talent Agency', '+1234567890');
-- Password: admin123
```

### Register Candidate
Use the registration form at http://localhost:5173/register

---

## 📋 Quick Feature Checklist

- [ ] User registration and login
- [ ] Browse jobs without login
- [ ] Apply for jobs (requires login)
- [ ] Candidate dashboard
- [ ] Recruiter dashboard
- [ ] Admin dashboard
- [ ] Client job request submission
- [ ] Company management
- [ ] Department management
- [ ] Job posting management
- [ ] Application tracking

---

## 🛠️ Troubleshooting

**Backend won't start?**
- Check if PostgreSQL is running
- Verify database credentials in `application.properties`
- Ensure port 8080 is available

**Frontend won't start?**
- Run `npm install` first
- Check if port 5173 is available
- Clear npm cache: `npm cache clean --force`

**Can't login?**
- Check backend console for errors
- Verify database has user records
- Check browser console for API errors

---

## 📚 Next Steps

1. **Explore the codebase** - Check out the well-organized structure
2. **Customize the design** - Modify colors in `frontend/src/index.css`
3. **Add features** - Extend functionality based on requirements
4. **Deploy** - Follow deployment guide in main README.md

---

**Happy Coding! 🎉**
