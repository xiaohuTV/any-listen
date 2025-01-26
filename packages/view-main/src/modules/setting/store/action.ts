import { onSettingChanged } from '@/shared/ipc/app'
import { setSetting } from '@/modules/app/store/action'
import * as commit from './commit'

export const updateSetting = async (setting: Partial<AnyListen.AppSetting>) => {
  // console.warn(setting)
  await setSetting(setting)
}

export const registerRemoteSettingAction = () => {
  return onSettingChanged((keys, setting) => {
    commit.updateSetting(keys, setting)
  })
}

export { getSetting } from '@/shared/ipc/app'
