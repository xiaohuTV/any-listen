import { versionEvent } from './event'
import { type State, versionState } from './state'

export const setIgnoreVersion = (version: State['ignoreVersion']) => {
  versionState.ignoreVersion = version
  versionEvent.ignore_version_updated(version)
}
export const setProgress = (info: State['progress']) => {
  versionState.progress = info
  versionEvent.download_progress_updated(versionState.progress)
}
export const setVisibleModal = (visible: boolean) => {
  if (versionState.showModal == visible) return
  versionState.showModal = visible
  versionEvent.visible_modal(versionState.showModal)
}

export const setUpdateInfo = (info: AnyListen.IPCCommon.UpdateInfo) => {
  switch (info.type) {
    case 'available':
      versionState.versionInfo.isLatest = false
      versionState.versionInfo.status = 'idle'
      versionEvent.updated({ ...versionState.versionInfo })
      break
    case 'downloaded':
      versionState.versionInfo.status = 'downloaded'
      versionEvent.updated({ ...versionState.versionInfo })
      break
    case 'download_progress':
      if (versionState.versionInfo.status != 'downloading') {
        versionState.versionInfo.status = 'downloading'
        versionEvent.updated({ ...versionState.versionInfo })
      }
      versionState.progress = info.info
      versionEvent.download_progress_updated(info.info)
      break
    case 'checking':
      versionState.versionInfo.isLatest = false
      versionEvent.updated({ ...versionState.versionInfo })
      break
    case 'not_available':
      versionState.versionInfo.isLatest = true
      versionState.versionInfo.status = 'idle'
      versionEvent.updated({ ...versionState.versionInfo })
      break
    case 'error':
      versionEvent.updated({ ...versionState.versionInfo })
      break
  }
}
