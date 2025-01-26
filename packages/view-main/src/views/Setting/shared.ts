
export const viewTypes = ['app', 'extension'] as const

export type ViewType = typeof viewTypes[number]
