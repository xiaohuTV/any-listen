import { getDB } from '../../db'

// TODO: 完善歌词读存

export interface Lyricnfo {
  id: string
  name: string
  singer: string
  interval: string
  lyric: string
  type: 'raw' | 'edited'
}

const RAW_LYRIC: Lyricnfo['type'] = 'raw'
const EDITED_LYRIC: Lyricnfo['type'] = 'edited'

/**
 * 创建歌词查询语句
 * @returns 查询语句
 */
export const createLyricQueryStatement = () => {
  const db = getDB()
  return db.prepare<[string]>(`
    SELECT "name", "singer", "interval", "lyric"
    FROM "main"."lyric"
    WHERE "id"=?
    `)
}

/**
 * 创建原始歌词查询语句
 * @returns 查询语句
 */
export const createRawLyricQueryStatement = () => {
  const db = getDB()
  return db.prepare<[string]>(`
    SELECT "name", "singer", "interval", "lyric"
    FROM "main"."lyric"
    WHERE "id"=? AND "type"='${RAW_LYRIC}'
    `)
}

/**
 * 创建原始歌词插入语句
 * @returns 插入语句
 */
export const createRawLyricInsertStatement = () => {
  const db = getDB()
  return db.prepare<[Lyricnfo]>(`
    INSERT INTO "main"."lyric" ("id", "name", "singer", "interval", "lyric", "type")
    VALUES (@id, @name, @singer, @interval, @lyric, '${RAW_LYRIC}')`)
}

/**
 * 创建原始歌词清空语句
 * @returns 清空语句
 */
export const createRawLyricClearStatement = () => {
  const db = getDB()
  return db.prepare<[]>(`
    DELETE FROM "main"."lyric"
    WHERE "type"='${RAW_LYRIC}'
  `)
}

/**
 * 创建原始歌词删除语句
 * @returns 删除语句
 */
export const createRawLyricDeleteStatement = () => {
  const db = getDB()
  return db.prepare<[string]>(`
    DELETE FROM "main"."lyric"
    WHERE "id"=? AND "type"='${RAW_LYRIC}'
  `)
}

/**
 * 创建原始歌词更新语句
 * @returns 更新语句
 */
export const createRawLyricUpdateStatement = () => {
  const db = getDB()
  return db.prepare<[Lyricnfo]>(`
    UPDATE "main"."lyric"
    SET "lyric"=@lyric
    WHERE "id"=@id AND "type"='${RAW_LYRIC}' AND "type"=@type`)
}


/**
 * 创建原始歌词数量统计语句
 * @returns 统计语句
 */
export const createRawLyricCountStatement = () => {
  const db = getDB()
  return db.prepare<[]>(`SELECT COUNT(*) as count FROM "main"."lyric" WHERE "type"='${RAW_LYRIC}'`)
}


/**
 * 创建已编辑歌词查询语句
 * @returns 查询语句
 */
export const createEditedLyricQueryStatement = () => {
  const db = getDB()
  return db.prepare<[string]>(`
    SELECT "type", "text"
    FROM "main"."lyric"
    WHERE "id"=? AND "type"='${EDITED_LYRIC}'
    `)
}

/**
 * 创建已编辑歌词插入语句
 * @returns 插入语句
 */
export const createEditedLyricInsertStatement = () => {
  const db = getDB()
  return db.prepare<[Lyricnfo]>(`
    INSERT INTO "main"."lyric" ("id", "name", "singer", "interval", "lyric", "type")
    VALUES (@id, @type, @text, '${EDITED_LYRIC}')`)
}

/**
 * 创建已编辑歌词清空语句
 * @returns 清空语句
 */
export const createEditedLyricClearStatement = () => {
  const db = getDB()
  return db.prepare<[]>(`
    DELETE FROM "main"."lyric"
    WHERE "type"='${EDITED_LYRIC}'
  `)
}

/**
 * 创建已编辑歌词删除语句
 * @returns 删除语句
 */
export const createEditedLyricDeleteStatement = () => {
  const db = getDB()
  return db.prepare<[string]>(`
    DELETE FROM "main"."lyric"
    WHERE "id"=? AND "type"='${EDITED_LYRIC}'
  `)
}

/**
 * 创建已编辑歌词更新语句
 * @returns 更新语句
 */
export const createEditedLyricUpdateStatement = () => {
  const db = getDB()
  return db.prepare<[Lyricnfo]>(`
    UPDATE "main"."lyric"
    SET "text"=@text
    WHERE "id"=@id AND "type"='${EDITED_LYRIC}' AND "type"=@type`)
}

/**
 * 创建已编辑歌词数量统计语句
 * @returns 统计语句
 */
export const createEditedLyricCountStatement = () => {
  const db = getDB()
  return db.prepare<[]>(`SELECT COUNT(*) as count FROM "main"."lyric" WHERE "type"='${EDITED_LYRIC}'`)
}
