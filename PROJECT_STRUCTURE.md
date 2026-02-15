# Recruitment & Job Vacancy Management Platform

## Architecture Overview

### Tech Stack
- **Frontend**: React.js 18+ with React Router, Axios, Context API
- **Backend**: Java 17, Spring Boot 3.x, Spring Security, JWT
- **Database**: PostgreSQL
- **Build Tools**: Maven (Backend), Vite (Frontend)

---

## Project Structure

```
recruitment-platform/
├── backend/                          # Spring Boot Application
│   ├── src/main/java/com/recruitment/
│   │   ├── config/                   # Security, CORS, JWT configs
│   │   ├── controller/               # REST Controllers
│   │   ├── dto/                      # Data Transfer Objects
│   │   ├── entity/                   # JPA Entities
│   │   ├── repository/               # Spring Data JPA Repositories
│   │   ├── service/                  # Business Logic
│   │   ├── security/                 # JWT, Auth filters
│   │   ├── exception/                # Custom exceptions
│   │   └── RecruitmentApplication.java
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── schema.sql
│   └── pom.xml
│
└── frontend/                         # React Application
    ├── public/
    ├── src/
    │   ├── components/               # Reusable components
    │   │   ├── common/              # Buttons, Cards, Modals
    │   │   ├── layout/              # Header, Footer, Sidebar
    │   │   └── forms/               # Form components
    │   ├── pages/                    # Page components
    │   │   ├── public/              # Home, Jobs, Recruiters
    │   │   ├── auth/                # Login, Register
    │   │   ├── candidate/           # Candidate dashboard
    │   │   ├── recruiter/           # Recruiter dashboard
    │   │   └── admin/               # Admin dashboard
    │   ├── context/                  # React Context (Auth, App state)
    │   ├── services/                 # API service layer
    │   ├── utils/                    # Helper functions
    │   ├── hooks/                    # Custom React hooks
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    └── vite.config.js
```

---

## Database Schema

### Tables & Relationships

1. **users**
   - id (PK)
   - email (unique)
   - password (hashed)
   - role (ADMIN, RECRUITER, CANDIDATE)
   - created_at
   - updated_at

2. **recruiters**
   - id (PK)
   - user_id (FK → users)
   - company_name
   - contact_number
   - address
   - website

3. **companies**
   - id (PK)
   - recruiter_id (FK → recruiters)
   - name
   - industry
   - location
   - description
   - logo_url

4. **departments**
   - id (PK)
   - company_id (FK → companies)
   - name (IT, HR, Sales, Finance, etc.)
   - description

5. **jobs**
   - id (PK)
   - company_id (FK → companies)
   - department_id (FK → departments)
   - recruiter_id (FK → recruiters)
   - title
   - description
   - skills (JSON or text)
   - experience_min
   - experience_max
   - location
   - job_type (Full-time, Part-time, Contract)
   - status (OPEN, ON_HOLD, CLOSED)
   - created_at
   - updated_at

6. **job_requests**
   - id (PK)
   - recruiter_id (FK → recruiters)
   - company_name
   - contact_name
   - contact_email
   - contact_phone
   - department
   - job_details (text)
   - status (PENDING, ACCEPTED, REJECTED)
   - created_at
   - updated_at

7. **candidates**
   - id (PK)
   - user_id (FK → users)
   - full_name
   - phone
   - location
   - skills (JSON or text)
   - experience_years
   - resume_url
   - linkedin_url

8. **applications**
   - id (PK)
   - job_id (FK → jobs)
   - candidate_id (FK → candidates)
   - status (APPLIED, SHORTLISTED, REJECTED, ON_HOLD)
   - recruiter_notes (text)
   - applied_at
   - updated_at

---

## API Endpoints

### Authentication
- POST `/api/auth/register` - Candidate registration
- POST `/api/auth/login` - Login (all roles)
- POST `/api/auth/refresh` - Refresh JWT token

### Admin
- GET `/api/admin/recruiters` - List all recruiters
- POST `/api/admin/recruiters` - Create recruiter account
- PUT `/api/admin/recruiters/{id}` - Update recruiter
- DELETE `/api/admin/recruiters/{id}` - Delete recruiter
- GET `/api/admin/stats` - Platform statistics

