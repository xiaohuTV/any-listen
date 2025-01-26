import { ipcPreloadEvent } from '@any-listen/app/modules/ipcPreloadEvent'
import type { IPCSocket } from '@/preload/ws'
import type { ExposeFunctions } from '.'

// 暴露给后端的方法
export const createExposeTheme = () => {
  return {
    async themeChanged(socket, setting) {
      ipcPreloadEvent.themeChanged(setting)
    },
    async themeListChanged(socket, list) {
      ipcPreloadEvent.themeListChanged(list)
    },
  } as const satisfies Partial<ExposeFunctions>
}

// 暴露给前端的方法
export const createClientTheme = (ipcSocket: IPCSocket) => {
  return {
    async getThemeSetting() {
      return ipcSocket.remoteQueueTheme.getThemeSetting()
    },
    async getThemeList() {
      return ipcSocket.remoteQueueTheme.getThemeList()
    },
    async saveTheme(theme) {
      return ipcSocket.remoteQueueTheme.saveTheme(theme)
    },
    async removeTheme(id) {
      return ipcSocket.remoteQueueTheme.removeTheme(id)
    },
    onThemeChanged(listener) {
      ipcPreloadEvent.on('themeChanged', listener)
      return () => {
        ipcPreloadEvent.off('themeChanged', listener)
      }
    },
    onThemeListChanged(listener) {
      ipcPreloadEvent.on('themeListChanged', listener)
      return () => {
        ipcPreloadEvent.off('themeListChanged', listener)
      }
    },
  } satisfies Partial<AnyListen.IPC.ServerIPC>
}
