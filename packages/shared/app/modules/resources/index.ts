import { extensionEvent } from '../extension'
import type { ExtensionSeriveTypes } from '../worker/utils'
import { initService } from './shared'

export const initResources = (_extensionSerive: ExtensionSeriveTypes) => {
  initService(_extensionSerive)
  extensionEvent.on('setup', (service) => {
    initService(service)
  })
}
