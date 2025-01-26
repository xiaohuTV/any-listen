import { getDB } from '../../db'

export interface MusicInfoOtherSource {
  source_id: string
  id: string
  name: string
  singer: string
  interval: string | null
  meta: string
  time: number
  order: number
}

/**
 * 创建歌曲信息查询语句
 * @returns 查询语句
 */
export const createMusicInfoQueryStatement = () => {
  const db = getDB()
  return db.prepare<[string]>(`
    SELECT "id", "name", "singer", "interval", "source", "meta", "time"
    FROM "main"."music_info_other_source"
    WHERE source_id=?
    ORDER BY "order" ASC
  `)
}

/**
 * 创建歌曲信息插入语句
 * @returns 插入语句
 */
export const createMusicInfoInsertStatement = () => {
  const db = getDB()
  return db.prepare<[MusicInfoOtherSource]>(`
    INSERT INTO "main"."music_info_other_source" ("id", "name", "singer", "interval", "source", "meta", "source_id", "time", "order")
    VALUES (@id, @name, @singer, @interval, @source, @meta, @source_id, @time, @order)
  `)
}

/**
 * 创建歌曲信息清空语句
 * @returns 清空语句
 */
export const createMusicInfoClearStatement = () => {
  const db = getDB()
  return db.prepare<[]>(`
    DELETE FROM "main"."music_info_other_source"
  `)
}

/**
 * 创建歌曲信息删除语句
 * @returns 删除语句
 */
export const createMusicInfoDeleteStatement = () => {
  const db = getDB()
  return db.prepare<[string]>(`
    DELETE FROM "main"."music_info_other_source"
    WHERE "source_id"=?
  `)
}

/**
 * 创建数量统计语句
 * @returns 统计语句
 */
export const createCountStatement = () => {
  const db = getDB()
  return db.prepare<[]>('SELECT COUNT(*) as count FROM "main"."music_info_other_source"')
}
