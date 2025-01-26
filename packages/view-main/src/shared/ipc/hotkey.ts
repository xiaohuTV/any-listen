import { ipc } from './ipc'

export const getHotKey: AnyListen.IPC.ServerIPC['getHotKey'] = async () => {
  return ipc.getHotKey()
}

export const getHotkeyStatus: AnyListen.IPC.ServerIPC['getHotkeyStatus'] = async () => {
  return ipc.getHotkeyStatus()
}
export const hotkeyConfigAction: AnyListen.IPC.ServerIPC['hotkeyConfigAction'] = async (action) => {
  return ipc.hotkeyConfigAction(action)
}

export const onHotKeyDown: AnyListen.IPC.ServerIPC['onHotKeyDown'] = (handler) => {
  return ipc.onHotKeyDown(handler)
}
export const onHotKeyConfigUpdated: AnyListen.IPC.ServerIPC['onHotKeyConfigUpdated'] = (handler) => {
  return ipc.onHotKeyConfigUpdated(handler)
}
