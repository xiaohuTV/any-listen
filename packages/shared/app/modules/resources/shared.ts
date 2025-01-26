import type { ExtensionSeriveTypes } from '../worker/utils'

let extensionSerive: ExtensionSeriveTypes

export const initService = (_extensionSerive: ExtensionSeriveTypes) => {
  extensionSerive = _extensionSerive
}

export const services = {
  get extensionSerive() {
    return extensionSerive
  },
}
