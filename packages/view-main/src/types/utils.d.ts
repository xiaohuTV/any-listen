import type { Readable } from 'svelte/store'


declare global {
  type StoreType<T> = T extends Readable<infer V> ? V : never
}
