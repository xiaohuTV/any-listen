/** 注册命令 */
export const registerCommand = (commandName: string, handler: () => void, exposed?: boolean) => {}

/** 执行命令 */
export const executeCommand = (commandName: string, ...args: any[]) => {}

/** 获取所有可用的命令列表 */
export const getCommands = (filterInternal?: boolean): string[] => {
  return []
}
