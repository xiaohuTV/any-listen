// if (targetSong.key) { // 如果是已下载的歌曲
//   const filePath = path.join(appSetting['download.savePath'], targetSong.metadata.fileName)
//   // console.log(filePath)

// import {
//   getMusicUrl as getOnlineMusicUrl,
//   getPicUrl as getOnlinePicUrl,
//   getLyricInfo as getOnlineLyricInfo,
// } from '@any-listen/app/modules/music/online'
// import {
//   getMusicUrl as getDownloadMusicUrl,
//   getPicUrl as getDownloadPicUrl,
//   getLyricInfo as getDownloadLyricInfo,
// } from './download'
// import {
//   getMusicUrl as getLocalMusicUrl,
//   getPicUrl as getLocalPicUrl,
//   getLyricInfo as getLocalLyricInfo,
// } from '@any-listen/app/modules/music/local'
import { existTimeExp, getLocalFilePath } from '@any-listen/app/modules/music/utils'
import { workers } from '@any-listen/app/modules/worker'
import { appState } from '@/app/app'
import { checkAllowPath, createMediaPublicPath, createPicFilePublicPath, createPicPublicPath } from '@/app/modules/fileSystem'

export const getMusicUrl = async ({
  musicInfo,
  quality,
  isRefresh = false,
}: {
  musicInfo: AnyListen.Music.MusicInfo
  isRefresh?: boolean
  quality?: string
}): Promise<AnyListen.IPCMusic.MusicUrlInfo> => {
  if (musicInfo.isLocal) {
    if (!isRefresh) {
      const filePath = await getLocalFilePath(musicInfo)
      if (filePath) {
        if (import.meta.env.DEV) {
          const url = await createMediaPublicPath(filePath)
          if (url) {
            return {
              url,
              toggleSource: false,
              quality: '128k',
              isFromCache: false,
            }
          }
        } else {
          if (checkAllowPath(filePath)) {
            const url = await createMediaPublicPath(filePath)
            if (url) {
              return {
                url,
                toggleSource: false,
                quality: '128k',
                isFromCache: false,
              }
            }
          }
        }
      }
    }
    // return getLocalMusicUrl({ musicInfo, isRefresh })
  } else {
    // return getOnlineMusicUrl({ musicInfo, isRefresh, quality })
  }
  throw new Error('failed')
  // if ('progress' in musicInfo) {
  //   return getDownloadMusicUrl({ musicInfo, isRefresh })
  // } else if (musicInfo.source == 'local') {
  //   return getLocalMusicUrl({ musicInfo, isRefresh })
  // } else {
  //   return getOnlineMusicUrl({ musicInfo, isRefresh, quality })
  // }
}

const httpRxp = /^https?:/
export const getMusicPic = async ({
  musicInfo,
  isRefresh = false,
  listId,
}: {
  musicInfo: AnyListen.Music.MusicInfo
  listId?: string | null
  isRefresh?: boolean
}): Promise<AnyListen.IPCMusic.MusicPicInfo> => {
  if (musicInfo.isLocal) {
    if (!isRefresh) {
      const pic = await workers.utilService.getMusicFilePic(musicInfo.meta.filePath)
      if (pic) {
        if (typeof pic == 'string') {
          if (httpRxp.test(pic)) {
            return {
              url: pic,
              isFromCache: true,
              toggleSource: false,
            }
          }
          let url = await createPicPublicPath(musicInfo.meta.filePath, pic)
          if (url) {
            return {
              url,
              isFromCache: false,
              toggleSource: false,
            }
          }
        } else {
          let url = await createPicFilePublicPath(musicInfo.meta.filePath, pic.format, pic.data)
          if (url) {
            return {
              url,
              isFromCache: false,
              toggleSource: false,
            }
          }
        }
      }

      if (musicInfo.meta.picUrl) {
        return {
          url: musicInfo.meta.picUrl,
          isFromCache: true,
          toggleSource: false,
        }
      }
    }
    // return getLocalPicUrl({ musicInfo, isRefresh, listId })
  } else {
    // return getOnlinePicUrl({ musicInfo, isRefresh, listId })
  }
  throw new Error('failed')

  // if ('progress' in musicInfo) {
  //   return getDownloadPicUrl({ musicInfo, isRefresh, listId })
  // } else if (musicInfo.source == 'local') {
  //   return getLocalPicUrl({ musicInfo, isRefresh, listId })
  // } else {
  //   return getOnlinePicUrl({ musicInfo, isRefresh, listId })
  // }
}

const getCachedLyricInfo = async (musicInfo: AnyListen.Music.MusicInfo): Promise<AnyListen.Music.LyricInfo | null> => {
  let lrcInfo = await workers.dbService.getRawLyric(musicInfo.id)
  // lrcInfo = {} as unknown as AnyListen.Player.LyricInfo
  if (existTimeExp.test(lrcInfo.lyric) && lrcInfo.tlyric != null) {
    return lrcInfo
  }
  return null
}

const buildLyricInfo = async (lyricInfo: AnyListen.Music.LyricInfo): Promise<AnyListen.Music.LyricInfo> => {
  if (appState.appSetting['player.isS2t']) {
    const tasks = [
      lyricInfo.lyric ? workers.utilService.langS2T(lyricInfo.lyric) : Promise.resolve(''),
      lyricInfo.tlyric ? workers.utilService.langS2T(lyricInfo.tlyric) : Promise.resolve(''),
      lyricInfo.rlyric ? workers.utilService.langS2T(lyricInfo.rlyric) : Promise.resolve(''),
      lyricInfo.awlyric ? workers.utilService.langS2T(lyricInfo.awlyric) : Promise.resolve(''),
    ]
    return Promise.all(tasks).then(([lyric, tlyric, rlyric, awlyric]) => {
      return {
        ...lyricInfo,
        lyric,
        tlyric,
        rlyric,
        awlyric,
      }
    })
  }
  return lyricInfo
}
export const getLyricInfo = async ({
  musicInfo,
  isRefresh = false,
}: {
  musicInfo: AnyListen.Music.MusicInfo
  isRefresh?: boolean
}): Promise<AnyListen.Music.LyricInfo> => {
  if (musicInfo.isLocal) {
    if (!isRefresh) {
      const [lyricInfo, fileLyricInfo] = await Promise.all([
        getCachedLyricInfo(musicInfo),
        workers.utilService.getMusicFileLyric(musicInfo.meta.filePath),
      ])
      if (lyricInfo?.lyric && lyricInfo.rawlrcInfo) {
        // 存在已编辑歌词
        return buildLyricInfo({ ...lyricInfo, rawlrcInfo: fileLyricInfo ?? lyricInfo.rawlrcInfo })
      }

      if (fileLyricInfo) return buildLyricInfo(fileLyricInfo)
      if (lyricInfo?.lyric) return buildLyricInfo(lyricInfo)
    }
    // return getLocalLyricInfo({ musicInfo, isRefresh })
  } else {
    // return getOnlineLyricInfo({ musicInfo, isRefresh })
  }
  throw new Error('failed')
  // if ('progress' in musicInfo) {
  //   return getDownloadLyricInfo({ musicInfo, isRefresh })
  // } else if (musicInfo.source == 'local') {
  //   return getLocalLyricInfo({ musicInfo, isRefresh })
  // } else {
  //   return getOnlineLyricInfo({ musicInfo, isRefresh })
  // }
}
