import { mount, tick, unmount, type ComponentExports } from 'svelte'
import App from './App.svelte'
// import type { Position } from './shared'
import type { Action } from 'svelte/action'
import { appEvent } from '@/modules/app/store/event'
import { debounce } from '@/shared'

// export const showTooltips = (position: Position, message: string, autoCloseTime?: number) => {
//   let isShow = false
//   let app: ComponentExports<typeof App> | null = mount(App, {
//     target: document.getElementById('root')!,
//     props: {
//       onafterleave() {
//         unmountApp()
//       },
//     },
//   })
//   const unmountApp = () => {
//     if (app) {
//       unmount(app)
//       app = null
//     }
//   }
//   void tick().then(() => {
//     if (!app) return
//     isShow = true
//     app.show(position, message, autoCloseTime)
//   })

//   return () => {
//     if (isShow) app?.hide()
//     else unmountApp()
//   }
// }

export const tooltip: Action<HTMLElement, { delay?: number }> = (dom, { delay: _delay = 0 }) => {
  let instance: ComponentExports<typeof App> | null
  let prevTips = ''
  let prevX = 0
  let prevY = 0
  let isDraging = false
  let delay = Math.max(_delay, 50)

  const unmountApp = () => {
    if (instance) {
      void unmount(instance, { outro: true })
      instance = null
    }
  }
  const getTips = () => {
    return dom.getAttribute('aria-label')
  }

  const showTips = debounce((event: MouseEvent) => {
    if (isDraging) return
    let msg = getTips()?.trim()
    if (!msg) return
    prevTips = msg

    if (!instance) {
      instance = mount(App, {
        target: document.getElementById('root')!,
        props: {
          onafterleave() {
            unmountApp()
          },
        },
      })
    }
    void tick().then(() => {
      instance?.show(
        {
          y: event.y + 12,
          x: event.x + 8,
        },
        msg,
        10000
      )
    })
  }, delay)

  const hideTips = () => {
    if (!instance) return
    instance.hide()
  }

  const setTips = (tips: string) => {
    if (!instance) return
    instance.setTips(tips)
  }

  const updateTips = (event: MouseEvent) => {
    if (isDraging) return
    if (!instance) {
      showTips(event)
      return
    }
    setTimeout(() => {
      let msg = getTips()
      if (!msg || prevTips === msg) return
      setTips(msg)
      prevTips = msg
    })
  }

  const handleMouseMove = (event: MouseEvent) => {
    if ((event.x == prevX && event.y == prevY) || isDraging) return
    prevX = event.x
    prevY = event.y
    hideTips()
    showTips(event)
  }
  dom.addEventListener('mousemove', handleMouseMove)
  dom.addEventListener('click', updateTips)
  dom.addEventListener('wheel', updateTips)
  dom.addEventListener('contextmenu', updateTips)
  const unsub = appEvent.on('focus', hideTips)
  const unsub2 = appEvent.on('drag', (end) => {
    if (end) {
      isDraging = false
    } else {
      isDraging = true
      hideTips()
    }
  })
  return {
    destroy() {
      dom.removeEventListener('mousemove', handleMouseMove)
      dom.removeEventListener('click', updateTips)
      dom.removeEventListener('wheel', updateTips)
      dom.removeEventListener('contextmenu', updateTips)
      unsub()
      unsub2()
    },
  }
}
