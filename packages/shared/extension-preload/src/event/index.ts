import _Event from './Event'

export class Event extends _Event {
  emitEvent<K extends keyof EventMethods>(eventName: K, ...args: unknown[]) {
    this.emit(eventName, ...args)
  }

  /** 语言更改 */
  localeChanged(locale: AnyListen_API.Locale) {
    this.emitEvent('localeChanged', locale)
  }

  configurationChanged(keys: string[], configuration: Record<string, unknown>) {
    this.emitEvent('configurationChanged', keys, configuration)
  }

  musicListAction(action: AnyListen.IPCList.ActionList) {
    this.emitEvent('musicListAction', action)
  }

  playerEvent(event: AnyListen.IPCPlayer.PlayerEvent) {
    this.emitEvent('playerEvent', event)
  }

  playListAction(action: AnyListen.IPCPlayer.PlayListAction) {
    this.emitEvent('playListAction', action)
  }

  playHistoryListAction(action: AnyListen.IPCPlayer.PlayHistoryListAction) {
    this.emitEvent('playHistoryListAction', action)
  }

  // clientConnected(id: string) {
  //   this.emitEvent('clientConnected', id)
  // }
  // clientDisconnected(id: string) {
  //   this.emitEvent('clientDisconnected', id)
  // }
}

type EventMethods = Omit<Event, keyof _Event | 'emitEvent'>
// declare class EventType extends Event {
//   /**
//    * Listen event
//    * @param event event name
//    * @param listener event hander
//    * @return remove event
//    */
//   on<K extends keyof EventMethods>(event: K, listener: EventMethods[K]): () => void
//   // off<K extends keyof EventMethods>(event: K, listener: EventMethods[K]): void
// }

type Gtype<E extends _Event> = Omit<E, keyof _Event | 'emitEvent'>
type EventType<E extends _Event> = {
  on: <K extends keyof Gtype<E>>(event: K, listener: E[K]) => () => void
} & Gtype<E>

export type ExtensionAPIEventType = EventType<Event>

export const extensionAPIEvent = new Event() as ExtensionAPIEventType
