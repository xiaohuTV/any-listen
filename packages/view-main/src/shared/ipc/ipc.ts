let connectIPCService: AnyListen.IPC.ConnectIPCSrivice | null
let ipc: AnyListen.IPC.ServerIPC
export const connectIPC = (
  onConnected: () => void,
  onDisconnected: () => void,
  onFailed: (message: string) => void,
  onLogout: () => void,
  pwd = ''
) => {
  if (!connectIPCService) {
    if (!window.__anylisten_ipc_init__) throw new Error('ipc is not available')
    connectIPCService = window.__anylisten_ipc_init__
    delete window.__anylisten_ipc_init__
  }
  connectIPCService(
    (_ipc) => {
      ipc = _ipc
      window.testData = ipc
      onConnected()
    },
    onDisconnected,
    onFailed,
    onLogout,
    pwd
  )
}

const _ipc = new Proxy(
  {},
  {
    get(target, property, receiver) {
      return ipc[property as keyof AnyListen.IPC.ServerIPC]
    },
  }
) as AnyListen.IPC.ServerIPC

export { _ipc as ipc }
