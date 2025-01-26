import { getDB } from '../../db'
import {
  createAllUserListQueryStatement,
  createDefaultListQueryStatement,
  // createListQueryStatement,
  // createSubListQueryStatement,
  createListClearAllStatement,
  createListClearNullStatement,
  createListClearStatement,
  createListDeleteStatement,
  createListInsertStatement,
  createListUpdateStatement,
  createMusicInfoByListAndMusicInfoIdQueryStatement,
  createMusicInfoByMusicInfoIdQueryStatement,
  createMusicInfoClearStatement,
  createMusicInfoDeleteByListIdStatement,
  createMusicInfoDeleteStatement,
  createMusicInfoInsertStatement,
  createMusicInfoOrderClearStatement,
  createMusicInfoOrderDeleteByListIdStatement,
  createMusicInfoOrderDeleteStatement,
  createMusicInfoOrderInsertStatement,
  createMusicInfoQueryStatement,
  createMusicInfoUpdateStatement,
} from './statements'
import type { MusicInfo, MusicInfoOrder, UserListInfo } from './statements'

/**
 * 获取所有默认用户列表信息
 * @returns
 */
export const queryDefaultList = () => {
  const list = createDefaultListQueryStatement().all() as UserListInfo[]
  return list
}

/**
 * 获取所有用户列表信息
 * @returns
 */
export const queryAllUserList = () => {
  const list = createAllUserListQueryStatement().all() as UserListInfo[]
  return list
}

/**
 * 获取单个用户列表信息
 * @returns
 */
// export const queryUserListInfo = (parent_id: UserListInfo['id']) => {
//   const list = createListQueryStatement().get(parent_id) as UserListInfo
//   return list
// }

/**
 * 获取用户列表
 * @returns
 */
// export const querySubUserList = (parent_id: UserListInfo['parent_id']) => {
//   const list = createSubListQueryStatement().all(parent_id) as UserListInfo[]
//   return list
// }

/**
 * 批量插入用户列表
 * @param lists 列表
 * @param isClear 是否清空列表
 */
export const inertUserLists = (parent_id: UserListInfo['parent_id'], lists: UserListInfo[], isClear = false) => {
  const db = getDB()
  const listClearStatement: unknown = (parent_id == null ? createListClearNullStatement : createListClearStatement)()
  const listInsertStatement = createListInsertStatement()
  db.transaction((parent_id: UserListInfo['parent_id'], lists: UserListInfo[]) => {
    if (isClear) {
      if (parent_id == null) {
        ;(listClearStatement as ReturnType<typeof createListClearNullStatement>).run()
      } else {
        ;(listClearStatement as ReturnType<typeof createListClearStatement>).run(parent_id)
      }
    }
    for (const list of lists) {
      listInsertStatement.run({
        id: list.id,
        parent_id: list.parent_id,
        name: list.name,
        type: list.type,
        meta: list.meta,
        position: list.position,
      })
    }
  })(parent_id, lists)
}

/**
 * 批量删除用户列表及列表内歌曲
 * @param list_ids 列表id
 */
export const deleteUserLists = (list_ids: string[]) => {
  const db = getDB()
  const listDeleteStatement = createListDeleteStatement()
  const musicInfoDeleteByListIdStatement = createMusicInfoDeleteByListIdStatement()
  const musicInfoOrderDeleteByListIdStatement = createMusicInfoOrderDeleteByListIdStatement()
  db.transaction((list_ids: string[]) => {
    for (const id of list_ids) {
      listDeleteStatement.run(id)
      musicInfoDeleteByListIdStatement.run(id)
      musicInfoOrderDeleteByListIdStatement.run(id)
    }
  })(list_ids)
}

/**
 * 批量更新用户列表
 * @param lists 列表
 */
export const updateUserLists = (lists: UserListInfo[]) => {
  const db = getDB()
  const listUpdateStatement = createListUpdateStatement()
  db.transaction((lists: UserListInfo[]) => {
    for (const list of lists) listUpdateStatement.run(list)
  })(lists)
}

/**
 * 批量添加歌曲
 * @param list
 */
export const insertMusicInfoList = (list: MusicInfo[]) => {
  const musicInfoInsertStatement = createMusicInfoInsertStatement()
  const musicInfoOrderInsertStatement = createMusicInfoOrderInsertStatement()
  const db = getDB()
  db.transaction((musics: MusicInfo[]) => {
    for (const music of musics) {
      musicInfoInsertStatement.run(music)
      musicInfoOrderInsertStatement.run({
        list_id: music.list_id,
        music_id: music.id,
        order: music.order,
      })
    }
  })(list)
}

/**
 * 批量添加歌曲并刷新排序
 * @param list 新增歌曲
 * @param list_id 列表Id
 * @param listAll 原始列表歌曲，列表去重后
 */
