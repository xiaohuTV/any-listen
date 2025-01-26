import { readable } from 'svelte/store'
import { extensionState } from './store/state'
import { extensionEvent } from './store/event'

export const extensionStatus = readable(extensionState.status, (set) => {
  set(extensionState.status)
  const unsubscribe = extensionEvent.on('statusChanged', () => {
    set(extensionState.status)
  })

  return function stop() {
    unsubscribe()
  }
})

export const extensionList = readable(extensionState.extensionList, (set) => {
  set(extensionState.extensionList)
  const unsubscribe = extensionEvent.on('listChanged', () => {
    set([...extensionState.extensionList])
  })

  return function stop() {
    unsubscribe()
  }
})

export const resourceList = readable(extensionState.resourceList, (set) => {
  set(extensionState.resourceList)
  const unsubscribe = extensionEvent.on('resourceListUpdated', () => {
    set({ ...extensionState.resourceList })
  })

  return function stop() {
    unsubscribe()
  }
})

export const useOnlineExtensionList = () => {
  let list = $state.raw<AnyListen.Extension.OnlineExtension[]>(extensionState.onlineExtensionList)

  $effect(() => {
    list = extensionState.onlineExtensionList
    return extensionEvent.on('onlineExtensionListUpdated', (l) => {
      list = l
    })
  })

  return {
    get val() {
      return list
    },
  }
}
