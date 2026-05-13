@echo off
REM File Organizer Setup Script - Frontend
echo.
echo =====================================
echo File Organizer Frontend Setup
echo =====================================
echo.

cd /d "%~dp0frontend"

if exist "node_modules" (
    echo node_modules already exists, skipping npm install
    goto end
)

echo Installing npm packages...
call npm install

if %errorlevel% neq 0 (
    echo Error installing npm packages!
    pause
    exit /b 1
)

:end
echo.
echo Frontend setup complete!
echo.
pause
