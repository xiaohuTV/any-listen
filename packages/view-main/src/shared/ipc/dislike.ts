import { ipc } from './ipc'

export const getInfo: AnyListen.IPC.ServerIPC['getDislikeInfo'] = async () => {
  return ipc.getDislikeInfo()
}

export const sendAction: AnyListen.IPC.ServerIPC['dislikeAction'] = async (action) => {
  return ipc.dislikeAction(action)
}

export const onAction: AnyListen.IPC.ServerIPC['onDislikeAction'] = (handler) => {
  return ipc.onDislikeAction(handler)
}
