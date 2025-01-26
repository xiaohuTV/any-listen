import { type ExtensionAPIEventType, extensionAPIEvent } from '../event'

export const onEvent: ExtensionAPIEventType['on'] = (name, handler) => {
  return extensionAPIEvent.on(name, handler)
}
