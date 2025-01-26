import type { IPCSocket } from '@/preload/ws'
import { ipcPreloadEvent } from '@any-listen/app/modules/ipcPreloadEvent'
import type { ExposeFunctions } from '.'

// 暴露给后端的方法
export const createExposeDislike = () => {
  return {
    async dislikeAction(socket: IPCSocket, action: AnyListen.IPCDislikeList.ActionList) {
      ipcPreloadEvent.dislikeAction(action)
    },
  } satisfies Partial<ExposeFunctions>
}

// 暴露给前端的方法
export const createClientDislike = (ipcSocket: IPCSocket) => {
  return {
    async getDislikeInfo() {
      return ipcSocket.remoteQueueDislike.getDislikeInfo()
    },
    async dislikeAction(action) {
      return ipcSocket.remoteQueueDislike.dislikeAction(action)
    },
    onDislikeAction(listener) {
      ipcPreloadEvent.on('dislikeAction', listener)
      return () => {
        ipcPreloadEvent.off('dislikeAction', listener)
      }
    },
  } satisfies Partial<AnyListen.IPC.ServerIPC>
}
