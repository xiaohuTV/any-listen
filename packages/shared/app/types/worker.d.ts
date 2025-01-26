import type { workerDBSeriveTypes } from '../modules/worker/dbService'
import type { workerUtilSeriveTypes } from '../modules/worker/utilService'
import type { workerExtensionSeriveTypes } from '../modules/worker/extensionService'

declare global {
  // interface WorkerDBSeriveTypes {
  //   list: typeof list
  // }
  namespace AnyListen {
    type WorkerDBSeriveListTypes = workerDBSeriveTypes
    type WorkerUtilSeriveTypes = workerUtilSeriveTypes
    type WorkerExtensionSeriveTypes = workerExtensionSeriveTypes
  }
}
