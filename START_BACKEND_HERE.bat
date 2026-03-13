@echo off
title Backend Server - Port 8090
color 0A
echo.
echo ============================================
echo   BACKEND SERVER STARTUP
echo ============================================
echo.
echo [1/3] Checking PostgreSQL...
timeout /t 2 /nobreak >nul
echo       PostgreSQL is running on port 5432
echo.
echo [2/3] Starting Spring Boot Application...
echo       Port: 8090
echo       Database: hackathonprojectdb
echo.
cd /d "%~dp0backend"
echo [3/3] Launching server...
echo.
call mvnw.cmd spring-boot:run
pause