export const insertMusicInfoListAndRefreshOrder = (list: MusicInfo[], list_id: string, listAll: MusicInfo[]) => {
  const musicInfoInsertStatement = createMusicInfoInsertStatement()
  const musicInfoOrderInsertStatement = createMusicInfoOrderInsertStatement()
  const musicInfoOrderDeleteByListIdStatement = createMusicInfoOrderDeleteByListIdStatement()

  const db = getDB()
  db.transaction((list: MusicInfo[], list_id: string, listAll: MusicInfo[]) => {
    musicInfoOrderDeleteByListIdStatement.run(list_id)
    for (const music of list) {
      musicInfoInsertStatement.run(music)
      musicInfoOrderInsertStatement.run({
        list_id: music.list_id,
        music_id: music.id,
        order: music.order,
      })
    }
    for (const music of listAll) {
      musicInfoOrderInsertStatement.run({
        list_id: music.list_id,
        music_id: music.id,
        order: music.order,
      })
    }
  })(list, list_id, listAll)
}

/**
 * 批量更新歌曲
 * @param list
 */
export const updateMusicInfos = (list: MusicInfo[]) => {
  const musicInfoUpdateStatement = createMusicInfoUpdateStatement()
  const db = getDB()
  db.transaction((musics: MusicInfo[]) => {
    for (const music of musics) {
      musicInfoUpdateStatement.run(music)
    }
  })(list)
}

/**
 * 获取列表内的歌曲
 * @param list_id 列表Id
 * @returns 列表歌曲
 */
export const queryMusicInfoByListId = (list_id: string) => {
  const musicInfoQueryStatement = createMusicInfoQueryStatement()
  return musicInfoQueryStatement.all({ list_id }) as MusicInfo[]
}

/**
 * 批量移动歌曲
 * @param fromId 源列表Id
 * @param ids 要移动的歌曲
 * @param musicInfos 音乐信息
 */
export const moveMusicInfo = (fromId: string, ids: string[], musicInfos: MusicInfo[]) => {
  const musicInfoInsertStatement = createMusicInfoInsertStatement()
  const musicInfoOrderInsertStatement = createMusicInfoOrderInsertStatement()
  const musicInfoDeleteStatement = createMusicInfoDeleteStatement()
  const musicInfoOrderDeleteStatement = createMusicInfoOrderDeleteStatement()
  // const musicInfoOrderDeleteByListIdStatement = createMusicInfoOrderDeleteByListIdStatement()

  const db = getDB()
  db.transaction((fromId: string, ids: string[], musicInfos: MusicInfo[]) => {
    // musicInfoOrderDeleteByListIdStatement.run(fromId)
    for (const id of ids) {
      musicInfoDeleteStatement.run({ list_id: fromId, id })
      musicInfoOrderDeleteStatement.run({ list_id: fromId, id })
    }
    for (const music of musicInfos) {
      musicInfoInsertStatement.run(music)
      musicInfoOrderInsertStatement.run({
        list_id: music.list_id,
        music_id: music.id,
        order: music.order,
      })
    }
  })(fromId, ids, musicInfos)
}

/**
 * 批量移动歌曲并刷新排序
 * @param fromId 源列表Id
 * @param ids 要移动的歌曲id，原始选择的歌曲
 * @param musicInfos 要移动的歌曲，目标列表去重后
 * @param toListAll 目标列表歌曲
 */
export const moveMusicInfoAndRefreshOrder = (
  fromId: string,
  ids: string[],
  toId: string,
  musicInfos: MusicInfo[],
  toListAll: MusicInfo[]
) => {
  const musicInfoInsertStatement = createMusicInfoInsertStatement()
  const musicInfoDeleteStatement = createMusicInfoDeleteStatement()
  const musicInfoOrderDeleteStatement = createMusicInfoOrderDeleteStatement()
  const musicInfoOrderInsertStatement = createMusicInfoOrderInsertStatement()
  const musicInfoOrderDeleteByListIdStatement = createMusicInfoOrderDeleteByListIdStatement()

  const db = getDB()
  db.transaction((fromId: string, ids: string[], musicInfos: MusicInfo[], toListAll: MusicInfo[]) => {
    for (const id of ids) {
      musicInfoDeleteStatement.run({ list_id: fromId, id })
      musicInfoOrderDeleteStatement.run({ list_id: fromId, id })
    }
    musicInfoOrderDeleteByListIdStatement.run(toId)
    for (const music of musicInfos) {
      musicInfoInsertStatement.run(music)
      musicInfoOrderInsertStatement.run({
        list_id: music.list_id,
        music_id: music.id,
        order: music.order,
      })
    }
    for (const music of toListAll) {
      musicInfoOrderInsertStatement.run({
        list_id: music.list_id,
        music_id: music.id,
        order: music.order,
      })
    }
  })(fromId, ids, musicInfos, toListAll)
}

/**
 * 批量移除列表内音乐
 * @param list_id 列表id
 * @param ids 音乐id
 */
export const removeMusicInfos = (list_id: string, ids: string[]) => {
  const musicInfoDeleteStatement = createMusicInfoDeleteStatement()
  const musicInfoOrderDeleteStatement = createMusicInfoOrderDeleteStatement()
  const db = getDB()
  db.transaction((list_id: string, ids: string[]) => {
    for (const id of ids) {
      musicInfoDeleteStatement.run({ list_id, id })
      musicInfoOrderDeleteStatement.run({ list_id, id })
    }
  })(list_id, ids)
}

