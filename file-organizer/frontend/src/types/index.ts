export interface FileInfo {
  name: string
  path: string
  category: string
  index: number
  size: number
  modified: number
}

export interface RenameOperation {
  oldPath: string
  newPath: string
  oldName: string
  newName: string
  timestamp: number
}

export interface AppSettings {
  dataDir: string
  lastOpenedDir: string | null
}
