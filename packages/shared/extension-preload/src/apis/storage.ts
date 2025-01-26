/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { hostContext } from '@/host/state'

export const storage = {
  async getItem<T>(key: string) {
    if (typeof key != 'string') throw new Error('key required a string')
    const val = (await hostContext.hostFuncs.getItems([key]))[0]
    return val == null ? val : (JSON.parse(val) as T)
  },
  async getItems<T extends unknown[]>(keys: string[]) {
    if (keys.some((k) => typeof k != 'string')) throw new Error('key required a string')
    return (await hostContext.hostFuncs.getItems(keys)).map((val: string) => {
      return val == null ? val : (JSON.parse(val) as unknown)
    }) as T
  },
  async setItem(key: string, value: unknown) {
    await hostContext.hostFuncs.setItems([[key, JSON.stringify(value)]])
  },
  async setItems<T extends Array<[string, unknown]>>(datas: T) {
    await hostContext.hostFuncs.setItems(
      datas.map(([k, v]) => {
        if (typeof k != 'string') throw new Error('key required a string')
        return [k, JSON.stringify(v)]
      })
    )
  },
  async removeItem(key: string) {
    if (typeof key != 'string') throw new Error('key required a string')
    await hostContext.hostFuncs.removeItems([key])
  },
  async removeItems(keys: string[]) {
    if (keys.some((k) => typeof k != 'string')) throw new Error('key required a string')
    await hostContext.hostFuncs.removeItems(keys)
  },
  async clearItems() {
    await hostContext.hostFuncs.clearItems()
  },
}
