import { extensionState } from './state'
import { getOnlineExtensionList as getOnlineExtensionListRemote } from './remoteAction'
import * as commit from './commit'

export const getOnlineExtensionList = async(force = false) => {
  if (!force && extensionState.onlineExtensionList.length) return
  // TODO
  const { list } = await getOnlineExtensionListRemote({ page: 1, limit: 1000 })
  commit.setOnlineExtension(list)
}


export {
  getExtensionErrorMessage,
  downloadAndParseExtension,
  getExtensionList,
  installExtension,
  registerRemoteExtensionEvent,
  restartExtensionHost,
  startExtension,
  enableExtension,
  disableExtension,
  restartExtension,
  uninstallExtension,
  updateExtension,
  getResourceList,
  resourceAction,
  getAllExtensionSettings,
  updateExtensionSettings,
} from './remoteAction'

export {
  setCrash,
  setList,
  setResourceList,
} from './commit'
