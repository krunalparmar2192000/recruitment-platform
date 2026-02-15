#!/bin/bash

# Database Import Script for Recruitment Platform
# This script imports the database from the SQL export file

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Recruitment Platform Database Import ===${NC}\n"

# Database credentials (default values)
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-3306}"
DB_USER="${DB_USER:-root}"
DB_PASS="${DB_PASS:-password}"

# Input file
INPUT_FILE="${1:-database-export.sql}"

if [ ! -f "$INPUT_FILE" ]; then
    echo -e "${RED}Error: Database file '$INPUT_FILE' not found${NC}"
    echo "Usage: $0 [database-file.sql]"
    exit 1
fi

echo -e "${YELLOW}Database Configuration:${NC}"
echo "Host: $DB_HOST"
echo "Port: $DB_PORT"
echo "User: $DB_USER"
echo "Import File: $INPUT_FILE"
echo ""

# Check if mysql is available
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}Error: mysql command not found${NC}"
    echo "Please install MySQL client tools"
    exit 1
fi

# Test database connection
echo -e "${YELLOW}Testing database connection...${NC}"
if ! mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" -e "SELECT 1;" 2>/dev/null; then
    echo -e "${RED}Error: Cannot connect to database${NC}"
    echo "Please check your database credentials"
    exit 1
fi

echo -e "${GREEN}✓ Database connection successful${NC}\n"

# Import database
echo -e "${YELLOW}Importing database from $INPUT_FILE...${NC}"

mysql -h"$DB_HOST" \
      -P"$DB_PORT" \
      -u"$DB_USER" \
      -p"$DB_PASS" \
      < "$INPUT_FILE"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Database imported successfully!${NC}"
    echo ""
    echo -e "${GREEN}Your recruitment platform database is now ready${NC}"
else
    echo -e "${RED}✗ Database import failed${NC}"
    exit 1
fi
