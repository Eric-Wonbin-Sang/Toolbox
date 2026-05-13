import { useState, useEffect } from 'react'
import { Box, Container, Grid, AppBar, Toolbar, Typography, IconButton, Tooltip } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import RefreshIcon from '@mui/icons-material/Refresh'
import { DirectoryInput } from './components/DirectoryInput'
import { FileList } from './components/FileList'
import { RenameDialog } from './components/RenameDialog'
import { HistoryPanel } from './components/HistoryPanel'
import { SettingsDialog } from './components/SettingsDialog'
import { useFiles } from './hooks/useFiles'
import { useAppState } from './hooks/useAppState'
import { fileApi } from './api/client'
import { AppSettings } from './types'

function App() {
  const [dirPath, setDirPath] = useState<string | null>(null)
  const [renameDialogOpen, setRenameDialogOpen] = useState(false)
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [appSettings, setAppSettings] = useState<AppSettings | null>(null)

  const { files, loading, error, refetch } = useFiles(dirPath)
  const {
    selectedFiles,
    history,
    historyIndex,
    setSelectedFiles,
    clearSelection,
    addHistoryEntry,
  } = useAppState()

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await fileApi.getSettings()
        setAppSettings(data)
        if (data.lastOpenedDir) {
          setDirPath(data.lastOpenedDir)
        }
      } catch (err) {
        console.error('Failed to load settings:', err)
      }
    }
    loadSettings()
  }, [])

  const selectedFilesList = files.filter((f) => selectedFiles.has(f.path))

  const handleRename = async (newNames: Map<string, string>) => {
    const operations = Array.from(newNames.entries()).map(([oldPath, newName]) => {
      const file = files.find((f) => f.path === oldPath)!
      const newPath = oldPath.replace(file.name, newName)
      return { oldPath, newPath }
    })

    try {
      const data = await fileApi.batchRename(operations)
      data.operations.forEach((op) => {
        addHistoryEntry(op)
      })
      clearSelection()
      refetch()
      
      // Save last opened directory
      if (appSettings) {
        await fileApi.updateSettings({
          ...appSettings,
          lastOpenedDir: dirPath,
        })
      }
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : 'Failed to rename files'
      )
    }
  }

  const handleUndo = async () => {
    setHistoryLoading(true)
    try {
      await fileApi.undo()
      refetch()
    } finally {
      setHistoryLoading(false)
    }
  }

  const handleRedo = async () => {
    setHistoryLoading(true)
    try {
      await fileApi.redo()
      refetch()
    } finally {
      setHistoryLoading(false)
    }
  }

  const handleDirectoryChange = async (path: string) => {
    setDirPath(path)
    if (appSettings) {
      try {
        await fileApi.updateSettings({
          ...appSettings,
          lastOpenedDir: path,
        })
      } catch (err) {
        console.error('Failed to save last opened directory:', err)
      }
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            📁 File Organizer
          </Typography>
          <Tooltip title="Refresh">
            <IconButton color="inherit" onClick={() => refetch()} disabled={loading}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton color="inherit" onClick={() => setSettingsDialogOpen(true)}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <DirectoryInput
          onDirectoryChange={handleDirectoryChange}
          loading={loading}
          error={error}
        />

        {dirPath && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <FileList
                files={files}
                selectedFiles={selectedFiles}
                onSelectionChange={setSelectedFiles}
                onRenameStart={() => setRenameDialogOpen(true)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <HistoryPanel
                history={history}
                currentIndex={historyIndex}
                onUndo={handleUndo}
                onRedo={handleRedo}
                loading={historyLoading}
              />
            </Grid>
          </Grid>
        )}
      </Container>

      <RenameDialog
        open={renameDialogOpen}
        files={selectedFilesList}
        onConfirm={handleRename}
        onCancel={() => setRenameDialogOpen(false)}
      />

      <SettingsDialog
        open={settingsDialogOpen}
        onClose={() => setSettingsDialogOpen(false)}
        settings={appSettings}
      />
    </Box>
  )
}

export default App
