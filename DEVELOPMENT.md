# File Organizer - Development Guide

## Quick Start

### Windows

1. **Start Backend** (in one terminal):
   ```bash
   run-backend.bat
   ```
   Backend will start on `http://localhost:8000`

2. **Start Frontend** (in another terminal):
   ```bash
   run-frontend.bat
   ```
   Frontend will start on `http://localhost:5173`

### macOS/Linux

1. **Start Backend**:
   ```bash
   bash run-backend.sh
   ```

2. **Start Frontend**:
   ```bash
   bash run-frontend.sh
   ```

## Project Architecture

### Frontend (`/frontend`)

**Stack**: Vite + React 18 + TypeScript + Material-UI

**Key Components**:
- `DirectoryInput` - Directory path input with validation
- `FileList` - Virtualized list with grouping by category
- `RenameDialog` - Batch rename interface
- `HistoryPanel` - Undo/redo controls
- `DragDropList` - Drag-to-reorder for index renaming
- `SettingsDialog` - App configuration

**State Management**: Zustand for client state
**API Client**: Axios with configured base URL

### Backend (`/backend`)

**Stack**: FastAPI + Pydantic + Python 3.8+

**Structure**:
- `/app/routes` - API endpoints (files, settings)
- `/app/services` - Business logic (file operations, persistence)
- `/app/models` - Data schemas

**Features**:
- File system querying and batch operations
- Settings persistence
- Edit history tracking
- CORS enabled for frontend communication

## API Endpoints

### Files

- `GET /api/files?path=<dir>` - List files in directory
- `POST /api/rename` - Batch rename files

### Settings

- `GET /api/settings` - Get app configuration
- `POST /api/settings` - Update app configuration
- `GET /api/history` - Get edit history
- `POST /api/undo` - Undo last operation
- `POST /api/redo` - Redo operation (placeholder)

### Health

- `GET /health` - API health check

## Data Persistence

App data is stored in the `data/` directory by default:
- `settings.json` - App settings (directory paths, preferences)
- `history.json` - Edit history for undo/redo

Configure the data directory in `.env` file or via Settings UI.

## File Naming Convention

Files are organized by **prefix** (category):
- `Photo_001.jpg` → Category: "Photo"
- `Screenshot-001.png` → Category: "Screenshot"

The index suffix (e.g., `_001`) can be updated by dragging files in the reorder view.

## Development Workflow

1. **Add a feature**: Create new component/route as needed
2. **Frontend**: Components in `frontend/src/components`, utilities in `frontend/src/utils`
3. **Backend**: Routes in `app/routes`, services in `app/services`
4. **Types**: Keep `frontend/src/types/index.ts` and backend schemas in sync

## Troubleshooting

**Backend won't start**: Ensure Python 3.8+ and pip are installed
**Frontend won't start**: Clear `node_modules` and `npm install` again
**CORS errors**: Check that both frontend and backend are running
**File operations fail**: Check file permissions and disk space

## Next Steps

- [ ] Implement full redo (two-way history stack)
- [ ] Add file preview thumbnails
- [ ] Implement batch operations (move, copy)
- [ ] Add search/filter functionality
- [ ] Create settings UI for data directory configuration
