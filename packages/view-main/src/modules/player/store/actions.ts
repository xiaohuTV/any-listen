import { createPlayMusicInfoList } from '@any-listen/common/tools'
import * as commit from './commit'
import { playerEvent } from './event'
import { addPlayListMusic } from './listRemoteAction'
import { playerState } from './state'

export const initPlayList = (list: AnyListen.Player.PlayMusicInfo[]) => {
  commit.setPlayListMusic(list)
}

export {
  setPlayListId,
  setMaxPlayTime,
  setNowPlayTime,
  setStatusText,
  setPlayerPlaying,
  updatePlayIndex,
  updatePlayHistoryIndex,
  setIsLinkedList,
  setDislikeIds,
  setPlayHistoryList as initPlayHistoryList,
  setVolume as setStateVolume,
  setVolumeMute as setStateVolumeMute,
  setPlaybackRate as setStatePlaybackRate,
} from './commit'

export {
  setPlayListMusic,
  addPlayListMusic,
  removePlayListMusic,
  updatePlayListMusic,
  updatePlayListMusicPos,
  setPlayListMusicPlayed,
  setPlayListMusicUnplayed,
  setPlayListMusicUnplayedAll,
  registerRemoteListAction,
} from './listRemoteAction'

export {
  getPlayInfo,
  registerLocalPlayerAction,
  registerRemotePlayerAction,
  registerRemoteHistoryListAction,
  getMusicPicDelay,
} from './playerRemoteAction'

export {
  skipNext,
  skipPrev,
  setPlayMusicInfo,
  collectMusic,
  uncollectMusic,
  dislikeMusic,
  pause,
  play,
  stop,
  playIndex,
  playId,
  playList,
  togglePlay,
  setMusicUrl,
  seekTo,
  setLyricOffset,
  setPlaybackRate,
  setVolume,
  setVolumeMute,
  release,
} from './playerActions'

export const addPlayLaterMusic = async (musicInfos: AnyListen.Music.MusicInfo[], listId: string, isOnline = false) => {
  const list = createPlayMusicInfoList(musicInfos, listId, isOnline, true)
  await addPlayListMusic({ musics: list, pos: playerState.playList.findIndex((m) => m.playLater) + 1 })
}

export const sendCreatedEvent = () => {
  playerEvent.created()
}
