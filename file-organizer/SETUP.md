# Setup Instructions

## First-Time Setup

### 1. Prerequisites

**Windows**:
- Download Python 3.8+ from https://www.python.org/downloads/
- Download Node.js 16+ from https://nodejs.org/
- During Python installation, **check "Add Python to PATH"**

**macOS**:
```bash
brew install python node
```

**Linux**:
```bash
sudo apt-get install python3 python3-pip nodejs npm
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Verify installation:
```bash
python -c "import fastapi; print(f'FastAPI {fastapi.__version__} installed')"
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Verify installation
npm -v
node -v
```

### 4. Running the Application

**Option A: Individual Terminals (Recommended)**

Terminal 1 - Backend:
```bash
cd backend
venv\Scripts\activate  # or: source venv/bin/activate
python main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v4.x.x  ready in XXX ms
➜  Local:   http://localhost:5173/
```

**Option B: Batch Scripts (Windows)**

```bash
# Terminal 1
run-backend.bat

# Terminal 2
run-frontend.bat
```

### 5. Verify Installation

1. Open http://localhost:5173 in your browser
2. Check that the app loads
3. Go to Settings (⚙️) to verify backend connection
4. Try loading a directory with test files

## Troubleshooting

### Backend won't start

**Error**: `ModuleNotFoundError: No module named 'fastapi'`
```bash
# Activate venv and reinstall
venv\Scripts\activate
pip install -r requirements.txt
```

**Error**: `Address already in use :8000`
- Another app is using port 8000
- Edit `backend/main.py` line ~XX and change port to 8001
- Or: Kill the process using that port

**Error**: `Permission denied` on venv script
```bash
python -m venv venv  # Recreate venv
venv\Scripts\activate
```

### Frontend won't start

**Error**: `Port 5173 already in use`
- Vite will automatically try the next port (5174, 5175, etc.)
- Check console output for actual port

**Error**: `Cannot find module 'react'`
```bash
rm -rf node_modules package-lock.json  # or: del /S node_modules
npm install
```

### CORS errors in browser console

**Cause**: Backend not running
- Ensure `python main.py` is running in a terminal
- Check that it shows `Running on http://0.0.0.0:8000`

### File operations fail

**Cause**: Permission issues
- Ensure you have read/write permissions on the directory
- Try with a test directory first: `C:\Users\{YourUser}\Documents\test`

### Settings not saving

**Cause**: data/ directory not writable
- Check that `file-organizer/data/` folder has write permissions
- On Linux/Mac: `chmod 755 data/`

## Development Workflow

### Making Changes

**Frontend**: Changes auto-reload in browser
**Backend**: Changes auto-reload (if using `python main.py`)

### Stopping the Application

- Frontend: Press `Ctrl+C` in terminal
- Backend: Press `Ctrl+C` in terminal

### Clearing Data

To reset all app data:
```bash
rm -rf data/  # or: rmdir /s data (Windows)
```

This will clear settings and history on next startup.

## Next Steps

- Read [README.md](README.md) for feature overview
- Check [DEVELOPMENT.md](DEVELOPMENT.md) for architecture details
- Load a directory with test files and try the features

---

**Need help?** Check the [README.md](README.md#troubleshooting) troubleshooting section.
