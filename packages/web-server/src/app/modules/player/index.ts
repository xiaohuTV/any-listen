import { initPlayer as initPlayerModule, playerEvent } from '@any-listen/app/modules/player'
import getStore from '@/app/shared/store'
import { LIST_IDS, STORE_NAMES } from '@any-listen/common/constants'
import { throttle } from '@any-listen/common/utils'
import { appEvent, appState } from '@/app/app'
import { workers } from '@/app/worker'
import { sendMusicListAction } from '@any-listen/app/modules/musicList'
import { getPlayTime, savePlayTime } from './playTimeStore'

let playInfo: AnyListen.Player.SavedPlayInfo

const initPlayInfo = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (playInfo === undefined) {
    let info = getStore(STORE_NAMES.PLAY_INFO).getAll<AnyListen.Player.SavedPlayInfo>()
    playInfo =
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      info.index == null
        ? {
            index: -1,
            time: 0,
            maxTime: 0,
            historyIndex: -1,
          }
        : info
    const time = await getPlayTime()
    if (playInfo.index > -1) playInfo.time = time
  }
}

const savePlayInfoThrottle = throttle(() => {
  getStore(STORE_NAMES.PLAY_INFO).override(playInfo)
}, 500)
const savePlayTimeThrottle = throttle(() => {
  void savePlayTime(playInfo.time)
}, 500)

const registerProgressSave = () => {
  const handler = async (progress: AnyListen.IPCPlayer.Progress) => {
    await initPlayInfo()
    playInfo.time = progress.nowPlayTime
    savePlayTimeThrottle()
  }
  playerEvent.on('progress', handler)

  return () => {
    playerEvent.off('progress', handler)
  }
}

const updateLatestPlayList = async (info: AnyListen.Player.PlayMusicInfo) => {
  if (info.listId == LIST_IDS.LAST_PLAYED) return
  const list = await workers.dbService.getListMusics(LIST_IDS.LAST_PLAYED)
  const mId = info.musicInfo.id
  const addType = appState.appSetting['list.addMusicLocationType']
  if (list.some((m) => m.id == mId)) {
    if (list[addType == 'top' ? 0 : list.length - 1].id != mId) {
      await sendMusicListAction({
        action: 'list_music_update_position',
        data: {
          listId: LIST_IDS.LAST_PLAYED,
          position: addType == 'top' ? 0 : list.length - 1,
          ids: [mId],
        },
      })
    }
  } else {
    // @ts-expect-error
    const newInfo: AnyListen.Music.MusicInfo = {
      ...info.musicInfo,
      meta: {
        ...info.musicInfo.meta,
        createTime: Date.now(),
      },
    }
    await sendMusicListAction({
      action: 'list_music_add',
      data: {
        id: LIST_IDS.LAST_PLAYED,
        addMusicLocationType: addType,
        musicInfos: [newInfo],
      },
    })
    if (list.length + 1 > 1000) {
      await sendMusicListAction({
        action: 'list_music_remove',
        data: {
          listId: LIST_IDS.LAST_PLAYED,
          ids: [list[addType == 'top' ? list.length - 1 : 0].id],
        },
      })
    }
  }
}
export const initPlayer = async () => {
  initPlayerModule(workers.dbService)
  playerEvent.on('musicChanged', async (index, historyIndex) => {
    await initPlayInfo()
    playInfo = {
      index,
      time: 0,
      maxTime: 0,
      historyIndex,
    }
    savePlayInfoThrottle()
    savePlayTimeThrottle()

    const targetMusic = await getPlayerMusic()
    if (targetMusic) {
      void updateLatestPlayList(targetMusic)
      // TODO play count
      // let mInfo = getMusicInfo(targetMusic.musicInfo)
      // workers.dbService.playCountAdd({ name: mInfo.name, singer: mInfo.singer })
      // await musicListEvent.list_update_play_count(targetMusic.listId, targetMusic.musicInfo.name, targetMusic.musicInfo.singer)
      // workers.dbService.updateMetadataPlayCount()
    }
  })
  playerEvent.on('playInfoUpdated', (info) => {
    playInfo.maxTime = info.duration
    playInfo.index = info.index
    savePlayInfoThrottle()
  })
  let unregistered: (() => void) | null = null
  if (appState.appSetting['player.isSavePlayTime']) unregistered = registerProgressSave()
  appEvent.on('updated_config', (config, setting) => {
    if (config.includes('player.isSavePlayTime')) {
      if (setting['player.isSavePlayTime']!) {
        if (unregistered) return
        unregistered = registerProgressSave()
      } else {
        if (!unregistered) return
        unregistered()
        unregistered = null
      }
    }
    if (config.includes('player.togglePlayMethod')) {
      void workers.dbService.getPlayList().then((playList) => {
        if (playList.some((m) => m.played)) {
          void playerEvent.playListAction({ action: 'unplayedAll' })
        }
      })
      void workers.dbService.queryMetadataPlayHistoryList().then((historyList) => {
        if (!historyList.length) return
        void playerEvent.playHistoryListAction({ action: 'setList', data: [] })
      })
    }
  })

  playerEvent.on('playListAction', async (action) => {
    if (action.action == 'set') {
      const historyList = await workers.dbService.queryMetadataPlayHistoryList()
      if (!historyList.length) return
      void playerEvent.playHistoryListAction({ action: 'setList', data: [] })
    } else if (action.action == 'remove') {
      const ids = action.data
      const historyList = await workers.dbService.queryMetadataPlayHistoryList()
      if (!historyList.length) return
      const idxs: number[] = []
      historyList.forEach((item, idx) => {
        if (ids.includes(item.id)) idxs.push(idx)
      })
      if (idxs.length) void playerEvent.playHistoryListAction({ action: 'removeIdx', data: idxs })
    }
  })
}

// export const updatePlayCount = (name?: string, singer?: string, count?: number) => {
//   if (name) workers.dbService.playCountAdd({ name, singer: singer! })
//   workers.dbService.updateMetadataPlayCount(count)
// }

export const getPlayInfo = async (): Promise<AnyListen.IPCPlayer.PlayInfo> => {
  await initPlayInfo()
  const [list, listId, historyList] = await Promise.all([
    workers.dbService.getPlayList(),
    workers.dbService.queryMetadataPlayListId(),
    workers.dbService.queryMetadataPlayHistoryList(),
  ])
  return {
    info: playInfo,
    list,
    listId,
    historyList,
  }
}

export const getPlayerMusic = async (): Promise<AnyListen.Player.PlayMusicInfo | null> => {
  const list = await workers.dbService.getPlayList()
  return list[playInfo.index] ?? null
}

export { playerEvent }
