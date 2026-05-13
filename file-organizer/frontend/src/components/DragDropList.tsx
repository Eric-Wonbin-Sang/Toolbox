import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Alert,
} from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { FileInfo } from '../types'

interface DragDropListProps {
  files: FileInfo[]
  onReorder: (reorderedFiles: FileInfo[]) => void
  onConfirmReorder: () => Promise<void>
  loading?: boolean
}

export const DragDropList: React.FC<DragDropListProps> = ({
  files,
  onReorder,
  onConfirmReorder,
  loading = false,
}) => {
  const [draggedItem, setDraggedItem] = useState<number | null>(null)
  const [draggedOverItem, setDraggedOverItem] = useState<number | null>(null)
  const [reorderedFiles, setReorderedFiles] = useState<FileInfo[]>(files)

  const handleDragStart = (index: number) => {
    setDraggedItem(index)
  }

  const handleDragOver = (index: number) => {
    setDraggedOverItem(index)
  }

  const handleDrop = (dropIndex: number) => {
    if (draggedItem === null) return

    const newFiles = [...reorderedFiles]
    const draggedFile = newFiles[draggedItem]
    newFiles.splice(draggedItem, 1)
    newFiles.splice(dropIndex, 0, draggedFile)

    // Update indices
    const updated = newFiles.map((file, idx) => ({
      ...file,
      index: idx,
    }))

    setReorderedFiles(updated)
    onReorder(updated)
    setDraggedItem(null)
    setDraggedOverItem(null)
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Drag to Reorder
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        Drag files to reorder. Index will be updated in filenames.
      </Alert>
      <List sx={{ maxHeight: 400, overflow: 'auto' }}>
        {reorderedFiles.map((file, index) => (
          <ListItem
            key={file.path}
            onDragStart={() => handleDragStart(index)}
            onDragOver={() => handleDragOver(index)}
            onDrop={() => handleDrop(index)}
            draggable
            sx={{
              backgroundColor:
                draggedItem === index ? '#e3f2fd' : 'transparent',
              borderTop:
                draggedOverItem === index ? '2px solid #1976d2' : 'none',
              cursor: 'move',
              opacity: draggedItem === index ? 0.5 : 1,
            }}
          >
            <DragIndicatorIcon
              sx={{
                mr: 1,
                color: draggedItem === index ? '#1976d2' : '#ccc',
              }}
            />
            <ListItemText
              primary={`${index + 1}. ${file.name}`}
              secondary={file.category}
            />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Button
        variant="contained"
        fullWidth
        onClick={onConfirmReorder}
        disabled={loading}
      >
        Confirm Reorder & Rename
      </Button>
    </Paper>
  )
}
