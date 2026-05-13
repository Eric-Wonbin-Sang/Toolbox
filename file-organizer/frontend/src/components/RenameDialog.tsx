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
  CircularProgress,
} from '@mui/material'
import { FileInfo } from '../types'

interface RenameDialogProps {
  open: boolean
  files: FileInfo[]
  onConfirm: (newNames: Map<string, string>) => Promise<void>
  onCancel: () => void
}

export const RenameDialog: React.FC<RenameDialogProps> = ({
  open,
  files,
  onConfirm,
  onCancel,
}) => {
  const [newNames, setNewNames] = useState<Map<string, string>>(
    new Map(files.map((f) => [f.path, f.name]))
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleNameChange = (filePath: string, newName: string) => {
    const updated = new Map(newNames)
    updated.set(filePath, newName)
    setNewNames(updated)
  }

  const handleConfirm = async () => {
    setLoading(true)
    setError(null)
    try {
      await onConfirm(newNames)
      onCancel()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to rename files')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Batch Rename Files</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          {files.map((file) => (
            <Box key={file.path}>
              <Typography variant="caption" color="textSecondary">
                {file.name}
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={newNames.get(file.path) || ''}
                onChange={(e) =>
                  handleNameChange(file.path, e.target.value)
                }
                disabled={loading}
              />
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : undefined}
        >
          Confirm Rename
        </Button>
      </DialogActions>
    </Dialog>
  )
}