/**
 * 清空列表内歌曲
 * @param list_id 列表id
 */
export const removeMusicInfoByListId = (ids: string[]) => {
  const db = getDB()
  const musicInfoDeleteByListIdStatement = createMusicInfoDeleteByListIdStatement()
  const musicInfoOrderDeleteByListIdStatement = createMusicInfoOrderDeleteByListIdStatement()
  db.transaction((ids: string[]) => {
    for (const id of ids) {
      musicInfoDeleteByListIdStatement.run(id)
      musicInfoOrderDeleteByListIdStatement.run(id)
    }
  })(ids)
}

/**
 * 创建根据列表Id与音乐id查询音乐信息
 * @param list_id 列表id
 * @param music_id 音乐id
 * @returns
 */
export const queryMusicInfoByListIdAndMusicInfoId = (list_id: string, music_id: string) => {
  const musicInfoByListAndMusicInfoIdQueryStatement = createMusicInfoByListAndMusicInfoIdQueryStatement()
  return musicInfoByListAndMusicInfoIdQueryStatement.get({ list_id, music_id }) as MusicInfo | null
}

/**
 * 创建根据音乐id查询所有列表的音乐信息
 * @param id 音乐id
 * @returns
 */
export const queryMusicInfoByMusicInfoId = (id: string) => {
  const musicInfoByMusicInfoIdQueryStatement = createMusicInfoByMusicInfoIdQueryStatement()
  return musicInfoByMusicInfoIdQueryStatement.all(id) as MusicInfo[]
}

/**
 * 批量更新歌曲位置
 * @param list_id 列表id
 * @param musicInfoOrders 音乐顺序
 */
export const updateMusicInfoOrder = (list_id: string, musicInfoOrders: MusicInfoOrder[]) => {
  const db = getDB()
  const musicInfoOrderInsertStatement = createMusicInfoOrderInsertStatement()
  const musicInfoOrderDeleteByListIdStatement = createMusicInfoOrderDeleteByListIdStatement()
  db.transaction((list_id: string, musicInfoOrders: MusicInfoOrder[]) => {
    musicInfoOrderDeleteByListIdStatement.run(list_id)
    for (const orderInfo of musicInfoOrders) musicInfoOrderInsertStatement.run(orderInfo)
  })(list_id, musicInfoOrders)
}

/**
 * 覆盖列表内的歌曲
 * @param list_id 列表id
 * @param musicInfos 歌曲列表
 */
export const overwriteMusicInfo = (list_id: string, musicInfos: MusicInfo[]) => {
  const db = getDB()
  const musicInfoDeleteByListIdStatement = createMusicInfoDeleteByListIdStatement()
  const musicInfoOrderDeleteByListIdStatement = createMusicInfoOrderDeleteByListIdStatement()
  const musicInfoInsertStatement = createMusicInfoInsertStatement()
  const musicInfoOrderInsertStatement = createMusicInfoOrderInsertStatement()
  db.transaction((list_id: string, musicInfos: MusicInfo[]) => {
    musicInfoDeleteByListIdStatement.run(list_id)
    musicInfoOrderDeleteByListIdStatement.run(list_id)
    for (const musicInfo of musicInfos) {
      musicInfoInsertStatement.run(musicInfo)
      musicInfoOrderInsertStatement.run({
        list_id: musicInfo.list_id,
        music_id: musicInfo.id,
        order: musicInfo.order,
      })
    }
  })(list_id, musicInfos)
}

/**
 * 覆盖整个列表
 * @param lists 列表
 * @param musicInfos 歌曲列表
 */
export const overwriteListData = (lists: UserListInfo[], musicInfos: MusicInfo[]) => {
  const db = getDB()
  const listClearAllStatement = createListClearAllStatement()
  const listInsertStatement = createListInsertStatement()
  const musicInfoClearStatement = createMusicInfoClearStatement()
  const musicInfoInsertStatement = createMusicInfoInsertStatement()
  const musicInfoOrderClearStatement = createMusicInfoOrderClearStatement()
  const musicInfoOrderInsertStatement = createMusicInfoOrderInsertStatement()
  db.transaction((lists: UserListInfo[], musicInfos: MusicInfo[]) => {
    listClearAllStatement.run()
    for (const list of lists) {
      listInsertStatement.run({
        id: list.id,
        parent_id: list.parent_id,
        name: list.name,
        type: list.type,
        meta: list.meta,
        position: list.position,
      })
    }
    musicInfoClearStatement.run()
    musicInfoOrderClearStatement.run()
    for (const musicInfo of musicInfos) {
      musicInfoInsertStatement.run(musicInfo)
      musicInfoOrderInsertStatement.run({
        list_id: musicInfo.list_id,
        music_id: musicInfo.id,
        order: musicInfo.order,
      })
    }
  })(lists, musicInfos)
}
