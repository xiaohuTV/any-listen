import { mount, tick, unmount } from 'svelte'

import App from './App.svelte'
import { onDesconnected } from '@/modules/app/shared'

export const showMusicAddModal = (isMove: boolean, listId: string, musicInfos: AnyListen.Music.MusicInfo[]) => {
  const app = mount(App, {
    target: document.getElementById('root')!,
    props: {
      onafterleave() {
        void unmount(app, { outro: true })
      },
    },
  })
  const unsub = onDesconnected(() => {
    void unmount(app, { outro: true })
    unsub()
  })
  void tick()
    .then(() => {
      app.show(isMove, listId, musicInfos)
    })
    .finally(() => {
      unsub()
    })
}
