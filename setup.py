#!/usr/bin/env python3
"""
Setup script for File Organizer project
Creates virtual environments and installs dependencies
"""

import os
import sys
import subprocess
from pathlib import Path

def run_command(cmd, cwd=None, shell=False):
    """Run a command and return success status"""
    try:
        print(f"Running: {' '.join(cmd) if isinstance(cmd, list) else cmd}")
        result = subprocess.run(
            cmd,
            cwd=cwd,
            shell=shell,
            capture_output=False,
            text=True
        )
        if result.returncode != 0:
            return False
        return True
    except Exception as e:
        print(f"Exception running command: {e}")
        return False

def setup_backend():
    """Setup Python backend"""
    print("\n" + "="*50)
    print("Setting up Python Backend")
    print("="*50 + "\n")
    
    backend_dir = Path(__file__).parent / "backend"
    venv_dir = backend_dir / ".venv"
    
    # Create venv
    if not venv_dir.exists():
        print("Creating virtual environment...")
        if not run_command([sys.executable, "-m", "venv", str(venv_dir)]):
            print("Failed to create virtual environment!")
            return False
        print("✓ Virtual environment created\n")
    else:
        print("✓ Virtual environment already exists\n")
    
    # Determine pip executable
    pip_exe = venv_dir / ("Scripts" if sys.platform == "win32" else "bin") / ("pip.exe" if sys.platform == "win32" else "pip")
    
    if not pip_exe.exists():
        print(f"Error: pip not found at {pip_exe}")
        return False
    
    # Install requirements
    print("Installing Python packages...")
    requirements_file = backend_dir / "requirements.txt"
    if not run_command([str(pip_exe), "install", "--upgrade", "pip"]):
        print("Failed to upgrade pip!")
        return False
    
    if not run_command([str(pip_exe), "install", "-r", str(requirements_file)]):
        print("Failed to install requirements!")
        return False
    
    print("✓ Python packages installed\n")
    return True

def setup_frontend():
    """Setup Node.js frontend"""
    print("\n" + "="*50)
    print("Setting up Node.js Frontend")
    print("="*50 + "\n")
    
    frontend_dir = Path(__file__).parent / "frontend"
    node_modules_dir = frontend_dir / "node_modules"
    
    if node_modules_dir.exists():
        print("✓ node_modules already exists\n")
        return True
    
    print("Installing npm packages...")
    if not run_command(["npm", "install"], cwd=frontend_dir, shell=False):
        print("Failed to install npm packages!")
        return False
    
    print("✓ npm packages installed\n")
    return True

def main():
    """Main setup function"""
    print("\n" + "="*50)
    print("File Organizer Setup")
    print("="*50)
    
    project_root = Path(__file__).parent
    os.chdir(project_root)
    
    # Setup backend
    if not setup_backend():
        print("\n❌ Backend setup failed!")
        return 1
    
    # Setup frontend
    if not setup_frontend():
        print("\n❌ Frontend setup failed!")
        return 1
    
    print("\n" + "="*50)
    print("✓ Setup Complete!")
    print("="*50)
    print("\nTo start the application:")
    print("  Backend:  cd backend && .venv\\Scripts\\activate && python main.py")
    print("  Frontend: cd frontend && npm run dev")
    print("\nOr use the provided batch files:")
    print("  Backend:  .\\run-backend.bat")
    print("  Frontend: .\\run-frontend.bat")
    print("\nAccess the app at: http://localhost:5173\n")
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
