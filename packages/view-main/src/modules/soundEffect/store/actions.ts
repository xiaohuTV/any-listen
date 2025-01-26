import { soundEffectState } from './state'
import {
  getUserSoundEffectConvolutionPresetList,
  getUserEQPresetList as getUserSoundEffectEQPresetList,
  saveUserSoundEffectConvolutionPresetList,
  saveUserSoundEffectEQPresetList,
} from '@/shared/ipc/soundEffect'
import * as commit from './commit'

export const initUserEQPresetList = async () => {
  if (soundEffectState.userEqPresetList == null) {
    // eslint-disable-next-line require-atomic-updates
    commit.setUserEqPresetList(await getUserSoundEffectEQPresetList())
  }
}
// export const getUserEQPresetList = async() => {
//   await initUserEQPresetList()
//   return soundEffectState.userEqPresetList!
// }
export const saveUserEQPreset = async (preset: AnyListen.SoundEffect.EQPreset) => {
  await initUserEQPresetList()
  commit.updateUserEqPresetList(preset)
  saveUserSoundEffectEQPresetList(soundEffectState.userEqPresetList!)
}
export const removeUserEQPreset = async (id: string) => {
  await initUserEQPresetList()
  commit.removeUserEqPresetList(id)
  saveUserSoundEffectEQPresetList(soundEffectState.userEqPresetList!)
}

export const initUserConvolutionPresetList = async () => {
  if (soundEffectState.userConvolutionPresetList == null) {
    // eslint-disable-next-line require-atomic-updates
    commit.setUserConvolutionPresetList(await getUserSoundEffectConvolutionPresetList())
  }
}
// export const getUserConvolutionPresetList = async() => {
//   await initUserConvolutionPresetList()
//   return soundEffectState.userConvolutionPresetList!
// }
export const saveUserConvolutionPreset = async (preset: AnyListen.SoundEffect.ConvolutionPreset) => {
  await initUserConvolutionPresetList()
  commit.updateUserConvolutionPresetList(preset)
  saveUserSoundEffectConvolutionPresetList(soundEffectState.userConvolutionPresetList!)
}
export const removeUserConvolutionPreset = async (id: string) => {
  await initUserConvolutionPresetList()
  commit.removeUserConvolutionPresetList(id)
  saveUserSoundEffectConvolutionPresetList(soundEffectState.userConvolutionPresetList!)
}
