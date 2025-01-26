/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type { ExposeClientFunctions, ExposeServerFunctions } from '.'
import {
  checkListExistMusic,
  getAllUserLists,
  getListMusics,
  getListScrollInfo,
  getMusicExistListIds,
  onMusicListAction,
  saveListScrollPosition,
  sendMusicListAction,
} from '@any-listen/app/modules/musicList'
import { broadcast } from '@/modules/ipc/websocket'

// 暴露给前端的方法
export const createExposeList = () => {
  return {
    async getAllUserLists(event) {
      return getAllUserLists()
    },
    async getListMusics(event, listId) {
      return getListMusics(listId)
    },
    async getMusicExistListIds(event, musicId) {
      return getMusicExistListIds(musicId)
    },
    async checkListExistMusic(event, listId, musicId) {
      return checkListExistMusic(listId, musicId)
    },
    async listAction(event, action) {
      return sendMusicListAction(action)
    },
    async getListScrollPosition(event) {
      return getListScrollInfo()
    },
    async saveListScrollPosition(event, id, position) {
      return saveListScrollPosition(id, position)
    },
  } satisfies Partial<ExposeClientFunctions>
}

// 暴露给后端的方法
export const createServerList = () => {
  const actions = {
    async listAction(action) {
      broadcast((socket) => {
        if (socket.winType != 'main' || !socket.isInited) return
        void socket.remoteQueueList.listAction(action)
      })
    },
  } satisfies Partial<ExposeServerFunctions>

  // eslint-disable-next-line @typescript-eslint/unbound-method
  onMusicListAction(actions.listAction)

  return actions
}
