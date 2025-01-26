import { STORE_NAMES } from '@any-listen/common/constants'
import defaultHotKey from './config/defaultHotKey'
import getStore from '@/app/shared/store'
import { throttle } from '@/app/shared/utils'
// import { appState } from '@/app'
import type { HOTKEY_Type } from '@any-listen/common/hotKey'

/**
 * 获取快捷键设置
 */
export const getHotKeyConfig = async () => {
  const electronStore_hotKey = getStore(STORE_NAMES.HOTKEY)

  let localConfig = electronStore_hotKey.get('local') as AnyListen.HotKey.HotKeyConfig<HOTKEY_Type> | null
  let globalConfig = electronStore_hotKey.get('global') as AnyListen.HotKey.HotKeyConfig<HOTKEY_Type> | null

  if (globalConfig) {
    // 移除v2.2.0及之前设置的全局媒体快捷键注册
    if (globalConfig.keys.MediaPlayPause) {
      delete globalConfig.keys.MediaPlayPause
      delete globalConfig.keys.MediaNextTrack
      delete globalConfig.keys.MediaPreviousTrack
      electronStore_hotKey.set('global', globalConfig)
    }
  } else {
    localConfig = JSON.parse(JSON.stringify(defaultHotKey.local))
    globalConfig = JSON.parse(JSON.stringify(defaultHotKey.global))

    electronStore_hotKey.set('local', localConfig)
    electronStore_hotKey.set('global', globalConfig)
  }

  return {
    local: localConfig!,
    global: globalConfig!,
  }
}

type HotKeyType = 'local' | 'global'

const saveHotKeyConfigThrottle = throttle<[AnyListen.HotKey.HotKeyConfigAll<HOTKEY_Type>]>(
  (config: AnyListen.HotKey.HotKeyConfigAll<HOTKEY_Type>) => {
    for (const key of Object.keys(config) as HotKeyType[]) {
      getStore(STORE_NAMES.HOTKEY).set(key, config[key])
    }
  }
)
export const saveHotKeyConfig = (config: AnyListen.HotKey.HotKeyConfigAll<HOTKEY_Type>) => {
  saveHotKeyConfigThrottle(config)
}
