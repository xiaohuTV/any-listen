import { createUserList as createUserListRemote, getSubUserLists, updateUserList } from '@/modules/musicLibrary/store/actions'
import { musicLibraryState } from '@/modules/musicLibrary/store/state'
import { LIST_IDS } from '@any-listen/common/constants'

export const createUserList = async (type: AnyListen.List.UserListType, name: string, listId?: string) => {
  const lists = getSubUserLists(null)
  let position: number
  if (listId) {
    if (listId == LIST_IDS.LOVE || listId == LIST_IDS.DEFAULT) {
      position = 0
    } else {
      position = lists.findIndex((l) => l.id == listId)
      if (position != -1) position = position + 1
    }
  } else {
    position = musicLibraryState.userLists.length
  }
  await createUserListRemote(position, type, name)
}

export const editUserList = async (listId: string, name: string) => {
  await updateUserList(listId, name)
}
