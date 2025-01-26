import { onExtensionEvent } from '@/shared/ipc/extension'
import * as commit from './commit'
import { extI18n } from '../i18n'
import { dateFormat } from '@/shared'
import { extensionEvent } from './event'

export {
  getExtensionErrorMessage,
  getExtensionList,
  getOnlineExtensionList,
  installExtension,
  restartExtensionHost,
  startExtension,
  enableExtension,
  disableExtension,
  restartExtension,
  uninstallExtension,
  updateExtension,
  downloadAndParseExtension,
  getResourceList,
  resourceAction,
  getAllExtensionSettings,
  updateExtensionSettings,
} from '@/shared/ipc/extension'


export const registerRemoteExtensionEvent = () => {
  const loadExt = (id: string) => {
    // commit.setExtensionState(id, )
  }
  const stopExt = (id: string) => {
    // commit.setExtensionRuning(id, loadTimestamp)
  }
  return onExtensionEvent((action): void => {
    console.log('onExtensionEvent', action)
    switch (action.action) {
      case 'listSet':
        commit.setList(action.data)
        break
      case 'listAdd':
        commit.addExtension(action.data)
        break
      case 'listUpdate':
        commit.updateExtension(action.data)
        break
      case 'listRemove':
        commit.removeExtension(action.data)
        break
      case 'loadListStart':
        commit.setStatus('LOADING')
        break
      case 'loadListEnd':
        commit.setStatus('IDLE')
        break
      case 'starting':
        commit.setStatus('STARTING')
        break
      case 'started':
        commit.setStatus('IDLE')
        break
      case 'loading':
        loadExt(action.data)
        break
      case 'loaded':
        commit.setExtensionRuning(action.data.id, action.data.loadTimestamp)
        break
      case 'enabled':
        commit.setExtensionEnabled(action.data.id, action.data.enabled)
        break
      case 'stoping':
        stopExt(action.data)
        break
      case 'stoped':
        commit.setExtensionStop(action.data)
        break
      case 'loadError':
        commit.setExtensionError(action.data.id, action.data.message)
        break
      case 'crash':
        commit.setCrash(action.data)
        break
      case 'error':
        console.error('[ExtensionHost]', action.data)
        break
      case 'logOutput':
        console.log('[ExtensionHost]', `[${dateFormat(action.data.timestamp)} ${action.data.id}(${extI18n.t(action.data.id, action.data.name)})]`, action.data.message)
        break
      case 'resourceUpdated':
        commit.setResourceList(action.data)
        break
      case 'extenstionSettingUpdated':
        // commit.setResourceList(action.data)
        // console.log('[ExtensionHost]', action.data)
        extensionEvent.extenstionSettingUpdated(action.data)
        break
      default:
        console.warn('unknown action:', action)
        // eslint-disable-next-line no-case-declarations, @typescript-eslint/no-unused-vars
        let unknownAction: never = action
    }
  })
}

