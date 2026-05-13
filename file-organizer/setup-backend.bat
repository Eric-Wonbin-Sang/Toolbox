@echo off
REM File Organizer Setup Script - Backend
echo.
echo =====================================
echo File Organizer Backend Setup
echo =====================================
echo.

cd /d "%~dp0backend"
echo Setting up Python virtual environment...

REM Try Python 3.13 full path first
set "PYTHON_3_13=%userprofile%\AppData\Local\Programs\Python\Python313\python.exe"

if exist "%PYTHON_3_13%" (
    echo Found Python 3.13 at %PYTHON_3_13%
    "%PYTHON_3_13%" -m venv .venv
) else (
    echo Python 3.13 not found at expected location, trying default python...
    python -m venv .venv
)

if %errorlevel% neq 0 (
    echo Error creating virtual environment!
    pause
    exit /b 1
)

echo Virtual environment created.
echo Installing Python packages...

call .venv\Scripts\activate.bat
pip install --upgrade pip
pip install -r requirements.txt

if %errorlevel% neq 0 (
    echo Error installing packages!
    pause
    exit /b 1
)

echo.
echo Backend setup complete!
echo.
pause
