@echo off
REM Frontend setup and run for Windows

echo Setting up frontend...
cd frontend
call npm install
call npm run dev
pause
