/* eslint-disable @typescript-eslint/switch-exhaustiveness-check */
import { hostContext } from '@/host/state'
import { bytesToString, stringToBytes } from '@/utils'

export const buffer: AnyListen_API.Buffer = {
  from(input: string | number[], encoding: AnyListen_API.BufferFormat = 'utf-8') {
    // console.log('buffer.from', input, encoding)
    if (typeof input === 'string') {
      switch (encoding) {
        case 'binary':
          throw new Error('Binary encoding is not supported for input strings')
        case 'base64':
          return new Uint8Array(hostContext.utils_b642buf(input))
        case 'hex':
          return new Uint8Array((input.match(/.{1,2}/g) ?? []).map((byte) => parseInt(byte, 16)))
        default:
          return new Uint8Array(stringToBytes(input))
      }
    } else if (Array.isArray(input)) {
      return new Uint8Array(input)
    } else {
      throw new Error(`Unsupported input type: ${typeof input} encoding: ${encoding}`)
    }
  },
  bufToString<T extends AnyListen_API.BufferFormat>(buf: number[] | Uint8Array, format: T): AnyListen_API.BufferToStringTypes[T] {
    // console.log('buffer.bufToString', buf, format)
    if (Array.isArray(buf) || ArrayBuffer.isView(buf)) {
      switch (format) {
        case 'binary':
          // return new TextDecoder('latin1').decode(new Uint8Array(buf))
          return buf as AnyListen_API.BufferToStringTypes[T]
        case 'hex':
          return new Uint8Array(buf).reduce(
            (str, byte) => str + byte.toString(16).padStart(2, '0'),
            ''
          ) as unknown as AnyListen_API.BufferToStringTypes[T]
        case 'base64':
          return hostContext.utils_str2b64(bytesToString(buf)) as AnyListen_API.BufferToStringTypes[T]
        case 'utf8':
        case 'utf-8':
        default:
          return bytesToString(Array.from(buf)) as AnyListen_API.BufferToStringTypes[T]
      }
    } else {
      throw new Error(`Input is not a valid buffer: ${String(buf)} format: ${format}`)
    }
  },
}
