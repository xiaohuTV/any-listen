import { app } from './app'
import { env } from './env'
import { request } from './request'
import { crypto } from './crypto'
import { buffer } from './buffer'
import { onEvent } from './event'
import { logcat } from './logcat'
import { storage } from './storage'
import { musicList } from './musicList'
import { player } from './player'
import { registerResourceAction } from './resource'
import { hostContext } from '@/host/state'
import { configuration } from './configuration'
import { translate } from '@/i18n'

export const getAPI = () => {
  const extensionAPI: Partial<AnyListen_API.API> = {
    /** 环境相关 */
    env,
    /** 应用相关 */
    app,
    onEvent,
    logcat,
    storage,
    configuration,
    registerResourceAction,
    utils: {
      buffer,
      crypto,
    },
    t(key, data) {
      return translate(key, data)
    },
  }

  for (const grant of hostContext.extension.grant) {
    switch (grant) {
      case 'internet':
        extensionAPI.request = request
        break
      case 'player':
        extensionAPI.musicList = musicList
        break
      case 'music_list':
        extensionAPI.player = player
        break

      // default:
      //   // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-case-declarations
      //   const neverValue: never = grant
    }
  }
  return extensionAPI as AnyListen_API.API
  // console.log('Preload finished.')
}
