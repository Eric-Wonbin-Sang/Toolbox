import { useState, useCallback, useEffect } from 'react'
import { FileInfo } from '../types'
import { fileApi } from '../api/client'

export const useFiles = (dirPath: string | null) => {
  const [files, setFiles] = useState<FileInfo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadFiles = useCallback(async () => {
    if (!dirPath) return

    setLoading(true)
    setError(null)
    try {
      const data = await fileApi.listFiles(dirPath)
      setFiles(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load files')
    } finally {
      setLoading(false)
    }
  }, [dirPath])

  useEffect(() => {
    loadFiles()
  }, [loadFiles])

  return { files, loading, error, refetch: loadFiles }
}
