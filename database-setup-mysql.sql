-- ============================================
-- Recruitment Platform - MySQL Setup Script
-- ============================================
-- Database: recruitment_db
-- User: root
-- Password: password
-- ============================================

-- Create database
CREATE DATABASE IF NOT EXISTS recruitment_db;
USE recruitment_db;

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

-- ============================================
-- 1. CREATE ADMIN USER
-- ============================================
-- Password: admin123 (BCrypt hashed)
INSERT INTO users (email, password, role, active, created_at, updated_at)
VALUES ('admin@recruithub.com', 
        '$2a$10$0jEOmt72wa1xmqZudxc3juBfXOud7DafB1/rHmac5nx4yLYMny32e', 
        'ADMIN', true, NOW(), NOW())
ON DUPLICATE KEY UPDATE password=VALUES(password);

-- ============================================
-- 2. CREATE RECRUITER USER & PROFILE
-- ============================================
-- Password: recruiter123 (BCrypt hashed)
INSERT INTO users (email, password, role, active, created_at, updated_at)
VALUES ('recruiter@agency.com', 
        '$2a$10$klj/VCnO8jHm60sU82vly.F9i.l26JlQJg5GgHiJDUSQgLWl06Zve', 
        'RECRUITER', true, NOW(), NOW())
ON DUPLICATE KEY UPDATE password=VALUES(password);

INSERT INTO recruiters (user_id, company_name, contact_number, address, website, description)
SELECT id, 'Top Talent Agency', '+1-555-0100', '123 Main Street, New York, NY 10001', 
       'https://toptalentagency.com', 'Leading recruitment agency specializing in tech talent'
FROM users WHERE email = 'recruiter@agency.com'
ON DUPLICATE KEY UPDATE company_name=company_name;

-- ============================================
-- 3. CREATE SAMPLE CANDIDATE USER & PROFILE
-- ============================================
-- Password: candidate123 (BCrypt hashed)
INSERT INTO users (email, password, role, active, created_at, updated_at)
VALUES ('john.doe@example.com', 
        '$2a$10$uX6keWRWF8LYonT9EXdwweWlVb01XV8k4m6wtPssLrFLPkskTCsMG', 
        'CANDIDATE', true, NOW(), NOW())
ON DUPLICATE KEY UPDATE password=VALUES(password);

INSERT INTO candidates (user_id, full_name, phone, location, skills, experience_years, linkedin_url)
SELECT id, 'John Doe', '+1-555-0200', 'San Francisco, CA', 
       'Java, Spring Boot, React, PostgreSQL, Docker, Kubernetes', 5,
       'https://linkedin.com/in/johndoe'
FROM users WHERE email = 'john.doe@example.com'
ON DUPLICATE KEY UPDATE full_name=full_name;

-- ============================================
-- 4. CREATE SAMPLE COMPANIES
-- ============================================
INSERT INTO companies (recruiter_id, name, industry, location, description, logo_url)
SELECT r.id, 'Tech Innovations Inc', 'Technology', 'San Francisco, CA',
       'Leading software development company specializing in cloud solutions',
       'https://example.com/logos/tech-innovations.png'
FROM recruiters r
JOIN users u ON r.user_id = u.id
WHERE u.email = 'recruiter@agency.com'
ON DUPLICATE KEY UPDATE companies.name=companies.name;

INSERT INTO companies (recruiter_id, name, industry, location, description, logo_url)
SELECT r.id, 'Digital Solutions Corp', 'Technology', 'New York, NY',
       'Enterprise software solutions provider',
       'https://example.com/logos/digital-solutions.png'
FROM recruiters r
JOIN users u ON r.user_id = u.id
WHERE u.email = 'recruiter@agency.com'
ON DUPLICATE KEY UPDATE companies.name=companies.name;

-- ============================================
-- 5. CREATE SAMPLE DEPARTMENTS
-- ============================================
-- Departments for Tech Innovations Inc
INSERT INTO departments (company_id, name, description)
SELECT c.id, 'IT', 'Information Technology Department'
FROM companies c WHERE c.name = 'Tech Innovations Inc'
ON DUPLICATE KEY UPDATE departments.name=departments.name;

