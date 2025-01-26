import { getConfig } from '../../../shared/configStore'
import { updateExtensionSettings } from '../../../shared'

export const createConfigurationStore = (extension: AnyListen.Extension.Extension) => {
  return {
    async getConfigs(keys: string[]) {
      const store = await getConfig(extension)
      return keys.map((k) => store[k]) as string[]
    },
    async setConfigs(datas: Record<string, any>) {
      await updateExtensionSettings(extension.id, datas)
    },
  }
}
