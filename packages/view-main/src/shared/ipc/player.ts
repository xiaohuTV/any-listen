import { ipc } from './ipc'

export const getPlayInfo = async () => {
  return ipc.getPlayInfo()
}
export const onPlayerAction: AnyListen.IPC.ServerIPC['onPlayerAction'] = (listener) => {
  return ipc.onPlayerAction(listener)
}
export const sendPlayerEvent = async (event: AnyListen.IPCPlayer.PlayerEvent) => {
  return ipc.playerEvent(event)
}

export const onPlayListAction: AnyListen.IPC.ServerIPC['onPlayListAction'] = (listener) => {
  return ipc.onPlayListAction(listener)
}
export const sendPlayListAction = async (action: AnyListen.IPCPlayer.PlayListAction) => {
  return ipc.playListAction(action)
}
export const onPlayHistoryListAction: AnyListen.IPC.ServerIPC['onPlayHistoryListAction'] = (listener) => {
  return ipc.onPlayHistoryListAction(listener)
}
export const sendPlayHistoryListAction = async (action: AnyListen.IPCPlayer.PlayHistoryListAction) => {
  return ipc.playHistoryListAction(action)
}
