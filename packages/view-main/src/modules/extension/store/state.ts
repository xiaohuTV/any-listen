export interface InitState {
  extensionList: AnyListen.Extension.Extension[]
  onlineExtensionList: AnyListen.Extension.OnlineExtension[]
  status: 'LOADING' | 'STARTING' | 'IDLE'
  crashMessage: string | null
  resourceList: AnyListen.Extension.ResourceList
}

export const extensionState: InitState = {
  extensionList: [],
  onlineExtensionList: [],
  status: 'IDLE',
  crashMessage: null,
  resourceList: {},
}
