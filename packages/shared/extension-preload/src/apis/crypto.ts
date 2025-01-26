import { hostContext } from '@/host/state'

// const dataToB64 = (data) => {
//   if (typeof data === 'string') return nativeFuncs.utils_str2b64(data)
//   else if (Array.isArray(data) || ArrayBuffer.isView(data)) return utils.buffer.bufToString(data, 'base64')
//   throw new Error('data type error: ' + typeof data + ' raw data: ' + data)
// }

export const crypto: AnyListen_API.Crypto = {
  aesEncrypt(mode: AnyListen.ExtensionVM.AES_MODE, b64Data: string, b64Key: string, b64iv: string) {
    return hostContext.utils_aes_encrypt(mode, b64Data, b64Key, b64iv)
  },
  rsaEncrypt(mode: AnyListen.ExtensionVM.RSA_PADDING, b64Data: string, b64Key: string) {
    return hostContext.utils_rsa_encrypt(mode, b64Data, b64Key)
  },
  randomBytes(size: number) {
    const byteArray = new Uint8Array(size)
    for (let i = 0; i < size; i++) {
      byteArray[i] = Math.floor(Math.random() * 256) // 随机生成一个字节的值（0-255）
    }
    return byteArray
  },
}
