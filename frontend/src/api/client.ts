import axios from 'axios'
import { FileInfo, RenameOperation, AppSettings } from '../types'

const API_BASE = '/api'

const client = axios.create({
  baseURL: API_BASE,
})

export const fileApi = {
  listFiles: async (dirPath: string) =>
    (await client.get<FileInfo[]>('/files', { params: { path: dirPath } })).data,

  batchRename: async (operations: Array<{ oldPath: string; newPath: string }>) =>
    (await client.post<{ success: boolean; operations: RenameOperation[] }>(
      '/rename',
      { operations }
    )).data,

  getSettings: async () => (await client.get<AppSettings>('/settings')).data,

  updateSettings: async (settings: Partial<AppSettings>) =>
    (await client.post<AppSettings>('/settings', settings)).data,

  getHistory: async () =>
    (await client.get<RenameOperation[]>('/history')).data,

  undo: async () =>
    (await client.post<{ success: boolean; operation: RenameOperation }>('/undo')).data,

  redo: async () =>
    (await client.post<{ success: boolean; operation: RenameOperation }>('/redo')).data,
}

export default client
