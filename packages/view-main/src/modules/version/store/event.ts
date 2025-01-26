import _Event, { type EventType } from '@any-listen/web/Event'
import type { State } from './state'

class Event extends _Event {
  emitEvent<K extends keyof EventMethods>(eventName: K, ...args: unknown[]) {
    this.emit(eventName, ...args)
  }

  updated(info: State['versionInfo']) {
    this.emitEvent('updated', info)
  }

  ignore_version_updated(info: State['ignoreVersion']) {
    this.emitEvent('ignore_version_updated', info)
  }

  download_progress_updated(info: State['progress']) {
    this.emitEvent('download_progress_updated', info)
  }

  visible_modal(info: State['showModal']) {
    this.emitEvent('visible_modal', info)
  }
}

type EventMethods = Omit<Event, keyof _Event | 'emitEvent'>

export const versionEvent = new Event() as EventType<Event>
