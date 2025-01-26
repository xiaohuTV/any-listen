import { checkPath } from '@any-listen/nodejs'

export const existTimeExp = /\[\d{1,2}:.*\d{1,4}\]/

export const getLocalFilePath = async (musicInfo: AnyListen.Music.MusicInfoLocal) => {
  return (await checkPath(musicInfo.meta.filePath)) ? musicInfo.meta.filePath : null
}
