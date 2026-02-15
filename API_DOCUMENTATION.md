# API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication

All protected endpoints require JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 🔓 Public Endpoints

### 1. User Registration
**POST** `/auth/register`

Register a new candidate account.

**Request Body:**
```json
{
  "email": "candidate@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "phone": "+1234567890",
  "location": "New York, USA"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "type": "Bearer",
  "id": 1,
  "email": "candidate@example.com",
  "role": "CANDIDATE"
}
```

---

### 2. User Login
**POST** `/auth/login`

Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "type": "Bearer",
  "id": 1,
  "email": "user@example.com",
  "role": "CANDIDATE"
}
```

---

### 3. List All Jobs
**GET** `/jobs`

Get all job listings with optional filters.

**Query Parameters:**
- `companyId` (optional) - Filter by company
- `departmentId` (optional) - Filter by department
- `location` (optional) - Filter by location
- `status` (optional) - Filter by status (OPEN, ON_HOLD, CLOSED)

**Example:**
```
GET /jobs?location=New York&status=OPEN
```

**Response:**
```json
[
  {
    "id": 1,
    "companyId": 1,
    "departmentId": 1,
    "title": "Senior Software Engineer",
    "description": "We are looking for...",
    "skills": "Java, Spring Boot, React",
    "experienceMin": 5,
    "experienceMax": 8,
    "location": "New York",
    "jobType": "Full-time",
    "status": "OPEN",
    "companyName": "Tech Corp",
    "departmentName": "IT",
    "recruiterName": "Top Talent Agency"
  }
]
```

---

### 4. Get Job Details
**GET** `/jobs/{id}`

Get detailed information about a specific job.

**Response:**
```json
{
  "id": 1,
  "companyId": 1,
  "departmentId": 1,
  "title": "Senior Software Engineer",
  "description": "We are looking for...",
  "skills": "Java, Spring Boot, React",
  "experienceMin": 5,
  "experienceMax": 8,
  "location": "New York",
  "jobType": "Full-time",
  "status": "OPEN",
  "companyName": "Tech Corp",
  "departmentName": "IT",
  "recruiterName": "Top Talent Agency"
}
```

---

### 5. List Recruiters
**GET** `/public/recruiters`

Get all registered recruiters.

**Response:**
```json
[
  {
    "id": 1,
    "companyName": "Top Talent Agency",
    "contactNumber": "+1234567890",
    "address": "123 Main St, New York",
    "website": "https://toptalent.com",
    "description": "Leading recruitment agency"
  }
]
```

---

### 6. Submit Job Request
**POST** `/public/job-requests`

Submit a job requirement request to a recruiter (no authentication required).

**Request Body:**
```json
{
  "recruiterId": 1,
  "companyName": "ABC Corp",
  "contactName": "Jane Smith",
  "contactEmail": "jane@abccorp.com",
  "contactPhone": "+1234567890",
  "department": "IT",
  "jobDetails": "We need 5 Java developers with 3+ years experience"
}
```

**Response:**
```json
{
  "id": 1,
  "recruiterId": 1,
  "companyName": "ABC Corp",
  "contactName": "Jane Smith",
  "contactEmail": "jane@abccorp.com",
  "contactPhone": "+1234567890",
  "department": "IT",
  "jobDetails": "We need 5 Java developers...",
  "status": "PENDING"
}
```

---

## 🔐 Candidate Endpoints

### 1. Get Profile
**GET** `/candidate/profile`

Get candidate profile information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": 1,
  "fullName": "John Doe",
  "phone": "+1234567890",
  "location": "New York",
  "skills": "Java, Python, React",
  "experienceYears": 5,
  "resumeUrl": "/uploads/resume_123.pdf",
  "linkedinUrl": "https://linkedin.com/in/johndoe"
}
```

---

### 2. Update Profile
**PUT** `/candidate/profile`

