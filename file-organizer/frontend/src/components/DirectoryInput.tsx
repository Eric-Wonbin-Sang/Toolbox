import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'

interface DirectoryInputProps {
  onDirectoryChange: (path: string) => void
  loading?: boolean
  error?: string | null
}

export const DirectoryInput: React.FC<DirectoryInputProps> = ({
  onDirectoryChange,
  loading = false,
  error = null,
}) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onDirectoryChange(inputValue.trim())
    }
  }

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}
      >
        <TextField
          label="Directory Path"
          placeholder="e.g., C:\Users\Pictures"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={loading}
          fullWidth
          size="small"
          error={!!error}
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={
            loading ? <CircularProgress size={20} /> : <FolderOpenIcon />
          }
          disabled={loading || !inputValue.trim()}
          sx={{ mt: 1 }}
        >
          Load
        </Button>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
    </Paper>
  )
}
