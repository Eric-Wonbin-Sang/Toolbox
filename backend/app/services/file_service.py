import os
import shutil
from pathlib import Path
from typing import List, Optional
from datetime import datetime


class FileSystemService:
    """Handles all file system operations"""

    @staticmethod
    def list_files(directory: str) -> List[dict]:
        """List all files in a directory with metadata"""
        try:
            path = Path(directory)
            if not path.exists():
                raise FileNotFoundError(f"Directory not found: {directory}")
            if not path.is_dir():
                raise NotADirectoryError(f"Path is not a directory: {directory}")

            files = []
            for idx, item in enumerate(sorted(path.iterdir())):
                if item.is_file():
                    stat = item.stat()
                    files.append({
                        "name": item.name,
                        "path": str(item),
                        "category": FileSystemService._extract_category(item.name),
                        "index": idx,
                        "size": stat.st_size,
                        "modified": stat.st_mtime,
                    })
            return files
        except Exception as e:
            raise Exception(f"Error listing files: {str(e)}")

    @staticmethod
    def _extract_category(filename: str) -> str:
        """Extract category from filename (before first underscore or dash)"""
        import re
        match = re.match(r'^([^_-]+)', filename)
        return match.group(1) if match else 'Other'

    @staticmethod
    def batch_rename(operations: List[dict]) -> List[dict]:
        """Rename multiple files and return operation details"""
        results = []
        try:
            for op in operations:
                old_path = Path(op['oldPath'])
                new_path = Path(op['newPath'])

                if not old_path.exists():
                    raise FileNotFoundError(f"File not found: {old_path}")

                old_path.rename(new_path)

                results.append({
                    "oldPath": str(old_path),
                    "newPath": str(new_path),
                    "oldName": old_path.name,
                    "newName": new_path.name,
                    "timestamp": datetime.now().timestamp() * 1000,
                })
        except Exception as e:
            raise Exception(f"Error renaming files: {str(e)}")

        return results

    @staticmethod
    def rename_file(old_path: str, new_path: str) -> dict:
        """Rename a single file"""
        old = Path(old_path)
        new = Path(new_path)

        if not old.exists():
            raise FileNotFoundError(f"File not found: {old_path}")

        old.rename(new)

        return {
            "oldPath": old_path,
            "newPath": new_path,
            "oldName": old.name,
            "newName": new.name,
            "timestamp": datetime.now().timestamp() * 1000,
        }