INSERT INTO departments (company_id, name, description)
SELECT c.id, 'HR', 'Human Resources Department'
FROM companies c WHERE c.name = 'Tech Innovations Inc'
ON DUPLICATE KEY UPDATE departments.name=departments.name;

INSERT INTO departments (company_id, name, description)
SELECT c.id, 'Sales', 'Sales and Marketing Department'
FROM companies c WHERE c.name = 'Tech Innovations Inc'
ON DUPLICATE KEY UPDATE departments.name=departments.name;

-- Departments for Digital Solutions Corp
INSERT INTO departments (company_id, name, description)
SELECT c.id, 'Engineering', 'Software Engineering Department'
FROM companies c WHERE c.name = 'Digital Solutions Corp'
ON DUPLICATE KEY UPDATE departments.name=departments.name;

INSERT INTO departments (company_id, name, description)
SELECT c.id, 'Finance', 'Finance and Accounting Department'
FROM companies c WHERE c.name = 'Digital Solutions Corp'
ON DUPLICATE KEY UPDATE departments.name=departments.name;

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
    'We are seeking an experienced Senior Software Engineer to join our dynamic team.',
    'Java, Spring Boot, Microservices, PostgreSQL, Docker, Kubernetes, AWS',
    5, 8,
    'San Francisco, CA',
    'Full-time',
    'OPEN',
    NOW(), NOW()
FROM companies c
JOIN departments d ON d.company_id = c.id
JOIN recruiters r ON r.id = c.recruiter_id
WHERE c.name = 'Tech Innovations Inc' AND d.name = 'IT'
ON DUPLICATE KEY UPDATE title=title;

-- Job 2: Frontend Developer
INSERT INTO jobs (company_id, department_id, recruiter_id, title, description, skills, 
                  experience_min, experience_max, location, job_type, status, created_at, updated_at)
SELECT 
    c.id,
    d.id,
    r.id,
    'Frontend Developer',
    'Join our team as a Frontend Developer and help build amazing user experiences.',
    'React, JavaScript, TypeScript, HTML5, CSS3, Redux, Webpack',
    3, 6,
    'San Francisco, CA',
    'Full-time',
    'OPEN',
    NOW(), NOW()
FROM companies c
JOIN departments d ON d.company_id = c.id
JOIN recruiters r ON r.id = c.recruiter_id
WHERE c.name = 'Tech Innovations Inc' AND d.name = 'IT'
ON DUPLICATE KEY UPDATE title=title;

-- Job 3: DevOps Engineer
INSERT INTO jobs (company_id, department_id, recruiter_id, title, description, skills, 
                  experience_min, experience_max, location, job_type, status, created_at, updated_at)
SELECT 
    c.id,
    d.id,
    r.id,
    'DevOps Engineer',
    'We are looking for a skilled DevOps Engineer to manage our infrastructure.',
    'Docker, Kubernetes, AWS, Terraform, Jenkins, Python, Linux',
    4, 7,
    'New York, NY',
    'Full-time',
    'OPEN',
    NOW(), NOW()
FROM companies c
JOIN departments d ON d.company_id = c.id
JOIN recruiters r ON r.id = c.recruiter_id
WHERE c.name = 'Digital Solutions Corp' AND d.name = 'Engineering'
ON DUPLICATE KEY UPDATE title=title;

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
       'We need 3 Java developers with 3+ years experience for a 6-month project.',
       'PENDING',
       NOW(), NOW()
FROM recruiters r
JOIN users u ON r.user_id = u.id
WHERE u.email = 'recruiter@agency.com'
ON DUPLICATE KEY UPDATE job_requests.company_name=job_requests.company_name;

-- ============================================
-- 8. CREATE SAMPLE APPLICATION
-- ============================================
INSERT INTO applications (job_id, candidate_id, status, recruiter_notes, applied_at, updated_at)
SELECT 
    j.id,
    cand.id,
    'APPLIED',
    NULL,
    NOW(), NOW()
FROM jobs j
JOIN candidates cand ON cand.full_name = 'John Doe'
WHERE j.title = 'Senior Software Engineer'
ON DUPLICATE KEY UPDATE applications.status=applications.status;

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
