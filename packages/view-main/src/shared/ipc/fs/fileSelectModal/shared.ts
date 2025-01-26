export interface File extends AnyListen.FileSystem.File {
  id: string
  musicFile: boolean
}

// const sep = appState.os == 'windows' ? '\\' : '/'
const sepRxp = /\\|\//
export const getSep = (path: string) => {
  return sepRxp.exec(path)?.[0] ?? '\\'
}

export const formatPath = (path: string) => {
  const sep = getSep(path)
  path = path.replace(/\\|\//g, sep)
  while (path.length > 1 && path.endsWith(sep)) {
    path = path.substring(0, path.length - 1)
  }
  return path
}
export const getParentDir = (dir: string) => {
  const sep = getSep(dir)
  const index = formatPath(dir).lastIndexOf(sep)
  if (index === -1) return ''
  return dir.substring(0, index)
}
export const buildFilesPath = (curDir: string, files: File[]) => {
  if (!curDir) return files.map((f) => f.name)
  const sep = getSep(curDir)
  return files.map((f) => curDir + sep + f.name)
}
