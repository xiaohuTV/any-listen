import { LRUCache } from 'lru-cache'

export default {
  store: new LRUCache({
    max: 10000,
    ttl: 1000 * 60 * 60 * 24 * 2,
    // updateAgeOnGet: true,
  }),

  get<T = unknown>(key: string) {
    return this.store.get(key) as T | null
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set(key: string, value: any) {
    return this.store.set(key, value as object)
  },

  has(key: string) {
    return this.store.has(key)
  },

  delete(key: string) {
    return this.store.delete(key)
  },

  clear() {
    this.store.clear()
  },
}
