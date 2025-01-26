import { getDB } from '../../db'

export interface ListMusicInfo {
  item_id: string
  position: number
  played: number
  play_later: number
  id: string
  list_id: string
  is_online: number
  name: string
  singer: string
  interval: string | null
  is_local: number
  meta: string
}

export interface MusicInfo {
  id: string
  list_id: string
  name: string
  singer: string
  interval: string | null
  is_local: number
  meta: string
}


export interface PlayedInfo {
  item_id: string
  played: number
}

export interface PositionInfo {
  item_id: string
  position: number
}

/**
 * 查询语句
 * @returns 查询语句
 */
export const createQueryStatement = () => {
  const db = getDB()
  return db.prepare<[]>(`
    SELECT "item_id", "position", "played", "play_later", "id", "list_id", "name", "singer", "interval", "is_local", "meta"
    FROM "main"."play_list_music_info"
    ORDER BY position ASC
    `)
}

/**
 * 插入语句
 * @returns 插入语句
 */
export const createInsertStatement = () => {
  const db = getDB()
  return db.prepare<[ListMusicInfo]>(`
    INSERT INTO "main"."play_list_music_info" ("item_id", "position", "played", "play_later", "id", "list_id", "name", "singer", "is_local", "interval", "meta")
    VALUES (@item_id, @position, @played, @play_later, @id, @list_id, @name, @singer, @is_local, @interval, @meta)`)
}

/**
 * 清空语句
 * @returns 清空语句
 */
export const createClearStatement = () => {
  const db = getDB()
  return db.prepare<[]>(`
    DELETE FROM "main"."play_list_music_info"
  `)
}

/**
 * 删除语句
 * @returns 删除语句
 */
export const createDeleteStatement = () => {
  const db = getDB()
  return db.prepare<[string]>(`
    DELETE FROM "main"."play_list_music_info"
    WHERE "item_id"=?
  `)
}

/**
 * 更新语句
 * @returns 更新语句
 */
export const createUpdateStatement = () => {
  const db = getDB()
  return db.prepare<[MusicInfo]>(`
    UPDATE "main"."play_list_music_info"
    SET "name"=@name, "singer"=@singer, "is_local"=@is_local, "interval"=@interval, "meta"=@meta
    WHERE "id"=@id AND "list_id"=@list_id`)
}

/**
 * 更新语句
 * @returns 更新语句
 */
export const createUpdatePlayedStatement = () => {
  const db = getDB()
  return db.prepare<[PlayedInfo]>(`
    UPDATE "main"."play_list_music_info"
    SET "played"=@played
    WHERE "item_id"=@item_id`)
}

/**
 * 更新位置语句
 * @returns 更新位置语句
 */
export const createUpdatePositionStatement = () => {
  const db = getDB()
  return db.prepare<[PositionInfo]>(`
    UPDATE "main"."play_list_music_info"
    SET "position"=@position
    WHERE "item_id"=@item_id`)
}

