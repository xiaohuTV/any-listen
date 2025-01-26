import path from 'node:path'
import { isMac, isWin } from '@any-listen/nodejs/index'
import defaultSetting from '@any-listen/common/defaultSetting'

if (isMac) {
  // defaultSetting['common.controlBtnPosition'] = 'right'
} else if (isWin) {
  defaultSetting['player.isPlayAwlrc'] = true
  defaultSetting['desktopLyric.isLockScreen'] = true
}

defaultSetting['common.windowSizeId'] = 2
defaultSetting['download.savePath'] = path.join(global.anylisten.dataPath, 'download')

export default defaultSetting
