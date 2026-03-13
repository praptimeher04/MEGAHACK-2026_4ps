@echo off
title BACKEND SERVER - DO NOT CLOSE THIS WINDOW
color 0A
echo.
echo ============================================
echo   BACKEND SERVER IS STARTING...
echo   Port: 8090
echo   Database: hackathonproject db
echo ============================================
echo.
echo IMPORTANT: Keep this window OPEN!
echo Close this window ONLY when you're done.
echo.
cd /d "%~dp0backend"
call mvnw.cmd spring-boot:run
echo.
echo ============================================
echo   SERVER STOPPED
echo ============================================
pause
