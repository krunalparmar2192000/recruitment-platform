# 🧪 Testing Guide

## Complete Testing Workflow

### Prerequisites
- Backend running on http://localhost:8080
- Frontend running on http://localhost:5173
- PostgreSQL database created and running

---

## 1️⃣ Initial Setup

### Create Admin Account
```sql
-- Connect to database
psql -U postgres -d recruitment_db

-- Create admin user
INSERT INTO users (email, password, role, active, created_at, updated_at)
VALUES ('admin@recruithub.com', 
        '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhCu', 
        'ADMIN', true, NOW(), NOW());
```

**Admin Credentials:**
- Email: admin@recruithub.com
- Password: admin123

---

## 2️⃣ Test Admin Functionality

### Login as Admin
1. Go to http://localhost:5173/login
2. Enter admin credentials
3. Should redirect to `/admin/dashboard`

### Create Recruiter Account
**Using API (Postman/curl):**
```bash
curl -X POST http://localhost:8080/api/admin/recruiters \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN" \
  -d '{
    "email": "recruiter@agency.com",
    "password": "recruiter123",
    "companyName": "Top Talent Agency",
    "contactNumber": "+1234567890",
    "address": "123 Main St, New York",
    "website": "https://toptalent.com",
    "description": "Leading recruitment agency"
  }'
```

**Or via SQL:**
```sql
-- Create recruiter user
INSERT INTO users (email, password, role, active, created_at, updated_at)
VALUES ('recruiter@agency.com', 
        '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhCu', 
        'RECRUITER', true, NOW(), NOW());

-- Create recruiter profile
INSERT INTO recruiters (user_id, company_name, contact_number, address, website, description)
VALUES ((SELECT id FROM users WHERE email = 'recruiter@agency.com'),
        'Top Talent Agency',
        '+1234567890',
        '123 Main St, New York',
        'https://toptalent.com',
        'Leading recruitment agency');
```

**Recruiter Credentials:**
- Email: recruiter@agency.com
- Password: recruiter123

### View Platform Statistics
```bash
curl http://localhost:8080/api/admin/stats \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

**Expected Response:**
```json
{
  "totalUsers": 2,
  "totalRecruiters": 1,
  "totalCandidates": 0,
  "totalJobs": 0,
  "totalApplications": 0
}
```

---

## 3️⃣ Test Recruiter Functionality

### Login as Recruiter
1. Logout from admin
2. Login with recruiter credentials
3. Should redirect to `/recruiter/dashboard`

### Create Company
```bash
curl -X POST http://localhost:8080/api/recruiter/companies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_RECRUITER_JWT_TOKEN" \
  -d '{
    "name": "Tech Corp",
    "industry": "Technology",
    "location": "San Francisco, CA",
    "description": "Leading technology company",
    "logoUrl": "https://example.com/logo.png"
  }'
```

### Create Department
```bash
curl -X POST http://localhost:8080/api/recruiter/departments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_RECRUITER_JWT_TOKEN" \
  -d '{
    "company": {"id": 1},
    "name": "IT",
    "description": "Information Technology Department"
  }'
```

### Create Job Posting
```bash
curl -X POST http://localhost:8080/api/recruiter/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_RECRUITER_JWT_TOKEN" \
  -d '{
    "company": {"id": 1},
    "department": {"id": 1},
    "title": "Senior Software Engineer",
    "description": "We are looking for an experienced software engineer...",
    "skills": "Java, Spring Boot, React, PostgreSQL",
    "experienceMin": 5,
    "experienceMax": 8,
    "location": "San Francisco, CA",
    "jobType": "Full-time",
    "status": "OPEN"
  }'
```

### View Dashboard Stats
```bash
curl http://localhost:8080/api/recruiter/dashboard \
  -H "Authorization: Bearer YOUR_RECRUITER_JWT_TOKEN"
```

---

## 4️⃣ Test Candidate Functionality

### Register New Candidate
1. Go to http://localhost:5173/register
2. Fill form:
   - Full Name: John Doe
   - Email: john@example.com
   - Password: password123
   - Phone: +1234567890
   - Location: New York, NY
3. Click "Create Account"
4. Should auto-login and redirect to `/candidate/dashboard`

### Browse Jobs (Public)
1. Go to http://localhost:5173/jobs
2. Should see job listings
3. Can filter by location
4. Click on a job to view details

### Apply for Job
1. While logged in as candidate
2. Go to job details page
3. Click "Apply Now"
4. Should see success message

**Or via API:**
```bash
curl -X POST http://localhost:8080/api/candidate/applications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CANDIDATE_JWT_TOKEN" \
  -d '{"jobId": 1}'
```

### View Applications
```bash
curl http://localhost:8080/api/candidate/applications \
  -H "Authorization: Bearer YOUR_CANDIDATE_JWT_TOKEN"
```

### Update Profile
```bash
curl -X PUT http://localhost:8080/api/candidate/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CANDIDATE_JWT_TOKEN" \
  -d '{
    "fullName": "John Doe",
    "phone": "+1234567890",
    "location": "New York, NY",
    "skills": "Java, Python, React, Node.js",
    "experienceYears": 5,
    "linkedinUrl": "https://linkedin.com/in/johndoe"
  }'
