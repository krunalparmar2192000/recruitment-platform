#!/bin/bash

# ============================================
# Recruitment Platform - Database Setup Script
# ============================================

echo "🗄️  Setting up Recruitment Platform Database..."
echo ""

# Database credentials
DB_USER="root"
DB_PASSWORD="password"
DB_NAME="recruitment_db"
DB_HOST="localhost"
DB_PORT="5432"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if PostgreSQL is running
echo "📡 Checking PostgreSQL connection..."
if ! pg_isready -h $DB_HOST -p $DB_PORT > /dev/null 2>&1; then
    echo -e "${RED}❌ PostgreSQL is not running!${NC}"
    echo "Please start PostgreSQL and try again."
    exit 1
fi
echo -e "${GREEN}✓ PostgreSQL is running${NC}"
echo ""

# Create database
echo "📦 Creating database '$DB_NAME'..."
PGPASSWORD=$DB_PASSWORD createdb -h $DB_HOST -p $DB_PORT -U $DB_USER $DB_NAME 2>/dev/null
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Database created successfully${NC}"
else
    echo -e "${YELLOW}⚠ Database may already exist (this is OK)${NC}"
fi
echo ""

# Wait for Spring Boot to create tables
echo "⏳ Please start the Spring Boot application now..."
echo ""
echo "Run this command in another terminal:"
echo -e "${YELLOW}cd backend && mvn spring-boot:run${NC}"
echo ""
read -p "Press ENTER after the application has started and tables are created..."
echo ""

# Insert test data
echo "📝 Inserting test data..."
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME << 'EOF'

-- Admin User (Password: admin123)
INSERT INTO users (email, password, role, active, created_at, updated_at)
VALUES ('admin@recruithub.com', 
        '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhCu', 
        'ADMIN', true, NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Recruiter User (Password: recruiter123)
INSERT INTO users (email, password, role, active, created_at, updated_at)
VALUES ('recruiter@agency.com', 
        '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhCu', 
        'RECRUITER', true, NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

INSERT INTO recruiters (user_id, company_name, contact_number, address, website, description)
SELECT id, 'Top Talent Agency', '+1-555-0100', '123 Main Street, New York, NY 10001', 
       'https://toptalentagency.com', 'Leading recruitment agency'
FROM users WHERE email = 'recruiter@agency.com'
ON CONFLICT DO NOTHING;

-- Sample Candidate (Password: candidate123)
INSERT INTO users (email, password, role, active, created_at, updated_at)
VALUES ('john.doe@example.com', 
        '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhCu', 
        'CANDIDATE', true, NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

INSERT INTO candidates (user_id, full_name, phone, location, skills, experience_years, linkedin_url)
SELECT id, 'John Doe', '+1-555-0200', 'San Francisco, CA', 
       'Java, Spring Boot, React, PostgreSQL', 5,
       'https://linkedin.com/in/johndoe'
FROM users WHERE email = 'john.doe@example.com'
ON CONFLICT DO NOTHING;

-- Sample Company
INSERT INTO companies (recruiter_id, name, industry, location, description)
SELECT r.id, 'Tech Innovations Inc', 'Technology', 'San Francisco, CA',
       'Leading software development company'
FROM recruiters r
JOIN users u ON r.user_id = u.id
WHERE u.email = 'recruiter@agency.com';

-- Sample Department
INSERT INTO departments (company_id, name, description)
SELECT id, 'IT', 'Information Technology Department'
FROM companies WHERE name = 'Tech Innovations Inc';

-- Sample Job
INSERT INTO jobs (company_id, department_id, recruiter_id, title, description, skills, 
                  experience_min, experience_max, location, job_type, status, created_at, updated_at)
SELECT 
    c.id, d.id, r.id,
    'Senior Software Engineer',
    'We are seeking an experienced Senior Software Engineer to join our team.',
    'Java, Spring Boot, React, PostgreSQL',
    5, 8, 'San Francisco, CA', 'Full-time', 'OPEN',
    NOW(), NOW()
FROM companies c
JOIN departments d ON d.company_id = c.id
JOIN recruiters r ON r.id = c.recruiter_id
WHERE c.name = 'Tech Innovations Inc' AND d.name = 'IT';

EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Test data inserted successfully${NC}"
else
    echo -e "${RED}❌ Failed to insert test data${NC}"
    exit 1
fi
echo ""

# Display summary
echo "📊 Database Summary:"
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "
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
SELECT 'Jobs', COUNT(*) FROM jobs;
"

echo ""
echo -e "${GREEN}✅ Database setup complete!${NC}"
echo ""
echo "🔑 Test Accounts:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Admin:"
echo "  Email: admin@recruithub.com"
echo "  Password: admin123"
echo ""
echo "Recruiter:"
echo "  Email: recruiter@agency.com"
echo "  Password: recruiter123"
echo ""
echo "Candidate:"
echo "  Email: john.doe@example.com"
echo "  Password: candidate123"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🚀 Next Steps:"
echo "1. Make sure backend is running: cd backend && mvn spring-boot:run"
echo "2. Start frontend: cd frontend && npm install && npm run dev"
echo "3. Open browser: http://localhost:5173"
echo ""
