import defaultSetting from '@/app/shared/defaultSetting'

export const appState: {
  envParams: AnyListen.EnvParams
  staticPath: string
  dataPath: string
  cacheDataPath: string
  tempDataPath: string
  version: string
  appSetting: AnyListen.AppSetting
  shouldUseDarkColors: boolean
  proxy: {
    host: string
    port: string
  }
} = {
  envParams: {
    cmdParams: {},
  },
  proxy: {
    host: '',
    port: '',
  },
  staticPath: '',
  dataPath: '',
  version: '',
  cacheDataPath: '',
  tempDataPath: '',
  appSetting: defaultSetting,
  shouldUseDarkColors: false,
}
