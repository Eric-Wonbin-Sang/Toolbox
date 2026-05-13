@echo off
REM Backend setup and run for Windows

echo Setting up backend...
cd backend

REM Create virtual environment if it doesn't exist
if not exist "venv" (
  python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies
pip install -r requirements.txt

REM Run the server
python main.py
pause
