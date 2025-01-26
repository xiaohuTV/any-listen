/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { getHotKeyConfig, handleHotkeyConfigAction } from '@/app/modules/hotKey'
import type { ExposeServerFunctions, ExposeClientFunctions } from '.'
import { broadcast } from '@/modules/ipc/websocket'
import type { HOTKEY_Type } from '@any-listen/common/hotKey'

// 暴露给前端的方法
export const createExposeHotkey = () => {
  return {
    async getHotKey(event) {
      return getHotKeyConfig()
    },
    async hotkeyConfigAction(event, action) {
      return handleHotkeyConfigAction(action as AnyListen.HotKey.HotKeyActions<HOTKEY_Type>)
    },
  } satisfies Partial<ExposeClientFunctions>
}

// 暴露给前端的方法
export const createServerHotkey = () => {
  return {
    async hotKeyConfigUpdated(config) {
      broadcast((socket) => {
        if (socket.winType != 'main' || !socket.isInited) return
        void socket.remote.hotKeyConfigUpdated(config)
      })
    },
  } satisfies Partial<ExposeServerFunctions>
}
