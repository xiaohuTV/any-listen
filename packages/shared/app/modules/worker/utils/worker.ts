import { MessagePort, parentPort } from 'node:worker_threads'
import { createMsg2call, type ReadObj } from 'message2call'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exposeWorker = async <T extends Record<string, any>>(obj: ReadObj) => {
  return new Promise<ReturnType<typeof createMsg2call<T>>>((resolve, reject) => {
    const handlePortMessage = (port?: MessagePort) => {
      if (!port || !(port instanceof MessagePort)) return

      const message2call = createMsg2call<T>({
        funcsObj: obj,
        isSendErrorStack: true,
        timeout: 0,
        sendMessage(data) {
          port.postMessage(data)
        },
      })
      port.on('message', (message) => {
        message2call.message(message)
      })

      resolve(message2call)
    }
    parentPort?.once('message', handlePortMessage)
  })
}
