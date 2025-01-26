import {
  clearPlayCount,
  countPlayCount,
  insertPlayCount,
  queryPlayCount,
  updatePlayCount,
  updatePlayTime,
} from './dbHelper'
import type {
  PlayCount,
  PlayCountKey,
  PlayTime,
} from './statements'


/**
 * 获取播放统计
 * @param id 歌曲id
 * @returns 播放统计
 */
export const getPlayCount = (info: PlayCountKey) => {
  return queryPlayCount(info) ?? { count: 0, time: 0 }
}

/**
 * 保存播放次数统计
 * @param info url信息
 */
export const playCountAdd = (info: PlayCountKey) => {
  let count = queryPlayCount(info)
  if (!count) insertPlayCount([{ ...info, count: 1, time: 0 }])
  else updatePlayCount({ ...info, count: count.count + 1 })
}

/**
 * 保存播放次数统计
 * @param info url信息
 */
export const playCountOverwrite = (info: PlayCount) => {
  let count = queryPlayCount(info)
  if (!count) insertPlayCount([{ ...info, time: 0 }])
  else updatePlayCount(info)
}

/**
 * 保存播放时长统计
 * @param info url信息
 */
export const playTimeAdd = (info: PlayTime) => {
  let count = queryPlayCount(info)
  if (!count) insertPlayCount([{ ...info, count: 1 }])
  else updatePlayTime({ ...info, time: count.time + info.time })
}

/**
 * 保存播放时长统计
 * @param info url信息
 */
export const playTimeOverwrite = (info: PlayTime) => {
  let count = queryPlayCount(info)
  if (!count) insertPlayCount([{ ...info, count: 1 }])
  else updatePlayTime(info)
}


/**
 * 清空播放统计
 */
export const playCountClear = () => {
  clearPlayCount()
}

/**
 * 统计播放统计数量
 */
export const playCountCount = () => {
  return countPlayCount()
}

