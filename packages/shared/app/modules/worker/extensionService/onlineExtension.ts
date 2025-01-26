export const getOnlineExtensionList = async (
  filter: AnyListen.IPCExtension.OnlineListFilterOptions
): Promise<AnyListen.IPCExtension.OnlineListResult> => {
  return {
    total: 0,
    page: filter.page,
    limit: filter.limit,
    list: [],
  }
}
