import {
  clearMusicUrl,
  countMusicUrl,
  deleteMusicUrl,
  inertMusicUrl,
  queryMusicUrl,
} from './dbHelper'
import type { MusicUrlInfo } from './statements'


/**
 * 获取歌曲url
 * @param id 歌曲id
 * @returns 歌曲url
 */
export const getMusicUrl = (id: string): string | null => {
  const url = queryMusicUrl(id)
  return url
}

/**
 * 保存歌曲url
 * @param urlInfos url信息
 */
export const musicUrlSave = (urlInfos: MusicUrlInfo[]) => {
  inertMusicUrl(urlInfos)
}

/**
 * 删除歌曲url
 * @param ids 歌曲id
 */
export const musicUrlRemove = (ids: string[]) => {
  deleteMusicUrl(ids)
}

/**
 * 清空歌曲url
 */
export const musicUrlClear = () => {
  clearMusicUrl()
}

/**
 * 统计歌曲url数量
 */
export const musicUrlCount = () => {
  return countMusicUrl()
}

