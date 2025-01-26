export const ENV_PARAMS = [
  'PORT',
  'BIND_IP',
  'CONFIG_PATH',
  'LOG_PATH',
  'DATA_PATH',
  'PROXY_HEADER',
  'MAX_SNAPSHOT_NUM',
  'LIST_ADD_MUSIC_LOCATION_TYPE',
  // 'AnyListen_USER_',
] as const

export const SPLIT_CHAR = {
  DISLIKE_NAME: '@',
  DISLIKE_NAME_ALIAS: '#',
} as const

export const File = {
  serverInfoJSON: 'serverInfo.json',
  clientInfoJSON: 'clientInfo.json',
} as const
