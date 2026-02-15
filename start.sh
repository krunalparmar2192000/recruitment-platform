#!/bin/bash

# ============================================
# Recruitment Platform - Quick Start
# ============================================

echo "🚀 Starting Recruitment Platform..."
echo ""

# Check if database exists
echo "📡 Checking database..."
if ! PGPASSWORD=password psql -U root -lqt | cut -d \| -f 1 | grep -qw recruitment_db; then
    echo "❌ Database 'recruitment_db' not found!"
    echo ""
    echo "Please run the database setup first:"
    echo "  ./setup-database.sh"
    echo ""
    exit 1
fi

echo "✅ Database found"
echo ""

# Start backend in background
echo "🔧 Starting backend (Spring Boot)..."
cd backend
mvn spring-boot:run > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

echo "⏳ Waiting for backend to start (this may take 30-60 seconds)..."
sleep 45

# Check if backend is running
if ! curl -s http://localhost:8080/api/jobs > /dev/null 2>&1; then
    echo "⚠️  Backend may still be starting..."
    echo "   Check backend.log for details"
fi

echo "✅ Backend started (PID: $BACKEND_PID)"
echo ""

# Start frontend
echo "🎨 Starting frontend (React + Vite)..."
cd frontend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "✅ Starting development server..."
npm run dev

# Cleanup on exit
trap "kill $BACKEND_PID 2>/dev/null" EXIT
