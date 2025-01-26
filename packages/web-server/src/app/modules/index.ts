// import { initDielikeList } from './dislikeList'
import { initMusicList } from '@any-listen/app/modules/musicList'
import { initDislikeList } from '@any-listen/app/modules/dislikeList'
import { workers } from '../worker'
import { initPlayer } from './player'
import { initHotKey } from './hotKey'
// import { initMusicList } from './musicList'
import { initTheme } from './theme'
// import { initUserApi } from './userApi'

import getStore from '@/app/shared/store'
import { STORE_NAMES } from '@any-listen/common/constants'
import { initExtension } from './extension'
import { initResources } from './resources'

export const initModules = async () => {
  void initHotKey()
  void initPlayer()
  initTheme()
  initDislikeList(workers.dbService)
  initMusicList(
    workers.dbService,
    async () => {
      return getStore(STORE_NAMES.LIST_SCROLL_POSITION).getAll()
    },
    async (info) => {
      getStore(STORE_NAMES.LIST_SCROLL_POSITION).override(info)
    }
  )
  void initExtension()
  void initResources()
  // initMusicList()
  // initDielikeList()
  // initUserApi()
}
