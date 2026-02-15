-- Complete cleanup and reseed script
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Delete all seeded data (in reverse dependency order)
DELETE FROM applications;
DELETE FROM jobs;
DELETE FROM departments;
DELETE FROM companies;
DELETE FROM candidates;
DELETE FROM recruiters;
DELETE FROM users WHERE email IN ('recruiter@recruithub.com', 'candidate1@recruithub.com', 'candidate2@recruithub.com');

-- 2. Create Users
-- Password is 'password' hashed with BCrypt
INSERT INTO users (email, password, role, active, created_at, updated_at) VALUES 
('recruiter@recruithub.com', '$2b$12$7lyX.vnC.efDhkX28nZEeu/xTCBLGTgi/1UiyOAbYdDfBdaXkvxxK', 'RECRUITER', 1, NOW(), NOW()),
('candidate1@recruithub.com', '$2b$12$7lyX.vnC.efDhkX28nZEeu/xTCBLGTgi/1UiyOAbYdDfBdaXkvxxK', 'CANDIDATE', 1, NOW(), NOW()),
('candidate2@recruithub.com', '$2b$12$7lyX.vnC.efDhkX28nZEeu/xTCBLGTgi/1UiyOAbYdDfBdaXkvxxK', 'CANDIDATE', 1, NOW(), NOW());

SET @recruiter_user_id = (SELECT id FROM users WHERE email = 'recruiter@recruithub.com');
SET @candidate1_user_id = (SELECT id FROM users WHERE email = 'candidate1@recruithub.com');
SET @candidate2_user_id = (SELECT id FROM users WHERE email = 'candidate2@recruithub.com');

-- 3. Create Recruiter Profile
INSERT INTO recruiters (user_id, company_name, contact_number, address, website, description) VALUES 
(@recruiter_user_id, 'TechFlow', '+1234567890', '123 Tech Blvd, San Francisco, CA', 'https://techflow.example.com', 'Authorized recruiter for TechFlow.');

SET @recruiter_id = (SELECT id FROM recruiters WHERE user_id = @recruiter_user_id);

-- 4. Create Companies
INSERT INTO companies (recruiter_id, name, industry, location, description, logo_url) VALUES 
(@recruiter_id, 'TechFlow', 'Technology', 'San Francisco, CA', 'Leading the way in software innovation.', 'https://via.placeholder.com/150'),
(@recruiter_id, 'DataSystems', 'Data Science', 'New York, NY', 'Big data solutions for enterprise.', 'https://via.placeholder.com/150'),
(@recruiter_id, 'CloudWorks', 'Cloud Computing', 'Austin, TX', 'Scalable cloud infrastructure.', 'https://via.placeholder.com/150'),
(@recruiter_id, 'FinTech Solutions', 'Finance', 'London, UK', 'Next-gen financial technology.', 'https://via.placeholder.com/150');

SET @company1_id = (SELECT id FROM companies WHERE name = 'TechFlow' AND recruiter_id = @recruiter_id LIMIT 1);
SET @company2_id = (SELECT id FROM companies WHERE name = 'DataSystems' AND recruiter_id = @recruiter_id LIMIT 1);

-- 5. Create Departments
INSERT INTO departments (company_id, name, description) VALUES 
(@company1_id, 'Engineering', 'Software development and engineering'),
(@company1_id, 'Product', 'Product management and design'),
(@company2_id, 'Sales', 'Global sales team'),
(@company2_id, 'Human Resources', 'People and culture'),
(@company1_id, 'Marketing', 'Brand and growth');

SET @dept_eng_id = (SELECT id FROM departments WHERE name = 'Engineering' AND company_id = @company1_id LIMIT 1);
SET @dept_prod_id = (SELECT id FROM departments WHERE name = 'Product' AND company_id = @company1_id LIMIT 1);

-- 6. Create Jobs
INSERT INTO jobs (recruiter_id, company_id, department_id, title, description, skills, experience_min, experience_max, location, job_type, status, created_at, updated_at) VALUES 
(@recruiter_id, @company1_id, @dept_eng_id, 'Senior Software Engineer', 'We are looking for a Senior Software Engineer to join our team.', 'Java, Spring Boot, React', 5, 8, 'San Francisco, CA', 'Full-time', 'OPEN', NOW(), NOW()),
(@recruiter_id, @company2_id, @dept_eng_id, 'Product Manager', 'Lead our product vision.', 'Product Management, Agile, Jira', 3, 6, 'New York, NY', 'Full-time', 'OPEN', NOW(), NOW()),
(@recruiter_id, @company1_id, @dept_eng_id, 'Frontend Developer', 'Build beautiful UIs.', 'React, TypeScript, Tailwind', 2, 5, 'Remote', 'Contract', 'OPEN', NOW(), NOW()),
(@recruiter_id, @company2_id, @dept_eng_id, 'Data Scientist', 'Analyze complex datasets.', 'Python, SQL, ML', 4, 7, 'Austin, TX', 'Full-time', 'OPEN', NOW(), NOW()),
(@recruiter_id, @company2_id, @dept_prod_id, 'Sales Representative', 'Drive revenue growth.', 'Sales, CRM, Negotiation', 1, 3, 'London, UK', 'Full-time', 'OPEN', NOW(), NOW());

-- 7. Create Candidates
INSERT INTO candidates (user_id, full_name, phone, location, skills, experience_years, resume_url, linkedin_url) VALUES 
(@candidate1_user_id, 'Alice Johnson', '+1987654321', 'San Francisco, CA', 'Java, Spring Boot, SQL', 5, 'https://via.placeholder.com/150', 'https://linkedin.com/in/alicejohnson'),
(@candidate2_user_id, 'Bob Smith', '+1122334455', 'New York, NY', 'React, Node.js', 3, 'https://via.placeholder.com/150', 'https://linkedin.com/in/bobsmith');

SET FOREIGN_KEY_CHECKS = 1;

SELECT 'Dummy data seeded successfully!' as message;
