import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Alert,
} from '@mui/material'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import { AppSettings } from '../types'
import { fileApi } from '../api/client'

interface SettingsDialogProps {
  open: boolean
  onClose: () => void
  settings: AppSettings | null
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onClose,
  settings,
}) => {
  const [dataDir, setDataDir] = useState(settings?.dataDir || '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    try {
      await fileApi.updateSettings({
        dataDir,
        lastOpenedDir: settings?.lastOpenedDir,
      })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography variant="label" sx={{ mb: 1, display: 'block' }}>
              Data Directory
            </Typography>
            <Typography variant="caption" color="textSecondary" sx={{ mb: 1, display: 'block' }}>
              Where app settings and edit history are stored
            </Typography>
            <TextField
              fullWidth
              value={dataDir}
              onChange={(e) => setDataDir(e.target.value)}
              disabled={saving}
              placeholder="./data"
              size="small"
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={saving}>
          Save Settings
        </Button>
      </DialogActions>
    </Dialog>
  )
}
