// 将字节数组解码为字符串（UTF-8）
export const bytesToString = (bytes: number[] | Uint8Array) => {
  let result = ''
  let i = 0
  while (i < bytes.length) {
    const byte = bytes[i]
    if (byte < 128) {
      result += String.fromCharCode(byte)
      i++
    } else if (byte >= 192 && byte < 224) {
      result += String.fromCharCode(((byte & 31) << 6) | (bytes[i + 1] & 63))
      i += 2
    } else {
      result += String.fromCharCode(((byte & 15) << 12) | ((bytes[i + 1] & 63) << 6) | (bytes[i + 2] & 63))
      i += 3
    }
  }
  return result
}

// 将字符串编码为字节数组（UTF-8）
export const stringToBytes = (inputString: string) => {
  const bytes = []
  for (let i = 0; i < inputString.length; i++) {
    const charCode = inputString.charCodeAt(i)
    if (charCode < 128) {
      bytes.push(charCode)
    } else if (charCode < 2048) {
      bytes.push((charCode >> 6) | 192)
      bytes.push((charCode & 63) | 128)
    } else {
      bytes.push((charCode >> 12) | 224)
      bytes.push(((charCode >> 6) & 63) | 128)
      bytes.push((charCode & 63) | 128)
    }
  }
  return bytes
}

export const generateId = () => {
  return Math.random().toString(36).slice(3) + Math.random().toString(36).slice(2)
}
