import { throttle } from '@any-listen/common/utils'
import type { DBSeriveTypes } from '../worker/utils'
import { initMusicListEvent, musicListEvent } from './event'
import { LIST_IDS } from '@any-listen/common/constants'

let dbService: DBSeriveTypes
let scrollInfo: Map<string, number>
let getScrollInfo: () => Promise<AnyListen.List.ListPositionInfo>
let saveScrollInfo: (scrollInfo: AnyListen.List.ListPositionInfo) => Promise<void>

export const initMusicList = (
  _dbService: DBSeriveTypes,
  _getScrollInfo: typeof getScrollInfo,
  _saveScrollInfo: typeof saveScrollInfo
) => {
  dbService = _dbService
  initMusicListEvent(_dbService)
  getScrollInfo = _getScrollInfo
  saveScrollInfo = _saveScrollInfo
}

export const getAllUserLists = async () => {
  return dbService.getAllUserLists()
}

export const getListMusics = async (listId: string) => {
  return dbService.getListMusics(listId)
}

export const getMusicExistListIds = async (musicId: string) => {
  return dbService.getMusicExistListIds(musicId)
}

export const checkListExistMusic = async (listId: string, musicId: string) => {
  return dbService.checkListExistMusic(listId, musicId)
}

const initScrollInfo = async () => {
  // eslint-disable-next-line require-atomic-updates, @typescript-eslint/no-unnecessary-condition
  scrollInfo ??= new Map(Object.entries(await getScrollInfo()))
}
const saveListScrollInfoThrottle = throttle(() => {
  void saveScrollInfo(Object.fromEntries(scrollInfo))
}, 500)
export const getListScrollInfo = async () => {
  await initScrollInfo()
  return Object.fromEntries(scrollInfo)
}
export const saveListScrollPosition = async (id: string, position: number) => {
  await initScrollInfo()
  scrollInfo.set(id, position)
  saveListScrollInfoThrottle()
}
const removeListScrollInfo = async (ids: string[]) => {
  await initScrollInfo()
  for (const id of ids) scrollInfo.delete(id)
  saveListScrollInfoThrottle()
}
const overrideListScrollInfo = async (ids: string[]) => {
  await initScrollInfo()
  for (const id of scrollInfo.keys()) {
    if (ids.includes(id)) continue
    scrollInfo.delete(id)
  }
  saveListScrollInfoThrottle()
}

export const sendMusicListAction = async (action: AnyListen.IPCList.ActionList) => {
  await musicListEvent.listAction(action)
  switch (action.action) {
    case 'list_data_overwrite':
      void overrideListScrollInfo([LIST_IDS.DEFAULT, LIST_IDS.LOVE, ...action.data.userList.map((l) => l.id)])
      break
    case 'list_remove':
      void removeListScrollInfo(action.data)
      break
    default:
  }
}

export const onMusicListAction = (listAction: (action: AnyListen.IPCList.ActionList) => Promise<void>): (() => void) => {
  musicListEvent.on('listAction', listAction)
  return () => {
    musicListEvent.off('listAction', listAction)
  }
}

export { musicListEvent }
