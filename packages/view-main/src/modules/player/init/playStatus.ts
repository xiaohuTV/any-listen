import { createUnsubscriptionSet, setTitle } from '@/shared'
import { onRelease } from '@/modules/app/shared'
import { onPlayerCreated } from '../shared'
import { i18n } from '@/plugins/i18n'
import { playerEvent } from '../store/event'
import { setPlayerPlaying, setStatusText, skipNext } from '../store/actions'
import { playerState } from '../store/state'
import { settingState } from '@/modules/setting/store/state'
import { buildMusicName } from '@any-listen/common/tools'

let unregistered = createUnsubscriptionSet()
export const initPlayStatus = () => {
  onRelease(unregistered.clear.bind(unregistered))
  onPlayerCreated(() => {
    unregistered.register((unregistered) => {
      unregistered.add(
        playerEvent.on('play', () => {
          setPlayerPlaying(true)
        })
      )
      unregistered.add(
        playerEvent.on('pause', () => {
          setPlayerPlaying(false)
          setStatusText(i18n.t('player__paused'))
        })
      )
      unregistered.add(
        playerEvent.on('error', () => {
          setPlayerPlaying(false)
        })
      )
      unregistered.add(
        playerEvent.on('stop', () => {
          setPlayerPlaying(false)
          setTitle(null)
          setStatusText(i18n.t('player__stoped'))
          // TODO
          // setPowerSaveBlocker(false)
        })
      )
      unregistered.add(
        playerEvent.on('musicChanged', () => {
          setTitle(
            playerState.musicInfo.id
              ? buildMusicName(
                  settingState.setting['download.fileName'],
                  playerState.musicInfo.name,
                  playerState.musicInfo.singer
                )
              : null
          )
        })
      )
      unregistered.add(
        playerEvent.on('playerPlaying', () => {
          // TODO
          // setPowerSaveBlocker(true)
        })
      )
      unregistered.add(
        playerEvent.on('playerEmptied', () => {
          // TODO
          // setPowerSaveBlocker(false)
        })
      )
      unregistered.add(
        playerEvent.on('playerEnded', () => {
          setStatusText(i18n.t('player__end'))
          void skipNext(true)
        })
      )
    })
  })
}
