import _Event, { type EventType } from '@any-listen/web/Event'
import type { Line } from './state'

class Event extends _Event {
  emitEvent<K extends keyof EventMethods>(eventName: K, ...args: any[]) {
    this.emit(eventName, ...args)
  }

  linesChanged(lines: Line[]) {
    this.emitEvent('linesChanged', lines)
  }

  lineChanged(text: string, line: number) {
    this.emitEvent('lineChanged', text, line)
  }
}

type EventMethods = Omit<Event, keyof _Event | 'emitEvent'>

export const lyricEvent = new Event() as EventType<Event>
