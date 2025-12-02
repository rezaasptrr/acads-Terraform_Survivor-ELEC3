@echo off
echo.
echo ========================================
echo   Terraform Survivor - Game Launcher
echo ========================================
echo.
echo Starting server...
echo.

start "" python .github\tools\server.py

timeout /t 2 /nobreak >nul

echo Opening game in browser...
start "" "http://localhost:8000/../../src/frontend/standalone.html"

echo.
echo ========================================
echo   Game is running!
echo ========================================
echo.
echo Press Ctrl+C in the server window to stop
echo.
pause
