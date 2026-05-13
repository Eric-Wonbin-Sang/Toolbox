import React from 'react'
import {
  Paper,
  Box,
  Typography,
  Button,
  Stack,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from '@mui/material'
import UndoIcon from '@mui/icons-material/Undo'
import RedoIcon from '@mui/icons-material/Redo'
import { RenameOperation } from '../types'

interface HistoryPanelProps {
  history: RenameOperation[]
  currentIndex: number
  onUndo: () => Promise<void>
  onRedo: () => Promise<void>
  loading?: boolean
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  currentIndex,
  onUndo,
  onRedo,
  loading = false,
}) => {
  const canUndo = currentIndex >= 0
  const canRedo = currentIndex < history.length - 1

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Edit History
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={
            loading ? <CircularProgress size={20} /> : <UndoIcon />
          }
          disabled={!canUndo || loading}
          onClick={onUndo}
          fullWidth
        >
          Undo
        </Button>
        <Button
          variant="outlined"
          startIcon={
            loading ? <CircularProgress size={20} /> : <RedoIcon />
          }
          disabled={!canRedo || loading}
          onClick={onRedo}
          fullWidth
        >
          Redo
        </Button>
      </Stack>
      <Divider sx={{ mb: 2 }} />
      {history.length === 0 ? (
        <Typography color="textSecondary" align="center">
          No edit history yet
        </Typography>
      ) : (
        <List sx={{ maxHeight: 300, overflow: 'auto' }}>
          {history.map((op, idx) => (
            <ListItem
              key={idx}
              sx={{
                backgroundColor: idx <= currentIndex ? '#f5f5f5' : 'transparent',
                opacity: idx <= currentIndex ? 1 : 0.5,
              }}
            >
              <ListItemText
                primary={`${op.oldName} → ${op.newName}`}
                secondary={formatDate(op.timestamp)}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  )
}
