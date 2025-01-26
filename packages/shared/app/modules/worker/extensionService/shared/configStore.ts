import Store from '@any-listen/nodejs/Store'
import { extensionEvent } from '../event'
import { joinPath } from '@any-listen/nodejs'

const stores = new Map<string, Store>()

const getStore = (extension: AnyListen.Extension.Extension) => {
  let store = stores.get(extension.id)
  if (store) return store
  try {
    store = new Store(joinPath(extension.dataDirectory, 'configuration.json'), false, true)
  } catch (err: any) {
    extensionEvent.error(`init config store error: ${err.stack ?? err.message}`)
    store = new Store(extension.dataDirectory, true, true)
  }
  stores.set(extension.id, store)
  return store
}

export const getConfig = async (extension: AnyListen.Extension.Extension) => {
  const store = getStore(extension)
  return store.getAll<Record<string, unknown>>()
}

export const saveConfig = async (extension: AnyListen.Extension.Extension, config: Record<string, any>) => {
  const store = getStore(extension)
  store.override(config)
}

export const unloadConfig = async (extension: AnyListen.Extension.Extension) => {
  stores.delete(extension.id)
}
