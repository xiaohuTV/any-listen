// 前端 preload 事件处理层
import Event, { type EventType2 } from '@any-listen/web/Event'
import type { HOTKEY_Type } from '@any-listen/common/hotKey'
import type { MessagePort } from 'worker_threads'

class IPCEvent extends Event {
  emitEvent<K extends keyof EventMethods>(eventName: K, ...args: unknown[]) {
    this.emit(eventName, ...args)
  }

  settingChanged(keys: Array<keyof AnyListen.AppSetting>, setting: Partial<AnyListen.AppSetting>) {
    this.emitEvent('settingChanged', keys, setting)
  }

  deeplinkAction(deeplink: string) {
    this.emitEvent('deeplinkAction', deeplink)
  }

  playerAction(action: AnyListen.IPCPlayer.ActionPlayer) {
    this.emitEvent('playerAction', action)
  }

  playListAction(action: AnyListen.IPCPlayer.PlayListAction) {
    this.emitEvent('playListAction', action)
  }

  playHistoryListAction(action: AnyListen.IPCPlayer.PlayHistoryListAction) {
    this.emitEvent('playHistoryListAction', action)
  }

  themeChanged(setting: AnyListen.ThemeSetting) {
    this.emitEvent('themeChanged', setting)
  }

  themeListChanged(list: AnyListen.ThemeList) {
    this.emitEvent('themeListChanged', list)
  }

  hotKeyDown(config: AnyListen.HotKey.HotKeyDownInfo) {
    this.emitEvent('hotKeyDown', config)
  }

  hotKeyConfigUpdated(config: AnyListen.HotKey.HotKeyConfigAll<HOTKEY_Type>) {
    this.emitEvent('hotKeyConfigUpdated', config)
  }

  createDesktopLyricProcess(ports: MessagePort[]) {
    this.emitEvent('createDesktopLyricProcess', ports)
  }

  listAction(action: AnyListen.IPCList.ActionList) {
    this.emitEvent('listAction', action)
  }

  dislikeAction(action: AnyListen.IPCDislikeList.ActionList) {
    this.emitEvent('dislikeAction', action)
  }

  extensionEvent(action: AnyListen.IPCExtension.EventExtension) {
    this.emitEvent('extensionEvent', action)
  }

  showMessageBox(extId: string, key: string, options: AnyListen.IPCCommon.MessageDialogOptions) {
    this.emitEvent('showMessageBox', extId, key, options)
  }

  showInputBox(extId: string, key: string, options: AnyListen.IPCCommon.InputDialogOptions) {
    this.emitEvent('showInputBox', extId, key, options)
  }

  showOpenBox(extId: string, key: string, options: AnyListen.IPCCommon.OpenDialogOptions) {
    this.emitEvent('showOpenBox', extId, key, options)
  }

  showSaveBox(extId: string, key: string, options: AnyListen.IPCCommon.SaveDialogOptions) {
    this.emitEvent('showSaveBox', extId, key, options)
  }

  closeMessageBox(key: string, message?: string) {
    this.emitEvent('closeMessageBox', key, message)
  }

  messageBoxConfirm(key: string, result: unknown) {
    this.emitEvent('messageBoxConfirm', key, result)
  }

  updateInfo(info: AnyListen.IPCCommon.UpdateInfo) {
    this.emitEvent('updateInfo', info)
  }
}

type EventMethods = Omit<IPCEvent, keyof Event | 'emitEvent'>

export const ipcPreloadEvent = new IPCEvent() as EventType2<IPCEvent>
// export const ipcPreloadEvent = new IPCEvent()
