import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Checkbox,
  Button,
  Stack,
  Divider,
} from '@mui/material'
import { FixedSizeList as List } from 'react-window'
import { FileInfo } from '../types'
import { groupFilesByCategory, formatFileSize } from '../utils/fileUtils'

interface FileListProps {
  files: FileInfo[]
  selectedFiles: Set<string>
  onSelectionChange: (selected: Set<string>) => void
  onRenameStart: () => void
}

const FileListItem: React.FC<{
  file: FileInfo
  isSelected: boolean
  onToggle: () => void
}> = ({ file, isSelected, onToggle }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        borderBottom: '1px solid #eee',
        '&:hover': { backgroundColor: '#f5f5f5' },
        backgroundColor: isSelected ? '#e3f2fd' : 'transparent',
        cursor: 'pointer',
      }}
    >
      <Checkbox
        checked={isSelected}
        onChange={onToggle}
        onClick={(e) => e.stopPropagation()}
      />
      <Box sx={{ flex: 1, ml: 1, minWidth: 0 }}>
        <Typography variant="body2" noWrap sx={{ fontWeight: 500 }}>
          {file.name}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {formatFileSize(file.size)} • Index: {file.index}
        </Typography>
      </Box>
    </Box>
  )
}

export const FileList: React.FC<FileListProps> = ({
  files,
  selectedFiles,
  onSelectionChange,
  onRenameStart,
}) => {
  const grouped = groupFilesByCategory(files)

  const handleFileToggle = (filePath: string) => {
    const newSelected = new Set(selectedFiles)
    if (newSelected.has(filePath)) {
      newSelected.delete(filePath)
    } else {
      newSelected.add(filePath)
    }
    onSelectionChange(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedFiles.size === files.length) {
      onSelectionChange(new Set())
    } else {
      onSelectionChange(new Set(files.map((f) => f.path)))
    }
  }

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant={selectedFiles.size > 0 ? 'contained' : 'outlined'}
            onClick={handleSelectAll}
          >
            {selectedFiles.size === files.length && files.length > 0
              ? 'Deselect All'
              : 'Select All'}
          </Button>
          <Typography variant="body2" color="textSecondary">
            {selectedFiles.size} selected / {files.length} total
          </Typography>
        </Stack>
        <Button
          variant="contained"
          disabled={selectedFiles.size === 0}
          onClick={onRenameStart}
        >
          Batch Rename
        </Button>
      </Box>
      <Divider />
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {Array.from(grouped.entries()).map(([category, categoryFiles]) => (
          <Box key={category}>
            <Typography
              variant="subtitle2"
              sx={{
                p: 1,
                backgroundColor: '#f0f0f0',
                fontWeight: 'bold',
                color: '#666',
              }}
            >
              {category} ({categoryFiles.length})
            </Typography>
            {categoryFiles.map((file) => (
              <FileListItem
                key={file.path}
                file={file}
                isSelected={selectedFiles.has(file.path)}
                onToggle={() => handleFileToggle(file.path)}
              />
            ))}
          </Box>
        ))}
      </Box>
    </Paper>
  )
}
