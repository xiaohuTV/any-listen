// import WebEvent, { type EventType } from '@any-listen/web/Event'
// import type { InitState } from './state'

// class Event extends WebEvent {
//   emitEvent<K extends keyof EventMethods>(eventName: K, ...args: any[]) {
//     this.emit(eventName, ...args)
//   }

//   crash(message: string) {
//     this.emitEvent('crash', message)
//   }

//   listChanged() {
//     this.emitEvent('listChanged')
//   }

//   statusChanged(status: InitState['status']) {
//     this.emitEvent('statusChanged', status)
//   }

//   resourceListUpdated(list: InitState['resourceList']) {
//     this.emitEvent('resourceListUpdated', list)
//   }

//   onlineExtensionListUpdated(list: InitState['onlineExtensionList']) {
//     this.emitEvent('onlineExtensionListUpdated', list)
//   }
// }

// type EventMethods = Omit<Event, keyof WebEvent | 'emitEvent'>

// export const extensionEvent = new Event() as EventType<Event>
