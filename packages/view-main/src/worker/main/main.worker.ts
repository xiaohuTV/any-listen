import { exposeWorker } from '../utils/worker'

// import * as common from './common'
import * as list from './list'
// import * as music from './music'


console.log('hello main worker')


exposeWorker({ ...list }).remote.inited()

export type workerMainTypes = typeof list
