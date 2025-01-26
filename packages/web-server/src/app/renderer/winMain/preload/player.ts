import { ipcPreloadEvent } from '@any-listen/app/modules/ipcPreloadEvent'
import type { IPCSocket } from '@/preload/ws'
import type { ExposeFunctions } from '.'

// 暴露给后端的方法
export const createExposePlayer = () => {
  return {
    async playerAction(event, action) {
      ipcPreloadEvent.playerAction(action)
    },
    async playListAction(event, action) {
      ipcPreloadEvent.playListAction(action)
    },
    async playHistoryListAction(event, action) {
      ipcPreloadEvent.playHistoryListAction(action)
    },
  } satisfies Partial<ExposeFunctions>
}

// 暴露给前端的方法
export const createClientPlayer = (ipcSocket: IPCSocket) => {
  return {
    async getPlayInfo() {
      return ipcSocket.remoteQueuePlayer.getPlayInfo()
    },
    async playerEvent(event) {
      return ipcSocket.remoteQueuePlayer.playerEvent(event)
    },
    async playListAction(action) {
      return ipcSocket.remoteQueuePlayer.playListAction(action)
    },
    async playHistoryListAction(action) {
      return ipcSocket.remoteQueuePlayer.playHistoryListAction(action)
    },
    onPlayerAction(listener) {
      ipcPreloadEvent.on('playerAction', listener)
      return () => {
        ipcPreloadEvent.off('playerAction', listener)
      }
    },
    onPlayListAction(listener) {
      ipcPreloadEvent.on('playListAction', listener)
      return () => {
        ipcPreloadEvent.off('playListAction', listener)
      }
    },
    onPlayHistoryListAction(listener) {
      ipcPreloadEvent.on('playHistoryListAction', listener)
      return () => {
        ipcPreloadEvent.off('playHistoryListAction', listener)
      }
    },
  } satisfies Partial<AnyListen.IPC.ServerIPC>
}
