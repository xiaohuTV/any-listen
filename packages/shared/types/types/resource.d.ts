declare namespace AnyListen {
  namespace Resource {
    interface SongListItem {
      play_count: string
      id: string
      author: string
      name: string
      time?: string
      img: string
      // grade: basic.favorcnt / 10,
      desc: string | null
      total?: string
    }

    interface CommonItem {
      id: string
      name: string
    }
    type TagItem = CommonItem
    interface TagGroupItem {
      name: string
      list: CommonItem[]
    }

    type BoardItem = CommonItem
  }
}
