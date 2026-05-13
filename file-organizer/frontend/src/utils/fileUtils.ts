import { FileInfo } from '../types'

export const getCategoryFromFilename = (filename: string): string => {
  // Extract category from filename (before first underscore or dash)
  const match = filename.match(/^([^_-]+)/)
  return match ? match[1] : 'Other'
}

export const groupFilesByCategory = (
  files: FileInfo[]
): Map<string, FileInfo[]> => {
  const grouped = new Map<string, FileInfo[]>()

  files.forEach((file) => {
    const category = getCategoryFromFilename(file.name)
    if (!grouped.has(category)) {
      grouped.set(category, [])
    }
    grouped.get(category)!.push(file)
  })

  return grouped
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

export const getFileExtension = (filename: string): string => {
  const parts = filename.split('.')
  return parts.length > 1 ? parts[parts.length - 1] : ''
}

export const generateNewFilename = (
  oldName: string,
  newIndex: number
): string => {
  const extension = getFileExtension(oldName)
  const nameWithoutExt = extension ? oldName.slice(0, -(extension.length + 1)) : oldName
  const newName = `${nameWithoutExt}_${String(newIndex).padStart(3, '0')}`
  return extension ? `${newName}.${extension}` : newName
}