Update candidate profile.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "phone": "+1234567890",
  "location": "New York",
  "skills": "Java, Python, React, Node.js",
  "experienceYears": 6,
  "linkedinUrl": "https://linkedin.com/in/johndoe"
}
```

---

### 3. Get Applications
**GET** `/candidate/applications`

Get all job applications submitted by the candidate.

**Response:**
```json
[
  {
    "id": 1,
    "jobId": 1,
    "jobTitle": "Senior Software Engineer",
    "companyName": "Tech Corp",
    "status": "APPLIED",
    "appliedAt": "2026-02-01T10:00:00",
    "recruiterNotes": null
  }
]
```

---

### 4. Apply for Job
**POST** `/candidate/applications`

Submit a job application.

**Request Body:**
```json
{
  "jobId": 1
}
```

**Response:**
```json
{
  "id": 1,
  "jobId": 1,
  "status": "APPLIED",
  "appliedAt": "2026-02-05T11:30:00"
}
```

---

## 🏢 Recruiter Endpoints

### 1. Get Dashboard Stats
**GET** `/recruiter/dashboard`

Get dashboard statistics.

**Response:**
```json
{
  "totalCompanies": 10,
  "totalJobs": 45,
  "totalApplications": 230,
  "pendingRequests": 5
}
```

---

### 2. Company Management

**List Companies**
```
GET /recruiter/companies
```

**Create Company**
```
POST /recruiter/companies
{
  "name": "Tech Corp",
  "industry": "Technology",
  "location": "New York",
  "description": "Leading tech company",
  "logoUrl": "https://example.com/logo.png"
}
```

**Update Company**
```
PUT /recruiter/companies/{id}
```

**Delete Company**
```
DELETE /recruiter/companies/{id}
```

---

### 3. Department Management

**List Departments**
```
GET /recruiter/departments
```

**Create Department**
```
POST /recruiter/departments
{
  "companyId": 1,
  "name": "IT",
  "description": "Information Technology Department"
}
```

---

### 4. Job Management

**List Jobs**
```
GET /recruiter/jobs
```

**Create Job**
```
POST /recruiter/jobs
{
  "companyId": 1,
  "departmentId": 1,
  "title": "Senior Software Engineer",
  "description": "We are looking for...",
  "skills": "Java, Spring Boot, React",
  "experienceMin": 5,
  "experienceMax": 8,
  "location": "New York",
  "jobType": "Full-time",
  "status": "OPEN"
}
```

**Update Job**
```
PUT /recruiter/jobs/{id}
```

**Delete Job**
```
DELETE /recruiter/jobs/{id}
```

---

### 5. Job Request Management

**List Job Requests**
```
GET /recruiter/job-requests
```

**Accept Request**
```
PUT /recruiter/job-requests/{id}/accept
```

**Reject Request**
```
PUT /recruiter/job-requests/{id}/reject
```

---

### 6. Application Management

**Get Job Applications**
```
GET /recruiter/jobs/{jobId}/applications
```

**Update Application Status**
```
PUT /recruiter/applications/{id}
{
  "status": "SHORTLISTED",
  "recruiterNotes": "Great candidate, schedule interview"
}
```

**Application Statuses:**
- `APPLIED`
- `SHORTLISTED`
- `REJECTED`
- `ON_HOLD`

---

## 👑 Admin Endpoints

### 1. Recruiter Management

**List Recruiters**
```
GET /admin/recruiters
```

**Create Recruiter**
```
POST /admin/recruiters
{
  "email": "recruiter@agency.com",
  "password": "password123",
  "companyName": "Top Talent Agency",
  "contactNumber": "+1234567890",
  "address": "123 Main St",
  "website": "https://toptalent.com"
}
```

**Update Recruiter**
```
PUT /admin/recruiters/{id}
```

**Delete Recruiter**
```
DELETE /admin/recruiters/{id}
```

---

### 2. Platform Statistics
**GET** `/admin/stats`

Get platform-wide statistics.

**Response:**
```json
{
  "totalUsers": 1000,
  "totalRecruiters": 50,
  "totalCandidates": 900,
  "totalJobs": 500,
  "totalApplications": 5000
}
```

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters"
  }
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid credentials"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "An error occurred while processing your request"
}
```

---

## 📝 Notes

1. All timestamps are in ISO 8601 format
2. JWT tokens expire after 15 minutes
3. File uploads limited to 5MB
4. Resume uploads accept PDF format only
5. All endpoints return JSON responses
