import { createAudio } from '@/plugins/player'
import { initPlayerEvent } from './playerEvent'
import { initMediaDevice } from './mediaDevice'
// import usePlayStatus from './usePlayStatus'
import { initProgress } from './progress'
import { initMediaSessionInfo } from './mediaSessionInfo'
import { initPlayErrorHandler } from './playErrorHandler'
import { initPlayStatus } from './playStatus'
import { initPlayKeyboardAction } from './playKeyboardAction'
import { initVolume } from './volume'
import { initPlaybackRate } from './playbackRate'
import { initSoundEffect } from './soundEffect'
import { initWatchList } from './watchList'
import { initPreloadNextMusic } from './preloadNextMusic'

export const initPlayer = () => {
  createAudio()

  initPlayerEvent()
  initMediaDevice() // 初始化音频驱动输出设置
  initMediaSessionInfo()
  initPlayErrorHandler()
  initPlayStatus()
  initPlayKeyboardAction()
  initVolume()
  initPlaybackRate()
  initSoundEffect()
  initProgress()
  initPreloadNextMusic()
  initWatchList()

  // const initPlayStatus1 = usePlayStatus()

  // return () => {
  //   void initPlayStatus1()
  // }
}
