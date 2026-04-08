@echo off
setlocal
title OSS PUSTAKALAYA - CLOUD CONNECT
color 0b

echo ======================================================
echo    OSS PUSTAKALAYA - STARTING CLOUD SERVER...
echo ======================================================
echo.

:: 1. Check for Node.js
echo [1/3] Checking environment...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    color 0c
    echo ERROR: Node.js is NOT installed or NOT in your PATH.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b
)
echo OK: Node.js found.

:: 2. Start the Server
echo [2/3] Starting Local Server on Port 3000...
echo (This will bypass browser security blocks)
echo.

:: Use npx serve with auto-yes and non-interactive flags
start /b cmd /c "npx -y serve . -l 3000"

:: 3. Wait and verify
echo [3/3] Launching Browser...
timeout /t 3 >nul

:: Open BOTH the Dashboard and the Diagnoser
start http://localhost:3000/dashboard.html
start http://localhost:3000/diagnose_connection.html

echo.
echo ======================================================
echo    SUCCESS! SERVER IS RUNNING IN BACKGROUND.
echo    DO NOT CLOSE THIS BLACK WINDOW OR CLOUD WILL BREAK.
echo ======================================================
echo.
echo If the badge is STILL RED, check the "DIAGNOSER" tab
echo in your browser for the exact error message.
echo.

:: Keep window open if user wants to see logs
pause
