from typing import Optional
from pydantic import BaseModel


class FileInfo(BaseModel):
    name: str
    path: str
    category: str
    index: int
    size: int
    modified: float


class RenameOperation(BaseModel):
    oldPath: str
    newPath: str
    oldName: str
    newName: str
    timestamp: float


class BatchRenameRequest(BaseModel):
    operations: list[dict]


class AppSettings(BaseModel):
    dataDir: str
    lastOpenedDir: Optional[str] = None
