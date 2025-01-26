import { exposeWorker } from '../utils/worker'

import * as music from './music'
import * as common from './common'

void exposeWorker<{
  inited: () => void
}>({
  ...common,
  ...music,
}).then(({ remote }) => {
  remote.inited()
})

export type workerUtilSeriveTypes = typeof common & typeof music
