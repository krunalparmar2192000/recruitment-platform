#!/bin/bash

# ============================================
# Login Troubleshooting & Testing Script
# ============================================

echo "🔍 Diagnosing Login Issues..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if backend is running
echo "1️⃣ Checking if backend is running..."
if curl -s http://localhost:8080/api/jobs > /dev/null 2>&1; then
    echo "✅ Backend is running on port 8080"
else
    echo "❌ Backend is NOT running!"
    echo ""
    echo "🔧 FIX: Start the backend with:"
    echo "   cd backend && mvn spring-boot:run"
    echo ""
    exit 1
fi

echo ""

# Check database connection
echo "2️⃣ Checking database connection..."
if mysql -u root -ppassword -e "USE recruitment_db; SELECT 1;" 2>/dev/null; then
    echo "✅ MySQL connection OK"
else
    echo "❌ MySQL connection FAILED"
    echo ""
    echo "🔧 FIX: Check MySQL is running:"
    echo "   sudo systemctl start mysql"
    exit 1
fi

echo ""

# Check if users exist
echo "3️⃣ Checking if test users exist..."
USER_COUNT=$(mysql -u root -ppassword recruitment_db -e "SELECT COUNT(*) FROM users;" 2>/dev/null | tail -1)
echo "   Found $USER_COUNT users in database"

if [ "$USER_COUNT" -lt 3 ]; then
    echo "❌ Not enough users! Expected at least 3"
    echo ""
    echo "🔧 FIX: Insert test data:"
    echo "   mysql -u root -ppassword recruitment_db < database-setup-mysql.sql"
    exit 1
else
    echo "✅ Test users exist"
fi

echo ""

# Show users
echo "4️⃣ Test accounts in database:"
mysql -u root -ppassword recruitment_db -e "SELECT id, email, role FROM users LIMIT 5;" 2>/dev/null

echo ""

# Test login API
echo "5️⃣ Testing login API..."
echo ""

echo "Testing Admin login..."
ADMIN_RESPONSE=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@recruithub.com","password":"admin123"}')

if echo "$ADMIN_RESPONSE" | grep -q "token"; then
    echo "✅ Admin login WORKS!"
    echo "   Response: ${ADMIN_RESPONSE:0:100}..."
else
    echo "❌ Admin login FAILED!"
    echo "   Response: $ADMIN_RESPONSE"
fi

echo ""

echo "Testing Recruiter login..."
RECRUITER_RESPONSE=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"recruiter@agency.com","password":"recruiter123"}')

if echo "$RECRUITER_RESPONSE" | grep -q "token"; then
    echo "✅ Recruiter login WORKS!"
else
    echo "❌ Recruiter login FAILED!"
    echo "   Response: $RECRUITER_RESPONSE"
fi

echo ""

echo "Testing Candidate login..."
CANDIDATE_RESPONSE=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john.doe@example.com","password":"candidate123"}')

if echo "$CANDIDATE_RESPONSE" | grep -q "token"; then
    echo "✅ Candidate login WORKS!"
else
    echo "❌ Candidate login FAILED!"
    echo "   Response: $CANDIDATE_RESPONSE"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Summary
echo "📋 SUMMARY:"
echo ""
if curl -s http://localhost:8080/api/jobs > /dev/null 2>&1; then
    if echo "$ADMIN_RESPONSE" | grep -q "token"; then
        echo "✅ Everything is working!"
        echo ""
        echo "🔑 You can login with:"
        echo "   Admin: admin@recruithub.com / admin123"
        echo "   Recruiter: recruiter@agency.com / recruiter123"
        echo "   Candidate: john.doe@example.com / candidate123"
        echo ""
        echo "🌐 Go to: http://localhost:5173/login"
    else
        echo "⚠️  Backend is running but login is failing"
        echo ""
        echo "🔧 Possible issues:"
        echo "   1. Password hashing mismatch"
        echo "   2. BCrypt configuration issue"
        echo "   3. Database schema mismatch"
        echo ""
        echo "Check backend logs for errors"
    fi
else
    echo "❌ Backend is not running!"
    echo ""
    echo "🔧 Start backend first:"
    echo "   cd backend && mvn spring-boot:run"
fi

echo ""
