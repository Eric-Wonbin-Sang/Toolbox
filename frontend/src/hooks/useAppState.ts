import { create } from 'zustand'
import { FileInfo, RenameOperation } from '../types'

interface AppState {
  selectedFiles: Set<string>
  history: RenameOperation[]
  historyIndex: number

  toggleFileSelection: (filePath: string) => void
  setSelectedFiles: (files: Set<string>) => void
  clearSelection: () => void
  selectRange: (filePaths: string[]) => void

  addHistoryEntry: (operation: RenameOperation) => void
  canUndo: () => boolean
  canRedo: () => boolean
}

export const useAppState = create<AppState>((set, get) => ({
  selectedFiles: new Set(),
  history: [],
  historyIndex: -1,

  toggleFileSelection: (filePath: string) => {
    set((state) => {
      const newSelected = new Set(state.selectedFiles)
      if (newSelected.has(filePath)) {
        newSelected.delete(filePath)
      } else {
        newSelected.add(filePath)
      }
      return { selectedFiles: newSelected }
    })
  },

  setSelectedFiles: (files: Set<string>) => {
    set({ selectedFiles: files })
  },

  clearSelection: () => {
    set({ selectedFiles: new Set() })
  },

  selectRange: (filePaths: string[]) => {
    set({ selectedFiles: new Set(filePaths) })
  },

  addHistoryEntry: (operation: RenameOperation) => {
    set((state) => {
      const newHistory = state.history.slice(0, state.historyIndex + 1)
      newHistory.push(operation)
      return { history: newHistory, historyIndex: newHistory.length - 1 }
    })
  },

  canUndo: () => {
    const state = get()
    return state.historyIndex >= 0
  },

  canRedo: () => {
    const state = get()
    return state.historyIndex < state.history.length - 1
  },
}))
