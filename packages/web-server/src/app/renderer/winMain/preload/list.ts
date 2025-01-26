import type { IPCSocket } from '@/preload/ws'
import { ipcPreloadEvent } from '@any-listen/app/modules/ipcPreloadEvent'
import type { ExposeFunctions } from '.'

// 暴露给后端的方法
export const createExposeList = () => {
  return {
    async listAction(socket, action) {
      ipcPreloadEvent.listAction(action)
    },
  } satisfies Partial<ExposeFunctions>
}

// 暴露给前端的方法
export const createClientList = (ipcSocket: IPCSocket) => {
  return {
    async getAllUserLists() {
      return ipcSocket.remoteQueueList.getAllUserLists()
    },
    async getListMusics(id) {
      return ipcSocket.remoteQueueList.getListMusics(id)
    },
    async getMusicExistListIds(musicId) {
      return ipcSocket.remoteQueueList.getMusicExistListIds(musicId)
    },
    async checkListExistMusic(listId, musicId) {
      return ipcSocket.remoteQueueList.checkListExistMusic(listId, musicId)
    },
    async listAction(action) {
      return ipcSocket.remoteQueueList.listAction(action)
    },
    onListAction(listener) {
      ipcPreloadEvent.on('listAction', listener)
      return () => {
        ipcPreloadEvent.off('listAction', listener)
      }
    },
    async getListScrollPosition() {
      return ipcSocket.remoteQueueList.getListScrollPosition()
    },
    async saveListScrollPosition(id, position) {
      return ipcSocket.remoteQueueList.saveListScrollPosition(id, position)
    },
  } satisfies Partial<AnyListen.IPC.ServerIPC>
}
