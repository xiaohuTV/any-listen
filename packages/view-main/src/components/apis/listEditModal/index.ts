import { mount, tick, unmount } from 'svelte'

import App from './App.svelte'
import { onDesconnected } from '@/modules/app/shared'

export const showListEditModal = (targetId?: string, isEdit?: boolean) => {
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
      app.show(targetId, isEdit)
    })
    .finally(() => {
      unsub()
    })
}
