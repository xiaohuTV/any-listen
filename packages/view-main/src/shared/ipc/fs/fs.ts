import { ipc } from '../ipc'

export const readRootDir = async () => {
  return ipc.fileSystemAction<'read_root_dir'>({
    action: 'read_root_dir',
  })
}

export const readDir = async (path: string, fileFilter?: string[], isDirOnly?: boolean) => {
  return ipc.fileSystemAction<'read_dir'>({
    action: 'read_dir',
    data: {
      path,
      fileFilter,
      isDirOnly,
    },
  })
}

export const rename = async (path: string, newPath: string) => {
  return ipc.fileSystemAction<'rename'>({
    action: 'rename',
    data: {
      path,
      newPath,
    },
  })
}
