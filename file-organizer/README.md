# File Organizer Application

A modern, full-stack application for batch organizing and renaming files with undo/redo support.

## ✨ Features

### Core Functionality
- **📂 Directory Browsing** - Paste any directory path and instantly view all files
- **🗂️ File Categorization** - Files automatically grouped by prefix (first part of filename)
- **🎯 Multi-Select** - Select single or multiple files for batch operations
- **✏️ Batch Rename** - Rename multiple files at once with live preview
- **🎭 Drag-to-Reorder** - Change file order by dragging, automatically updates indices
- **↩️ Undo/Redo** - Full operation history with undo/redo support
- **💾 Persistent State** - Remembers last directory and all edit history
- **⚙️ Configurable** - Change data storage directory via settings

### Technical Highlights
- **Frontend**: Vite + React 18 + TypeScript + Material-UI
- **Backend**: FastAPI + Python with async support
- **State**: Zustand for efficient client state management
- **API**: RESTful architecture with CORS support
- **Performance**: Efficient file operations with proper error handling

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ (for frontend)
- Python 3.8+ (for backend)

### Quick Start (Windows)

```bash
# Terminal 1 - Start Backend
run-backend.bat

# Terminal 2 - Start Frontend  
run-frontend.bat
```

Open http://localhost:5173 in your browser.

### Quick Start (macOS/Linux)

```bash
# Terminal 1 - Start Backend
bash run-backend.sh

# Terminal 2 - Start Frontend
bash run-frontend.sh
```

## 📖 Usage Guide

1. **Load Directory**: Paste a directory path in the input field and click "Load"
2. **View Files**: Files appear grouped by category (prefix before `_` or `-`)
3. **Select Files**: Click checkboxes to select single or multiple files
4. **Batch Rename**: Click "Batch Rename" button to open rename dialog
5. **Edit Names**: Modify filenames in the dialog and confirm
6. **Reorder (Optional)**: Drag files to change their order/index
7. **Undo**: Use the Undo button in the History panel to revert changes

## 📁 Project Structure

```
file-organizer/
├── frontend/              # React application
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── hooks/        # React hooks
│   │   ├── api/          # API client
│   │   ├── utils/        # Utilities
│   │   └── types/        # TypeScript types
│   ├── package.json
│   └── vite.config.ts
├── backend/              # FastAPI application
│   ├── app/
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   └── models/      # Pydantic schemas
│   ├── main.py
│   └── requirements.txt
├── data/                 # App data (auto-created)
│   ├── settings.json
│   └── history.json
└── README.md
```

## 🔧 API Reference

### File Operations
- `GET /api/files?path=<dir>` - List files with metadata
- `POST /api/rename` - Batch rename files

### Settings
- `GET /api/settings` - Get app settings
- `POST /api/settings` - Update settings
- `GET /api/history` - Get operation history
- `POST /api/undo` - Undo last operation
- `POST /api/redo` - Redo operation

### System
- `GET /health` - Health check

## 🎯 Naming Convention

Files are organized using a prefix-based naming scheme:

```
Category_Index.extension
```

Examples:
- `Photo_001.jpg` → Category: "Photo", Index: 001
- `Screenshot-001.png` → Category: "Screenshot", Index: 001
- `Document_final_v2.txt` → Category: "Document", Index: (no index)

The app intelligently extracts categories and allows reordering by updating indices.

## 💾 Data Persistence

By default, app data is stored in `./data/`:
- `settings.json` - User preferences and last opened directory
- `history.json` - Complete edit history

Change the location via Settings (⚙️ icon) or `.env` file:
```bash
DATA_DIR=/path/to/storage
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 8000 already in use | Change port in `backend/main.py` |
| Port 5173 already in use | Vite will use next available port |
| CORS errors | Ensure backend is running on `localhost:8000` |
| File operations fail | Check file/folder permissions |
| Settings not saving | Verify `data/` directory is writable |

## 🛣️ Roadmap

- [ ] Full redo implementation (two-way history)
- [ ] File preview thumbnails
- [ ] Advanced filtering/search
- [ ] Batch operations (move, copy, delete)
- [ ] Export operations to log file
- [ ] Settings UI polish
- [ ] Dark mode support

## 📝 License

MIT

## 👤 Author

Created as a batch file organization utility.

---

For detailed development information, see [DEVELOPMENT.md](DEVELOPMENT.md)
