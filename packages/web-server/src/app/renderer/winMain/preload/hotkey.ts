import { ipcPreloadEvent } from '@any-listen/app/modules/ipcPreloadEvent'
import type { IPCSocket } from '@/preload/ws'
import type { ExposeFunctions } from '.'
import type { HOTKEY_Type } from '@any-listen/common/hotKey'

// 暴露给后端的方法
export const createExposeHotkey = () => {
  return {
    async hotKeyDown(event, info) {
      ipcPreloadEvent.hotKeyDown(info)
    },
    async hotKeyConfigUpdated(event, config) {
      ipcPreloadEvent.hotKeyConfigUpdated(config as AnyListen.HotKey.HotKeyConfigAll<HOTKEY_Type>)
    },
  } satisfies Partial<ExposeFunctions>
}

// 暴露给前端的方法
export const createClientHotkey = (ipcSocket: IPCSocket) => {
  return {
    async getHotKey() {
      return ipcSocket.remote.getHotKey()
    },
    async getHotkeyStatus() {
      return new Map()
    },
    async hotkeyConfigAction(action) {
      return ipcSocket.remote.hotkeyConfigAction(action)
    },
    onHotKeyDown(listener) {
      ipcPreloadEvent.on('hotKeyDown', listener)
      return () => {
        ipcPreloadEvent.off('hotKeyDown', listener)
      }
    },
    onHotKeyConfigUpdated(listener) {
      ipcPreloadEvent.on('hotKeyConfigUpdated', listener)
      return () => {
        ipcPreloadEvent.off('hotKeyConfigUpdated', listener)
      }
    },
  } satisfies Partial<AnyListen.IPC.ServerIPC>
}
