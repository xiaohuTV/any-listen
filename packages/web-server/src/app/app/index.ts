import { appState } from './state'
import { parseEnvParams } from '@any-listen/nodejs/env'
import { appEvent } from './event'
import { getAppSetting, saveSetting } from './data'
import { checkAndCreateDir, removePath } from '@/shared/utils'
import { setProxy } from '@/app/shared/request'
import { socketEvent } from '@/modules/ipc/event'
import { version } from '../../../package.json'

const initState = () => {
  const envParams = parseEnvParams<AnyListen.CmdParams>()
  appState.envParams = {
    cmdParams: envParams.cmdParams,
  }
  appState.version = version
}

const setUserDataPath = async () => {
  appState.dataPath = `${global.anylisten.dataPath}/app`
  appState.cacheDataPath = `${global.anylisten.dataPath}/cache`
  appState.tempDataPath = `${global.anylisten.dataPath}/temp`
  checkAndCreateDir(appState.dataPath)
  checkAndCreateDir(appState.cacheDataPath)
  await removePath(appState.tempDataPath).catch(() => {})
  checkAndCreateDir(appState.tempDataPath)
}
const listenerAppEvent = () => {
  const handleProxyChange = () => {
    let host: string
    let port: string
    if (appState.appSetting['network.proxy.enable'] && appState.appSetting['network.proxy.host']) {
      host = appState.appSetting['network.proxy.host']
      port = appState.appSetting['network.proxy.port'] || '80'
    } else if (typeof appState.envParams.cmdParams['proxy-server'] == 'string') {
      const [_host, _port] = appState.envParams.cmdParams['proxy-server'].split(':')
      host = _host
      port = _port || '80'
    } else {
      host = ''
      port = ''
    }
    appState.proxy.host = host
    appState.proxy.port = port
    setProxy(host ? `${host}:${port}` : undefined)
    appEvent.proxy_changed(host, port)
  }
  appEvent.on('updated_config', (keys, setting) => {
    if (
      keys.includes('network.proxy.enable') ||
      (appState.appSetting['network.proxy.enable'] && keys.some((k) => k.includes('network.proxy.')))
    ) {
      handleProxyChange()
    }
  })
  if (appState.appSetting['network.proxy.enable'] && appState.appSetting['network.proxy.host']) handleProxyChange()
  socketEvent.on('new_socket_inited', (socket) => {
    setImmediate(() => {
      appEvent.clientConnected(socket)
    })
  })
}

export const initAppEnv = async () => {
  initState()
  await setUserDataPath()
  appState.appSetting = (await getAppSetting()).setting
  listenerAppEvent()
}

/**
 * 更新配置
 * @param setting 新设置
 */
export const updateSetting = (setting: Partial<AnyListen.AppSetting>) => {
  const { setting: newSetting, updatedSettingKeys, updatedSetting } = saveSetting(setting)
  appState.appSetting = newSetting
  if (!updatedSettingKeys.length) return
  appEvent.updated_config(updatedSettingKeys, updatedSetting)
}

export const sendInitedEvent = () => {
  appEvent.inited()
}

export * as appActions from './actions'

export { appState } from './state'
export { appEvent } from './event'
