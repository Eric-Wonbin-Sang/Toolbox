from fastapi import APIRouter, HTTPException
from pathlib import Path

from ..models.schemas import AppSettings, RenameOperation
from ..services.persistence import SettingsManager, HistoryManager

router = APIRouter(prefix="/api", tags=["settings"])

# Will be initialized in main.py
settings_manager: SettingsManager = None
history_manager: HistoryManager = None


def init_managers(data_dir: Path):
    global settings_manager, history_manager
    settings_manager = SettingsManager(data_dir)
    history_manager = HistoryManager(data_dir)


@router.get("/settings", response_model=AppSettings)
async def get_settings():
    """Get application settings"""
    try:
        settings = settings_manager.to_dict()
        return AppSettings(**settings)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/settings", response_model=AppSettings)
async def update_settings(settings: AppSettings):
    """Update application settings"""
    try:
        settings_manager.update(settings.dict())
        return AppSettings(**settings_manager.to_dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/history", response_model=list[RenameOperation])
async def get_history():
    """Get file operation history"""
    try:
        history = history_manager.get_history()
        return history
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/undo", response_model=dict)
async def undo_operation():
    """Undo last file operation"""
    try:
        operation = history_manager.undo()
        if not operation:
            raise HTTPException(status_code=400, detail="Nothing to undo")

        return {
            "success": True,
            "operation": operation,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/redo", response_model=dict)
async def redo_operation():
    """Redo last undone operation"""
    # Note: Full redo implementation would require a more sophisticated history system
    return {
        "success": False,
        "operation": None,
        "message": "Redo not yet implemented",
    }
