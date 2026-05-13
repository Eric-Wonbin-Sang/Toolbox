# File Organizer Setup Script for Windows
# This script sets up the Python backend and Node.js frontend

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "File Organizer Setup Script" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

$projectRoot = Split-Path -Parent $PSCommandPath
$backendDir = Join-Path $projectRoot "backend"
$frontendDir = Join-Path $projectRoot "frontend"

# Backend Setup
Write-Host "`n[1/4] Setting up Python Backend..." -ForegroundColor Yellow

# Find Python 3.13
$pythonPath = $null
$pythonVersions = @("python_3.13", "python3.13", "python")

foreach ($pythonCmd in $pythonVersions) {
    try {
        $version = & $pythonCmd --version 2>&1
        if ($version -match "3\.13") {
            $pythonPath = $pythonCmd
            Write-Host "Found Python: $version" -ForegroundColor Green
            break
        } elseif ($pythonCmd -eq "python") {
            $pythonPath = $pythonCmd
            Write-Host "Using default Python: $version" -ForegroundColor Green
            break
        }
    } catch {
        # Continue to next option
    }
}

if (-not $pythonPath) {
    Write-Host "Error: Python 3.13 not found!" -ForegroundColor Red
    Write-Host "Please install Python 3.13 and add it to PATH" -ForegroundColor Red
    exit 1
}

# Create virtual environment
Write-Host "Creating virtual environment..." -ForegroundColor Cyan
Push-Location $backendDir

if (Test-Path ".venv") {
    Write-Host "Virtual environment already exists, skipping creation." -ForegroundColor Green
} else {
    & $pythonPath -m venv .venv
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to create virtual environment!" -ForegroundColor Red
        Pop-Location
        exit 1
    }
    Write-Host "Virtual environment created successfully" -ForegroundColor Green
}

# Install Python dependencies
Write-Host "`nInstalling Python dependencies..." -ForegroundColor Cyan
$venvPython = Join-Path $backendDir ".venv" "Scripts" "python.exe"
& $venvPython -m pip install -q --upgrade pip
& $venvPython -m pip install -q -r requirements.txt

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install Python dependencies!" -ForegroundColor Red
    Pop-Location
    exit 1
}

Write-Host "Python dependencies installed successfully" -ForegroundColor Green
Pop-Location

# Frontend Setup
Write-Host "`n[2/4] Setting up Node.js Frontend..." -ForegroundColor Yellow
Push-Location $frontendDir

# Check if node_modules exists
if (Test-Path "node_modules") {
    Write-Host "Node modules already exist, skipping npm install." -ForegroundColor Green
} else {
    Write-Host "Installing npm packages..." -ForegroundColor Cyan
    npm install --silent
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install npm packages!" -ForegroundColor Red
        Pop-Location
        exit 1
    }
    Write-Host "npm packages installed successfully" -ForegroundColor Green
}

Pop-Location

# Verify installations
Write-Host "`n[3/4] Verifying installations..." -ForegroundColor Yellow

# Verify Python packages
$fastapi = & $venvPython -c "import fastapi; print(fastapi.__version__)" 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ FastAPI $fastapi" -ForegroundColor Green
} else {
    Write-Host "✗ FastAPI not installed" -ForegroundColor Red
}

$uvicorn = & $venvPython -c "import uvicorn; print(uvicorn.__version__)" 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Uvicorn $uvicorn" -ForegroundColor Green
} else {
    Write-Host "✗ Uvicorn not installed" -ForegroundColor Red
}

# Verify npm packages
Push-Location $frontendDir
$reactVersion = & npm list react --depth=0 2>&1 | Select-String "react@" | ForEach-Object { $_ -replace ".*@", "@" }
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ React $reactVersion" -ForegroundColor Green
} else {
    Write-Host "✗ React not installed" -ForegroundColor Red
}

$viteVersion = & npm list vite --depth=0 2>&1 | Select-String "vite@" | ForEach-Object { $_ -replace ".*@", "@" }
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Vite $viteVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Vite not installed" -ForegroundColor Red
}

Pop-Location

# Summary
Write-Host "`n=====================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan

Write-Host "`nTo start the application:" -ForegroundColor Yellow
Write-Host "  Terminal 1 (Backend):  cd backend && .\.venv\Scripts\activate && python main.py" -ForegroundColor White
Write-Host "  Terminal 2 (Frontend): cd frontend && npm run dev" -ForegroundColor White

Write-Host "`nOr use the provided batch files:" -ForegroundColor Yellow
Write-Host "  Terminal 1: .\run-backend.bat" -ForegroundColor White
Write-Host "  Terminal 2: .\run-frontend.bat" -ForegroundColor White

Write-Host "`nAccess the app at: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
