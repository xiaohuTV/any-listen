import './shared/error'
import { appState, initAppEnv } from '@/app/app'
import { initI18n } from './i18n'
import { startCommonWorkers, startExtensionServiceWorker } from './worker'
// import registerModules from '@/modules'
import { initModules } from './modules'
import { initRenderers } from './renderer'
import { appLog } from '@/shared/log4js'

// let isInited = false
// 初始化应用
export const initApp = async () => {
  console.log('init')
  await initAppEnv()
  initI18n()
  await startCommonWorkers(appState.dataPath)
  void startExtensionServiceWorker()
  await initModules()
  await initRenderers()

  // registerModules()
  // if (app.isReady()) sendInitedEvent()
  // else isInited = true
  // isInited = true
  appLog.info('app initialized.')
}

// void app.whenReady().then(() => {
//   // https://github.com/electron/electron/issues/16809
//   if (isLinux) {
//     setTimeout(() => {
//       if (isInited) sendInitedEvent()
//     }, 300)
//   } else if (isInited) sendInitedEvent()
// })