### Recruiter
- GET `/api/recruiter/dashboard` - Dashboard stats
- GET `/api/recruiter/companies` - List companies
- POST `/api/recruiter/companies` - Create company
- PUT `/api/recruiter/companies/{id}` - Update company
- DELETE `/api/recruiter/companies/{id}` - Delete company
- GET `/api/recruiter/departments` - List departments
- POST `/api/recruiter/departments` - Create department
- PUT `/api/recruiter/departments/{id}` - Update department
- DELETE `/api/recruiter/departments/{id}` - Delete department
- GET `/api/recruiter/job-requests` - List job requests
- PUT `/api/recruiter/job-requests/{id}/accept` - Accept request
- PUT `/api/recruiter/job-requests/{id}/reject` - Reject request
- GET `/api/recruiter/jobs` - List jobs
- POST `/api/recruiter/jobs` - Create job posting
- PUT `/api/recruiter/jobs/{id}` - Update job
- DELETE `/api/recruiter/jobs/{id}` - Delete job
- GET `/api/recruiter/jobs/{id}/applications` - View applications
- PUT `/api/recruiter/applications/{id}` - Update application status

### Client (Public)
- GET `/api/public/recruiters` - List recruiters
- POST `/api/public/job-requests` - Submit job requirement

### Candidate
- GET `/api/candidate/profile` - Get profile
- PUT `/api/candidate/profile` - Update profile
- POST `/api/candidate/resume` - Upload resume
- GET `/api/candidate/applications` - List applications
- POST `/api/candidate/applications` - Apply for job

### Jobs (Public)
- GET `/api/jobs` - List all jobs (with filters)
- GET `/api/jobs/{id}` - Get job details

---

## Frontend Routes

### Public Routes
- `/` - Home page
- `/jobs` - Job listings
- `/jobs/:id` - Job details
- `/recruiters` - Recruiter listing
- `/submit-requirement` - Client job requirement form
- `/login` - Login page
- `/register` - Registration page

### Protected Routes (Candidate)
- `/candidate/dashboard` - Dashboard
- `/candidate/profile` - Profile management
- `/candidate/applications` - Applied jobs

### Protected Routes (Recruiter)
- `/recruiter/dashboard` - Dashboard
- `/recruiter/companies` - Company management
- `/recruiter/departments` - Department management
- `/recruiter/jobs` - Job management
- `/recruiter/jobs/create` - Create job
- `/recruiter/jobs/:id/edit` - Edit job
- `/recruiter/applications` - Candidate applications
- `/recruiter/requests` - Client requests

### Protected Routes (Admin)
- `/admin/dashboard` - Dashboard
- `/admin/recruiters` - Recruiter management

---

## State Management

### Context Providers
1. **AuthContext** - User authentication state, login/logout
2. **JobContext** - Job listings, filters
3. **NotificationContext** - Toast notifications

---

## Security Features

1. **JWT Authentication**
   - Access token (15 min expiry)
   - Refresh token (7 days expiry)
   - Role-based authorization

2. **Password Security**
   - BCrypt hashing
   - Minimum 8 characters

3. **CORS Configuration**
   - Whitelist frontend origin

4. **File Upload Security**
   - File type validation (PDF only for resumes)
   - File size limit (5MB)

---

## UI/UX Guidelines

1. **Design System**
   - Modern SaaS aesthetic
   - Card-based layouts
   - Consistent spacing and typography
   - Responsive grid system

2. **Color Palette**
   - Primary: #4F46E5 (Indigo)
   - Secondary: #10B981 (Emerald)
   - Accent: #F59E0B (Amber)
   - Neutral: Grays
   - Danger: #EF4444 (Red)

3. **Components**
   - Buttons with hover states
   - Form inputs with validation
   - Loading states
   - Empty states
   - Error boundaries

4. **Responsive Breakpoints**
   - Mobile: < 640px
   - Tablet: 640px - 1024px
   - Desktop: > 1024px

---

## Development Workflow

1. **Backend Setup**
   - Configure PostgreSQL
   - Run Spring Boot application
   - Test APIs with Postman/Insomnia

2. **Frontend Setup**
   - Install dependencies
   - Configure API base URL
   - Run development server

3. **Testing**
   - Unit tests (JUnit for backend)
   - Integration tests
   - E2E tests (optional)

---

## Deployment Considerations

1. **Backend**
   - Package as JAR
   - Deploy to cloud (AWS, Azure, GCP)
   - Environment variables for secrets

2. **Frontend**
   - Build production bundle
   - Deploy to Vercel/Netlify/S3

3. **Database**
   - Managed PostgreSQL (RDS, Cloud SQL)
   - Regular backups
   - Connection pooling

---

## Next Steps

1. ✅ Create backend Spring Boot project
2. ✅ Create frontend React project
3. ✅ Implement database schema
4. ✅ Build REST APIs
5. ✅ Implement authentication
6. ✅ Build UI components
7. ✅ Integrate frontend with backend
8. ✅ Testing and refinement
