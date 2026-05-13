import os
import json
from pathlib import Path
from typing import Optional
from datetime import datetime


class SettingsManager:
    """Manages application settings persistence"""

    def __init__(self, data_dir: Path):
        self.data_dir = Path(data_dir)
        self.settings_file = self.data_dir / "settings.json"
        self._ensure_dir()
        self._load_or_create_settings()

    def _ensure_dir(self):
        self.data_dir.mkdir(parents=True, exist_ok=True)

    def _load_or_create_settings(self):
        if self.settings_file.exists():
            with open(self.settings_file, 'r') as f:
                self.settings = json.load(f)
        else:
            self.settings = {
                "dataDir": str(self.data_dir),
                "lastOpenedDir": None,
            }
            self.save()

    def save(self):
        with open(self.settings_file, 'w') as f:
            json.dump(self.settings, f, indent=2)

    def get(self, key: str, default=None):
        return self.settings.get(key, default)

    def set(self, key: str, value):
        self.settings[key] = value
        self.save()

    def update(self, updates: dict):
        self.settings.update(updates)
        self.save()

    def to_dict(self):
        return self.settings.copy()


class HistoryManager:
    """Manages file operation history for undo/redo"""

    def __init__(self, data_dir: Path):
        self.data_dir = Path(data_dir)
        self.history_file = self.data_dir / "history.json"
        self._ensure_dir()
        self._load_history()

    def _ensure_dir(self):
        self.data_dir.mkdir(parents=True, exist_ok=True)

    def _load_history(self):
        if self.history_file.exists():
            with open(self.history_file, 'r') as f:
                self.history = json.load(f)
        else:
            self.history = []

    def save(self):
        with open(self.history_file, 'w') as f:
            json.dump(self.history, f, indent=2)

    def add_operation(self, operation: dict):
        self.history.append(operation)
        self.save()

    def get_history(self):
        return self.history.copy()

    def undo(self):
        """Return last operation for undo"""
        if self.history:
            return self.history.pop()

    def clear(self):
        self.history = []
        self.save()
