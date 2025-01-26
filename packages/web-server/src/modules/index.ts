import Router from 'koa-router'
// import { registerDevRouter } from './dev'
import { registerIpcRouter } from './ipc'
import { API_PREFIX } from '@any-listen/common/constants'

const router = new Router<unknown, AnyListen.RequestContext>()

router.prefix(API_PREFIX)

// if (import.meta.env.DEV) registerDevRouter(router)

registerIpcRouter(router)

export default router
