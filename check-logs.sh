#!/bin/bash

# ============================================
# Check Backend Server Logs
# ============================================

echo "🔍 Checking Backend Server Logs..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if backend is running
BACKEND_PID=$(ps aux | grep '[m]vn spring-boot:run' | awk '{print $2}')

if [ -z "$BACKEND_PID" ]; then
    echo "❌ Backend is NOT running!"
    echo ""
    echo "Start the backend with:"
    echo "  cd backend && mvn spring-boot:run"
    exit 1
fi

echo "✅ Backend is running (PID: $BACKEND_PID)"
echo ""

# Check for log files
echo "📋 Looking for log files..."
echo ""

# Check common log locations
if [ -f "backend.log" ]; then
    echo "Found: backend.log"
    echo ""
    echo "Last 50 lines of backend.log:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    tail -50 backend.log
elif [ -f "logs/spring.log" ]; then
    echo "Found: logs/spring.log"
    echo ""
    echo "Last 50 lines:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    tail -50 logs/spring.log
else
    echo "⚠️  No log file found. Showing console output from running process..."
    echo ""
    echo "To see real-time logs, check the terminal where you ran 'mvn spring-boot:run'"
    echo ""
    echo "Or run this to see recent errors:"
    echo "  journalctl -u spring-boot --no-pager -n 50"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔍 Checking for common errors..."
echo ""

# Check database connection
echo "Testing MySQL connection..."
if mysql -u root -ppassword -e "USE recruitment_db; SELECT 1;" 2>/dev/null; then
    echo "✅ MySQL connection OK"
else
    echo "❌ MySQL connection FAILED"
    echo "   Check username/password in application.properties"
fi

echo ""

# Check if tables exist
echo "Checking if tables exist..."
TABLE_COUNT=$(mysql -u root -ppassword recruitment_db -e "SHOW TABLES;" 2>/dev/null | wc -l)
if [ "$TABLE_COUNT" -gt 1 ]; then
    echo "✅ Found $((TABLE_COUNT - 1)) tables"
    mysql -u root -ppassword recruitment_db -e "SHOW TABLES;" 2>/dev/null
else
    echo "❌ No tables found! Backend may not have started properly."
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 To see live logs, run:"
echo "   tail -f backend.log"
echo ""
echo "   OR check the terminal where backend is running"
echo ""
