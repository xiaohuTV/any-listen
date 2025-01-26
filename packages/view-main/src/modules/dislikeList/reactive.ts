import { readable } from 'svelte/store'
import { dislikeListState } from './store/state'
import { dislikeListEvent } from './store/event'

export const dislikeListRuleCount = readable(dislikeListState.count, (set) => {
  const handleUpdate = () => {
    set(dislikeListState.count)
  }
  handleUpdate()
  dislikeListEvent.on('updated', handleUpdate)

  return function stop() {
    dislikeListEvent.off('updated', handleUpdate)
  }
})

// export const useSettingValue = <T extends keyof AnyListen.AppSetting>(key: T): Readable<AnyListen.AppSetting[T]> => {
//   return readable(settingState.setting[key], (set) => {
//     const handleUpdate = (keys: Array<keyof AnyListen.AppSetting>) => {
//       if (!keys.includes(key)) return
//       set(settingState.setting[key])
//     }
//     event.on('updated', handleUpdate)
//     return () => {
//       event.off('updated', handleUpdate)
//     }
//   })
// }
