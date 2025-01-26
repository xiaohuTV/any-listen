import { createUnsubscriptionSet } from '@/shared'
import { onRelease } from '@/modules/app/shared'
import { settingEvent } from '@/modules/setting/store/event'
import { getPlayInfo } from './store/playerRemoteAction'
import { initPlayer as initPlayerModules } from './init/index'
import {
  initPlayHistoryList,
  initPlayList,
  registerLocalPlayerAction,
  registerRemoteHistoryListAction,
  registerRemoteListAction,
  registerRemotePlayerAction,
  sendCreatedEvent,
  setPlayListId,
  setPlayMusicInfo,
  release,
} from './store/actions'
import { appState } from '@/modules/app/store/state'
import { playerEvent } from './store/event'
import { playerState } from './store/state'

const init = async (isInited: boolean) => {
  initPlayerModules()
  sendCreatedEvent()
  const [{ info, list, listId, historyList }] = await Promise.all([getPlayInfo(), appState.workerInitPromiseMain])
  console.log(info, list, listId, historyList)
  initPlayList(list)
  setPlayListId(listId)
  initPlayHistoryList(historyList)
  const targetMusicInfo = list[info.index] as AnyListen.Player.PlayMusicInfo | undefined
  if (targetMusicInfo && (!isInited || !playerState.playing)) {
    setPlayMusicInfo(targetMusicInfo, null, info.historyIndex)
    playerEvent.setProgress(info.time, info.maxTime)
  }
}

let unregistereds = createUnsubscriptionSet()
export const initPlayer = () => {
  let isInit = false
  onRelease(() => {
    isInit &&= false
    unregistereds.clear()
    void release()
  })
  settingEvent.on('inited', () => {
    unregistereds.register((subscriptions) => {
      subscriptions.add(registerRemotePlayerAction())
      subscriptions.add(registerLocalPlayerAction())
      subscriptions.add(registerRemoteHistoryListAction())
      subscriptions.add(registerRemoteListAction())
    })
    void init(isInit)
    isInit ||= true
  })
}
