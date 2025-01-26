import { createMsg2call, createProxyCallback } from 'message2call'

export declare type WorkerMainTypes = WarpPromiseRecord<AnyListen.WorkerMainTypes>

export const createMainWorker = (): WorkerMainTypes => {
  const worker: Worker = new Worker(new URL('../main/main.worker', import.meta.url), {
    type: 'module',
  })
  const msg2call = createMsg2call<WorkerMainTypes>({
    funcsObj: {
      inited() {
        window.dispatchEvent(new CustomEvent('worker-initialized-main'))
      },
    },
    isSendErrorStack: true,
    timeout: 0,
    sendMessage(message) {
      worker.postMessage(message)
    },
  })
  worker.onmessage = (event) => {
    msg2call.message(event.data)
  }
  return msg2call.remote
}

// export const createWorker = <T>(url: string): Comlink.Remote<T> => {
//   // @ts-expect-error
//   const worker: Worker = new Worker(new URL(url, import.meta.url))
//   return Comlink.wrap<T>(worker)
//   // worker.addEventListener('message', (event: MessageEvent) => {

//   // })
// }

// export const createDownloadWorker = (): AnyListen.WorkerDownloadTypes => {
//   const worker: Worker = new Worker(new URL('../download/download.worker', import.meta.url), {
//     type: 'module',
//   })
//   const msg2call = createMsg2call<AnyListen.WorkerDownloadTypes>({
//     funcsObj: {},
//     sendMessage(message) {
//       worker.postMessage(message)
//     },
//     isSendErrorStack: true,
//     timeout: 0,
//   })
//   worker.onmessage = (event) => {
//     msg2call.message(event.data)
//   }
//   return msg2call.remote
// }

export const proxyCallback = <Args extends any[]>(callback: (...args: Args) => void) => {
  return createProxyCallback(callback)
}
