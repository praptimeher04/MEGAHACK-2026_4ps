@echo off
echo Creating PostgreSQL database...
"C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -c "CREATE DATABASE hackathonprojectdb;"
echo Database created successfully!
pause