```

---

## 5️⃣ Test Client Job Request (No Login)

### Submit Job Request
1. Go to http://localhost:5173/submit-requirement
2. Fill form:
   - Company Name: ABC Corp
   - Contact Name: Jane Smith
   - Contact Email: jane@abccorp.com
   - Contact Phone: +1987654321
   - Department: IT
   - Job Details: We need 5 Java developers...
3. Submit
4. Should see success message

**Or via API:**
```bash
curl -X POST http://localhost:8080/api/public/job-requests \
  -H "Content-Type: application/json" \
  -d '{
    "recruiterId": 1,
    "companyName": "ABC Corp",
    "contactName": "Jane Smith",
    "contactEmail": "jane@abccorp.com",
    "contactPhone": "+1987654321",
    "department": "IT",
    "jobDetails": "We need 5 Java developers with 3+ years experience"
  }'
```

### Recruiter: View and Accept Request
```bash
# View requests
curl http://localhost:8080/api/recruiter/job-requests \
  -H "Authorization: Bearer YOUR_RECRUITER_JWT_TOKEN"

# Accept request
curl -X PUT http://localhost:8080/api/recruiter/job-requests/1/accept \
  -H "Authorization: Bearer YOUR_RECRUITER_JWT_TOKEN"
```

---

## 6️⃣ Test Application Management

### Recruiter: View Applications for Job
```bash
curl http://localhost:8080/api/recruiter/jobs/1/applications \
  -H "Authorization: Bearer YOUR_RECRUITER_JWT_TOKEN"
```

### Recruiter: Update Application Status
```bash
curl -X PUT http://localhost:8080/api/recruiter/applications/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_RECRUITER_JWT_TOKEN" \
  -d '{
    "status": "SHORTLISTED",
    "recruiterNotes": "Great candidate! Schedule interview."
  }'
```

**Application Statuses:**
- APPLIED
- SHORTLISTED
- REJECTED
- ON_HOLD

---

## 7️⃣ Test Authorization

### Test Unauthorized Access
```bash
# Try to access recruiter endpoint as candidate
curl http://localhost:8080/api/recruiter/dashboard \
  -H "Authorization: Bearer CANDIDATE_JWT_TOKEN"

# Should return 403 Forbidden
```

### Test Unauthenticated Access
```bash
# Try to access protected endpoint without token
curl http://localhost:8080/api/candidate/profile

# Should return 401 Unauthorized
```

---

## 8️⃣ End-to-End Test Scenario

### Complete Recruitment Flow

1. **Admin creates recruiter account** ✓
2. **Recruiter logs in** ✓
3. **Recruiter creates company** ✓
4. **Recruiter creates department** ✓
5. **Recruiter posts job** ✓
6. **Candidate registers** ✓
7. **Candidate browses jobs** ✓
8. **Candidate applies for job** ✓
9. **Recruiter views applications** ✓
10. **Recruiter updates application status** ✓
11. **Candidate checks application status** ✓
12. **Client submits job request** ✓
13. **Recruiter accepts request** ✓
14. **Recruiter creates job from request** ✓

---

## 🧪 Automated Testing (Optional)

### Backend Unit Tests (JUnit)
```java
@Test
public void testUserRegistration() {
    RegisterRequest request = new RegisterRequest();
    request.setEmail("test@example.com");
    request.setPassword("password123");
    request.setFullName("Test User");
    
    AuthResponse response = authService.register(request);
    assertNotNull(response.getToken());
    assertEquals("CANDIDATE", response.getRole());
}
```

### Frontend Testing (Jest/React Testing Library)
```javascript
test('renders login form', () => {
  render(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});
```

---

## 📊 Test Checklist

### Authentication ✓
- [x] User registration
- [x] User login
- [x] JWT token generation
- [x] Token validation
- [x] Role-based access

### Candidate Features ✓
- [x] Profile management
- [x] Job browsing
- [x] Job application
- [x] Application tracking

### Recruiter Features ✓
- [x] Company CRUD
- [x] Department CRUD
- [x] Job CRUD
- [x] Application management
- [x] Job request handling
- [x] Dashboard statistics

### Admin Features ✓
- [x] Recruiter management
- [x] Platform statistics
- [x] User status toggle

### Public Features ✓
- [x] Job listings
- [x] Job details
- [x] Recruiter listings
- [x] Job request submission

---

## 🐛 Common Issues

### Issue: JWT Token Expired
**Solution:** Login again to get new token

### Issue: 403 Forbidden
**Solution:** Check user role matches endpoint requirement

### Issue: Database Connection Error
**Solution:** Verify PostgreSQL is running and credentials are correct

### Issue: CORS Error
**Solution:** Check CORS configuration in backend

---

## 📝 Test Data Summary

After running all tests, you should have:

- **Users:** 3 (1 Admin, 1 Recruiter, 1 Candidate)
- **Companies:** 1
- **Departments:** 1
- **Jobs:** 1-2
- **Applications:** 1
- **Job Requests:** 1

---

## ✅ Success Criteria

Platform is working correctly if:

1. ✓ All users can login with correct credentials
2. ✓ Role-based access is enforced
3. ✓ Candidates can browse and apply for jobs
4. ✓ Recruiters can manage companies, departments, and jobs
5. ✓ Recruiters can review and update applications
6. ✓ Clients can submit job requests
7. ✓ Admin can manage recruiters and view stats
8. ✓ All API endpoints return expected responses
9. ✓ Frontend pages render correctly
10. ✓ No console errors in browser or backend logs

---

**Happy Testing! 🎉**
