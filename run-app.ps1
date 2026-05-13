# run-app.ps1

# Stop script on errors
$ErrorActionPreference = "Stop"

# Root project path
$ProjectRoot = "."

# Backend paths
$BackendPath = Join-Path $ProjectRoot "backend"
$VenvActivate = Join-Path $BackendPath "venv\Scripts\Activate.ps1"

# Frontend path
$FrontendPath = Join-Path $ProjectRoot "frontend"

Write-Host "Starting backend..." -ForegroundColor Cyan

# Open backend in a new PowerShell window
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "& '$VenvActivate'; cd '$BackendPath'; python main.py"
)

Start-Sleep -Seconds 2

Write-Host "Starting frontend..." -ForegroundColor Green

# Open frontend in a new PowerShell window
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "cd '$FrontendPath'; npm run dev"
)

Write-Host "Backend and frontend launched."