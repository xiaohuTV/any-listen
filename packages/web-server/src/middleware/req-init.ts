export default async (ctx: AnyListen.RequestContext, next: AnyListen.Next): Promise<unknown> => {
  // TODO proxy.header
  ctx.userIp = (ctx.headers['x-real-ip'] as string | undefined) ?? ctx.ip
  ctx.now = Date.now()
  return next()
}
