import { hostContext } from '@/host/state'

export const configuration: AnyListen_API.Configuration = {
  async getConfigs(keys) {
    return hostContext.hostFuncs.getConfigs(keys)
  },
  async setConfigs(datas) {
    return hostContext.hostFuncs.setConfigs(datas)
  },
}
