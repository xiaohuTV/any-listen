import { addListMusics, moveListMusics } from '@/modules/musicLibrary/store/actions'
import { showNotify } from '../notify'
import { i18n } from '@/plugins/i18n'

export const addMusic = async (listId: string, musicInfos: AnyListen.Music.MusicInfo[]) => {
  await addListMusics(listId, musicInfos)
  showNotify(i18n.t('music_add_modal_add_success'))
}

export const moveMusic = async (fromId: string, toId: string, musicInfos: AnyListen.Music.MusicInfo[]) => {
  await moveListMusics(fromId, toId, musicInfos)
  showNotify(i18n.t('music_add_modal_move_success'))
}
