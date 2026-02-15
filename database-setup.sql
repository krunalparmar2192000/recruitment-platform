-- ============================================
-- Recruitment Platform Database Setup Script
-- ============================================
-- Database: recruitment_db
-- User: root
-- Password: password
-- ============================================

-- Drop existing database if needed (CAUTION!)
-- DROP DATABASE IF EXISTS recruitment_db;

-- Create database
CREATE DATABASE recruitment_db;

-- Connect to database
\c recruitment_db;

-- ============================================
-- TABLES WILL BE AUTO-CREATED BY HIBERNATE
-- ============================================
-- Spring Boot with JPA will automatically create tables
-- based on the Entity classes when the application starts.
-- 
-- Tables that will be created:
-- - users
-- - recruiters
-- - candidates
-- - companies
-- - departments
-- - jobs
-- - job_requests
-- - applications
-- ============================================

-- ============================================
-- INITIAL TEST DATA
-- ============================================

-- Note: Run this script AFTER starting the Spring Boot application
-- so that tables are created by Hibernate first.

-- Wait for application to create tables, then run:

-- ============================================
-- 1. CREATE ADMIN USER
-- ============================================
-- Password: admin123 (BCrypt hashed)
INSERT INTO users (email, password, role, active, created_at, updated_at)
VALUES ('admin@recruithub.com', 
        '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhCu', 
        'ADMIN', true, NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- 2. CREATE RECRUITER USER & PROFILE
-- ============================================
-- Password: recruiter123 (BCrypt hashed)
INSERT INTO users (email, password, role, active, created_at, updated_at)
VALUES ('recruiter@agency.com', 
        '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhCu', 
        'RECRUITER', true, NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

INSERT INTO recruiters (user_id, company_name, contact_number, address, website, description)
SELECT id, 'Top Talent Agency', '+1-555-0100', '123 Main Street, New York, NY 10001', 
       'https://toptalentagency.com', 'Leading recruitment agency specializing in tech talent'
FROM users WHERE email = 'recruiter@agency.com'
ON CONFLICT DO NOTHING;

-- ============================================
-- 3. CREATE SAMPLE CANDIDATE USER & PROFILE
-- ============================================
-- Password: candidate123 (BCrypt hashed)
INSERT INTO users (email, password, role, active, created_at, updated_at)
VALUES ('john.doe@example.com', 
        '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhCu', 
        'CANDIDATE', true, NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

INSERT INTO candidates (user_id, full_name, phone, location, skills, experience_years, linkedin_url)
SELECT id, 'John Doe', '+1-555-0200', 'San Francisco, CA', 
       'Java, Spring Boot, React, PostgreSQL, Docker, Kubernetes', 5,
       'https://linkedin.com/in/johndoe'
FROM users WHERE email = 'john.doe@example.com'
ON CONFLICT DO NOTHING;

-- ============================================
-- 4. CREATE SAMPLE COMPANIES
-- ============================================
INSERT INTO companies (recruiter_id, name, industry, location, description, logo_url)
SELECT r.id, 'Tech Innovations Inc', 'Technology', 'San Francisco, CA',
       'Leading software development company specializing in cloud solutions',
       'https://example.com/logos/tech-innovations.png'
FROM recruiters r
JOIN users u ON r.user_id = u.id
WHERE u.email = 'recruiter@agency.com';

INSERT INTO companies (recruiter_id, name, industry, location, description, logo_url)
SELECT r.id, 'Digital Solutions Corp', 'Technology', 'New York, NY',
       'Enterprise software solutions provider',
       'https://example.com/logos/digital-solutions.png'
FROM recruiters r
JOIN users u ON r.user_id = u.id
WHERE u.email = 'recruiter@agency.com';

-- ============================================
-- 5. CREATE SAMPLE DEPARTMENTS
-- ============================================
-- Departments for Tech Innovations Inc
INSERT INTO departments (company_id, name, description)
SELECT id, 'IT', 'Information Technology Department'
FROM companies WHERE name = 'Tech Innovations Inc';

INSERT INTO departments (company_id, name, description)
SELECT id, 'HR', 'Human Resources Department'
FROM companies WHERE name = 'Tech Innovations Inc';

INSERT INTO departments (company_id, name, description)
SELECT id, 'Sales', 'Sales and Marketing Department'
FROM companies WHERE name = 'Tech Innovations Inc';

-- Departments for Digital Solutions Corp
INSERT INTO departments (company_id, name, description)
SELECT id, 'Engineering', 'Software Engineering Department'
FROM companies WHERE name = 'Digital Solutions Corp';

INSERT INTO departments (company_id, name, description)
SELECT id, 'Finance', 'Finance and Accounting Department'
FROM companies WHERE name = 'Digital Solutions Corp';

-- ============================================
-- 6. CREATE SAMPLE JOB POSTINGS
-- ============================================
-- Job 1: Senior Software Engineer
INSERT INTO jobs (company_id, department_id, recruiter_id, title, description, skills, 
                  experience_min, experience_max, location, job_type, status, created_at, updated_at)
SELECT 
    c.id,
    d.id,
    r.id,
    'Senior Software Engineer',
    'We are seeking an experienced Senior Software Engineer to join our dynamic team. 
    
Key Responsibilities:
- Design and develop scalable backend services
- Lead technical architecture decisions
- Mentor junior developers
- Collaborate with cross-functional teams

Requirements:
- 5+ years of software development experience
- Strong expertise in Java and Spring Boot
- Experience with microservices architecture
- Excellent problem-solving skills

Benefits:
- Competitive salary
- Health insurance
- 401(k) matching
- Remote work options
- Professional development budget',
    'Java, Spring Boot, Microservices, PostgreSQL, Docker, Kubernetes, AWS',
    5, 8,
    'San Francisco, CA',
    'Full-time',
    'OPEN',
    NOW(), NOW()
FROM companies c
JOIN departments d ON d.company_id = c.id
JOIN recruiters r ON r.id = c.recruiter_id
WHERE c.name = 'Tech Innovations Inc' AND d.name = 'IT';

-- Job 2: Frontend Developer
INSERT INTO jobs (company_id, department_id, recruiter_id, title, description, skills, 
                  experience_min, experience_max, location, job_type, status, created_at, updated_at)
SELECT 
    c.id,
    d.id,
    r.id,
    'Frontend Developer',
    'Join our team as a Frontend Developer and help build amazing user experiences.
    
Responsibilities:
- Develop responsive web applications
- Implement modern UI/UX designs
- Optimize application performance
- Write clean, maintainable code

Requirements:
- 3+ years of frontend development
- Expert in React and modern JavaScript
- Experience with state management (Redux/Context)
- Strong CSS skills

What We Offer:
- Flexible working hours
- Modern tech stack
- Collaborative environment
- Career growth opportunities',
    'React, JavaScript, TypeScript, HTML5, CSS3, Redux, Webpack',
    3, 6,
    'San Francisco, CA',
    'Full-time',
    'OPEN',
    NOW(), NOW()
FROM companies c
JOIN departments d ON d.company_id = c.id
JOIN recruiters r ON r.id = c.recruiter_id
WHERE c.name = 'Tech Innovations Inc' AND d.name = 'IT';

-- Job 3: DevOps Engineer
INSERT INTO jobs (company_id, department_id, recruiter_id, title, description, skills, 
                  experience_min, experience_max, location, job_type, status, created_at, updated_at)
SELECT 
    c.id,
    d.id,
    r.id,
    'DevOps Engineer',
    'We are looking for a skilled DevOps Engineer to manage our infrastructure and deployment pipelines.
    
Key Duties:
- Manage cloud infrastructure (AWS/GCP)
- Implement CI/CD pipelines
- Monitor system performance
- Ensure security and compliance

Qualifications:
- 4+ years in DevOps/SRE role
- Strong knowledge of Docker and Kubernetes
- Experience with infrastructure as code
- Scripting skills (Python, Bash)

Perks:
- Competitive compensation
- Remote-first culture
- Latest tools and technologies
- Learning and development support',
    'Docker, Kubernetes, AWS, Terraform, Jenkins, Python, Linux',
    4, 7,
    'New York, NY',
    'Full-time',
    'OPEN',
    NOW(), NOW()
FROM companies c
JOIN departments d ON d.company_id = c.id
JOIN recruiters r ON r.id = c.recruiter_id
WHERE c.name = 'Digital Solutions Corp' AND d.name = 'Engineering';

-- ============================================
-- 7. CREATE SAMPLE JOB REQUEST
-- ============================================
INSERT INTO job_requests (recruiter_id, company_name, contact_name, contact_email, 
                          contact_phone, department, job_details, status, created_at, updated_at)
SELECT r.id,
       'ABC Corporation',
       'Jane Smith',
       'jane.smith@abccorp.com',
       '+1-555-0300',
       'IT',
       'We need 3 Java developers with 3+ years experience for a 6-month project. 
       Must have experience with Spring Boot and microservices.',
       'PENDING',
       NOW(), NOW()
FROM recruiters r
JOIN users u ON r.user_id = u.id
WHERE u.email = 'recruiter@agency.com';

-- ============================================
-- 8. CREATE SAMPLE APPLICATION
-- ============================================
INSERT INTO applications (job_id, candidate_id, status, recruiter_notes, applied_at, updated_at)
SELECT 
    j.id,
    c.id,
    'APPLIED',
    NULL,
    NOW(), NOW()
FROM jobs j
JOIN candidates c ON c.full_name = 'John Doe'
WHERE j.title = 'Senior Software Engineer';

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- View all users
SELECT id, email, role, active FROM users ORDER BY id;

-- View all recruiters
SELECT r.id, u.email, r.company_name, r.contact_number 
FROM recruiters r 
JOIN users u ON r.user_id = u.id;

-- View all candidates
SELECT c.id, u.email, c.full_name, c.location, c.experience_years
FROM candidates c 
JOIN users u ON c.user_id = u.id;

-- View all companies
SELECT c.id, c.name, c.industry, c.location, r.company_name as recruiter
FROM companies c
JOIN recruiters r ON c.recruiter_id = r.id;

-- View all departments
SELECT d.id, d.name, c.name as company
FROM departments d
JOIN companies c ON d.company_id = c.id;

-- View all jobs
SELECT j.id, j.title, c.name as company, d.name as department, j.status, j.location
FROM jobs j
JOIN companies c ON j.company_id = c.id
JOIN departments d ON j.department_id = d.id
ORDER BY j.created_at DESC;

-- View all applications
SELECT a.id, j.title as job, cand.full_name as candidate, a.status, a.applied_at
FROM applications a
JOIN jobs j ON a.job_id = j.id
JOIN candidates cand ON a.candidate_id = cand.id;

-- View all job requests
SELECT jr.id, jr.company_name, jr.contact_name, jr.department, jr.status
FROM job_requests jr;

-- ============================================
-- SUMMARY
-- ============================================
SELECT 
    'Users' as entity, COUNT(*) as count FROM users
UNION ALL
SELECT 'Recruiters', COUNT(*) FROM recruiters
UNION ALL
SELECT 'Candidates', COUNT(*) FROM candidates
UNION ALL
SELECT 'Companies', COUNT(*) FROM companies
UNION ALL
SELECT 'Departments', COUNT(*) FROM departments
UNION ALL
SELECT 'Jobs', COUNT(*) FROM jobs
UNION ALL
SELECT 'Applications', COUNT(*) FROM applications
UNION ALL
SELECT 'Job Requests', COUNT(*) FROM job_requests;
