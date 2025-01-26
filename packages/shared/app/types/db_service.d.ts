declare namespace AnyListen {
  namespace DBService {
    interface DownloadMusicInfo {
      id: string
      isComplate: 0 | 1
      status: AnyListen.Download.DownloadTaskStatus
      statusText: string
      progress_downloaded: number
      progress_total: number
      url: string | null
      quality: AnyListen.Music.Quality
      ext: AnyListen.Download.FileExt
      fileName: string
      filePath: string
      musicInfo: string
      position: number
    }

    type LogType = 'play'
    interface LogInfo {
      // type: 'music'
      time: number
      type: LogType
      content: string
      // meta: string | null
    }

    // interface MusicInfoOtherSource extends Omit<AnyListen.Music.MusicInfo, 'listId'> {
    //   source_id: string
    //   order: number
    // }
  }
}
