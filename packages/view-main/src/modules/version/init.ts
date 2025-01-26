import { createUnsubscriptionSet } from '@/shared'
import { onRelease } from '@/modules/app/shared'
import { registerRemoteActions } from './store/actions'
import { onPlayerCreated } from '@/modules/player/shared'

const unregistered = createUnsubscriptionSet()

export const initDislikeList = () => {
  onRelease(unregistered.clear.bind(unregistered))
  onPlayerCreated(() => {
    unregistered.register((subscriptions) => {
      subscriptions.add(registerRemoteActions())
    })
  })
}
