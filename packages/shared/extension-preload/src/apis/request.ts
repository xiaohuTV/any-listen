// import { hostCallActions } from '@/host/hostActions'
import { hostContext } from '@/host/state'

// const requestQueue = new Map<string, {
//   callback: RespCallback<any>
//   requestInfo: {
//     aborted: boolean
//     abort: () => void
//   }
// }>()

export const request: AnyListen_API.API['request'] = async (url, options) => {
  return hostContext.hostFuncs.request(url, options)
  // const requestKey = Math.random().toString()
  // const requestInfo = {
  //   aborted: false,
  //   abort: () => {
  //     if (requestInfo.aborted) return
  //     requestInfo.aborted = true
  //     hostCallActions('cancel_request', requestKey)
  //   },
  // }
  // requestQueue.set(requestKey, {
  //   callback,
  //   // timeout: setTimeout(() => {
  //   //   const req = requestQueue.get(requestKey)
  //   //   if (req) req.timeout = null
  //   //   nativeCall(NATIVE_EVENTS_NAMES.cancelRequest, requestKey)
  //   // }, 30000),
  //   requestInfo,
  // })

  // hostCallActions('request', { requestKey, url, options })
  // return requestInfo
}

// export const handleResponse = ({ requestKey, error, response }: AnyListen.ExtensionVM.PreloadCallActions['response']) => {
//   const targetRequest = requestQueue.get(requestKey)
//   if (!targetRequest) return
//   requestQueue.delete(requestKey)
//   targetRequest.requestInfo.aborted ||= true
//   // if (targetRequest.timeout) clearTimeout(targetRequest.timeout)
//   if (error == null) targetRequest.callback(null, response)
//   else targetRequest.callback(new Error(error), null)
// }
