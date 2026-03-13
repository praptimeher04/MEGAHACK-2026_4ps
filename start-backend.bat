@echo off
echo ========================================
echo Starting Backend Server
echo ========================================
echo.
echo Make sure PostgreSQL is running!
echo Database: hackathonprojectdb
echo Username: postgres
echo Password: admin@123
echo Port: 8090
echo.
echo ========================================
cd backend
call mvnw.cmd spring-boot:run
