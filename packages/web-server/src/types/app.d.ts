/* eslint-disable no-var */
import type Koa from 'koa'
import type { LRUCache } from 'lru-cache'

declare global {
  namespace AnyListen {
    interface RequestContext extends Koa.Context {
      userIp: string
      now: number
    }
    type Next = Koa.Next
  }

  interface Anylisten {
    dataPath: string
    config: AnyListen.Config
    publicStaticPaths: LRUCache<string, string>
  }

  var anylisten: Anylisten
}
