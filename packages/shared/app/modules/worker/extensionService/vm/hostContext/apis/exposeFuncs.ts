import { createCommon } from './common'
import { createMusicList } from './musicList'
import { createPlayer } from './player'
import { request } from './request'
import { createStore } from './storage'
import { createConfigurationStore } from './configuration'
// import { extensionState } from '../../../state'

export const createExposeObject = (extension: AnyListen.Extension.Extension) => {
  return {
    ...createCommon(extension),
    request,
    ...createStore(extension.dataDirectory),
    ...createConfigurationStore(extension),
    ...createMusicList(extension),
    ...createPlayer(extension),
    // async getConnectedClients() {
    //   return extensionState.remoteFuncs.getConnectedClients()
    // },
  } satisfies AnyListen.IPCExtension.PreloadIPCActions
}
