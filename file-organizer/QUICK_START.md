# Quick Start Guide

## ✓ Setup Complete

Your File Organizer application has been fully configured and is ready to run!

### What Was Installed

**Backend (Python)**
- Python 3.13 virtual environment (`.venv/`)
- FastAPI 0.104.1
- Uvicorn 0.24.0
- Pydantic (latest)
- python-dotenv 1.0.0

**Frontend (Node.js)**
- React 18.2.0
- Vite 4.4.0
- Material-UI 5.14.0
- TypeScript 5.0
- All dependencies (276 packages)

## 🚀 Running the Application

### Method 1: Using Batch Files (Easiest)

**Terminal 1 - Backend:**
```bash
run-backend.bat
```

**Terminal 2 - Frontend:**
```bash
run-frontend.bat
```

### Method 2: Manual Commands

**Terminal 1 - Backend:**
```bash
cd backend
.venv\Scripts\activate
python main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v4.x.x  ready in XXX ms
➜  Local:   http://localhost:5173/
```

## 📱 Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## ✨ What You Can Do

1. **Paste a directory path** - Enter any folder path containing files
2. **View files organized by category** - Files are auto-grouped by prefix
3. **Select files** - Use checkboxes to select single or multiple files
4. **Batch rename** - Edit multiple filenames at once
5. **Reorder by dragging** - Change file order and update indices
6. **Undo operations** - Full history with undo/redo support

## 📁 Project Structure

```
file-organizer/
├── backend/              # Python FastAPI server
│   ├── .venv/           # Virtual environment (CREATED)
│   ├── app/
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # File operations & persistence
│   │   └── models/      # Data schemas
│   ├── main.py
│   └── requirements.txt
├── frontend/            # React + Vite app
│   ├── node_modules/   # npm packages (CREATED)
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── api/        # API client
│   │   └── utils/      # Utilities
│   └── package.json
├── data/               # App data (auto-created)
│   ├── settings.json   # User preferences
│   └── history.json    # Edit history
└── QUICK_START.md
```

## 🛠️ Troubleshooting

### Backend won't start

**"Module not found" error:**
```bash
cd backend
.venv\Scripts\pip install -r requirements.txt
```

**Port 8000 already in use:**
- Edit `backend/main.py` and change the port number
- Or kill the process using port 8000

### Frontend won't start

**Port 5173 already in use:**
- Vite will automatically use the next available port (5174, 5175, etc.)
- Check console output for the actual URL

**npm command not found:**
- Ensure Node.js is installed: `node --version`
- Install Node.js from https://nodejs.org/

### File operations fail

- Ensure you have read/write permissions on the directory
- Try with a test folder first, like `C:\Users\{YourUser}\Documents\test`

### Settings not saving

- Check that the `data/` folder exists and is writable
- Delete `data/` to reset to defaults

## 📚 Documentation

- [README.md](README.md) - Full feature overview
- [DEVELOPMENT.md](DEVELOPMENT.md) - Architecture & development guide
- [SETUP.md](SETUP.md) - Detailed setup instructions

## 🎯 Next Steps

1. Start both services using the Quick Start commands above
2. Open http://localhost:5173 in your browser
3. Try loading a directory with test files
4. Experiment with the features (select, rename, reorder, undo)

## ✅ Verification Checklist

- [x] Python 3.13 virtual environment created
- [x] Python packages installed (FastAPI, Uvicorn, Pydantic, etc.)
- [x] npm packages installed (React, Vite, Material-UI, etc.)
- [x] TypeScript issues fixed (arrow operators, API types)
- [x] Project structure complete
- [x] Ready to run!

Enjoy your File Organizer app!
