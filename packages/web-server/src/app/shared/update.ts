import { appState } from '../app'
import { request } from './request'
import { compareVersions } from './utils'

interface EventTypes {
  checking_for_update: never
  update_available: AnyListen.UpdateInfo
  update_not_available: AnyListen.VersionInfo
  download_progress: AnyListen.DownloadProgressInfo
  update_downloaded: never
  error: Error
}
type Listener = (event: unknown) => void
class UpdateEvent {
  private readonly listeners: Map<keyof EventTypes, Listener[]>
  constructor() {
    this.listeners = new Map()
  }
  off<T extends keyof EventTypes>(eventName: T, listener: (event: EventTypes[T]) => void) {
    let targetListeners = this.listeners.get(eventName)
    if (!targetListeners) return
    const index = targetListeners.indexOf(listener as Listener)
    if (index < 0) return
    targetListeners.splice(index, 1)
  }
  on<T extends keyof EventTypes>(eventName: T, listener: (event: EventTypes[T]) => void) {
    let targetListeners = this.listeners.get(eventName)
    if (!targetListeners) this.listeners.set(eventName, (targetListeners = []))
    targetListeners.push(listener as Listener)
    return () => {
      this.off(eventName, listener as Listener)
    }
  }
  emit<T extends keyof EventTypes>(eventName: T, event: EventTypes[T]) {
    setImmediate(() => {
      let targetListeners = this.listeners.get(eventName)
      if (!targetListeners) return
      for (const listener of Array.from(targetListeners)) {
        listener(event)
      }
    })
  }
}

const enName = 'YW55LWxpc3Rlbg=='
const name = Buffer.from(enName, 'base64').toString()
const orgName = `@${name}-web-server`
const address = [
  [`https://raw.githubusercontent.com/${orgName}/${name}/main/publish/version.json`, 'direct'],
  [`https://registry.npmjs.org/${orgName}/${name}/latest`, 'npm'],
  [`https://cdn.jsdelivr.net/gh/${orgName}/${name}/publish/version.json`, 'direct'],
  [`https://fastly.jsdelivr.net/gh/${orgName}/${name}/publish/version.json`, 'direct'],
  [`https://gcore.jsdelivr.net/gh/${orgName}/${name}/publish/version.json`, 'direct'],
  [`https://registry.npmmirror.com/${orgName}/${name}/latest`, 'npm'],
  ['http://cdn.stsky.cn/lx-music/mobile/version.json', 'direct'],
] as const

const getDirectInfo = async (url: string) => {
  return request<Partial<AnyListen.UpdateInfo>>(url).then(({ body }) => {
    if (body.version == null) throw new Error('failed')
    return body as AnyListen.UpdateInfo
  })
}

const getNpmPkgInfo = async (url: string) => {
  return request<{ versionInfo?: string }>(url).then(({ body }) => {
    if (!body.versionInfo) throw new Error('failed')
    const info = JSON.parse(body.versionInfo) as Partial<AnyListen.UpdateInfo>
    if (info.version == null) throw new Error('failed')
    return info as AnyListen.UpdateInfo
  })
}
export const getUpdateInfo = async (index = 0): Promise<AnyListen.UpdateInfo> => {
  const [url, source] = address[index]
  let promise: Promise<AnyListen.UpdateInfo>
  switch (source) {
    case 'direct':
      promise = getDirectInfo(url)
      break
    case 'npm':
      promise = getNpmPkgInfo(url)
      break
  }

  return promise.catch(async (err: Error) => {
    index++
    if (index >= address.length) throw err
    return getUpdateInfo(index)
  })
}

class Update extends UpdateEvent {
  async checkForUpdates(isAutoUpdate: boolean) {
    let info: AnyListen.UpdateInfo
    try {
      info = await getUpdateInfo()
    } catch (err) {
      this.emit('error', err as Error)
      return false
    }

    if (compareVersions(appState.version, info.version) > 0) {
      this.emit('update_available', info)
      if (isAutoUpdate) {
        void this.downloadUpdate()
      }
      return true
    }
    this.emit('update_not_available', info)
    return false
  }
  // TODO update
  async downloadUpdate() {
    this.emit('error', new Error('todo download'))
    // throw new Error('')
  }
  async isUpdaterActive() {
    return this.checkForUpdates(false)
  }
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async quitAndInstall() {
    // TODO
    throw new Error('todo install')
  }
}
export const update = new Update()
