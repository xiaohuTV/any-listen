import type { ResourceType } from '../shared'

export const getSourceId = <T extends ResourceType | undefined | null>(source: T) => {
  return (source ? `${source.extensionId}_${source.id}` : undefined) as T extends ResourceType ? `${string}_${string}` : undefined
}

export interface SourceType extends ResourceType {
  sId: string
}
