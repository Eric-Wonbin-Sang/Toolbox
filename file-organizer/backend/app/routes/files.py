from fastapi import APIRouter, Query, HTTPException
from typing import List
from pathlib import Path
import os

from ..models.schemas import FileInfo, RenameOperation, BatchRenameRequest, AppSettings
from ..services.file_service import FileSystemService

router = APIRouter(prefix="/api", tags=["files"])


@router.get("/files", response_model=List[FileInfo])
async def list_files(path: str = Query(...)):
    """List all files in a directory"""
    try:
        files = FileSystemService.list_files(path)
        return files
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except NotADirectoryError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/rename", response_model=dict)
async def batch_rename(request: BatchRenameRequest):
    """Batch rename files"""
    try:
        operations = FileSystemService.batch_rename(request.operations)
        return {
            "success": True,
            "operations": operations,
        }
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
