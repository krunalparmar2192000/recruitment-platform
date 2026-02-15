#!/bin/bash

# Database Export Script for Recruitment Platform
# This script exports the current MySQL database to a SQL file

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Recruitment Platform Database Export ===${NC}\n"

# Database credentials (default values)
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-3306}"
DB_NAME="${DB_NAME:-recruitment_db}"
DB_USER="${DB_USER:-root}"
DB_PASS="${DB_PASS:-password}"

# Output file
OUTPUT_FILE="database-export.sql"

echo -e "${YELLOW}Database Configuration:${NC}"
echo "Host: $DB_HOST"
echo "Port: $DB_PORT"
echo "Database: $DB_NAME"
echo "User: $DB_USER"
echo ""

# Check if mysqldump is available
if ! command -v mysqldump &> /dev/null; then
    echo -e "${RED}Error: mysqldump command not found${NC}"
    echo "Please install MySQL client tools"
    exit 1
fi

# Test database connection
echo -e "${YELLOW}Testing database connection...${NC}"
if ! mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" -e "USE $DB_NAME;" 2>/dev/null; then
    echo -e "${RED}Error: Cannot connect to database${NC}"
    echo "Please check your database credentials"
    exit 1
fi

echo -e "${GREEN}✓ Database connection successful${NC}\n"

# Export database
echo -e "${YELLOW}Exporting database to $OUTPUT_FILE...${NC}"

mysqldump -h"$DB_HOST" \
          -P"$DB_PORT" \
          -u"$DB_USER" \
          -p"$DB_PASS" \
          --databases "$DB_NAME" \
          --add-drop-database \
          --add-drop-table \
          --routines \
          --triggers \
          --events \
          --single-transaction \
          --quick \
          --lock-tables=false \
          --set-gtid-purged=OFF \
          --result-file="$OUTPUT_FILE"

if [ $? -eq 0 ]; then
    FILE_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
    echo -e "${GREEN}✓ Database exported successfully!${NC}"
    echo -e "File: $OUTPUT_FILE"
    echo -e "Size: $FILE_SIZE"
    echo ""
    echo -e "${GREEN}You can now commit this file to Git and use it for deployment${NC}"
else
    echo -e "${RED}✗ Database export failed${NC}"
    exit 1
fi
