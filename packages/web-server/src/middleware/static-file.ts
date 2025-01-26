import { joinPath } from '@any-listen/nodejs'
import { sendFileStream } from './shared/stream-file'
import { API_PREFIX } from '@any-listen/common/constants'

const mediaPath = '/public/medias/'
const maxAge = 60 * 86400

let publicDir = joinPath(__dirname, '../public')
if (import.meta.env.DEV) publicDir = joinPath(__dirname, 'public')

export default async (ctx: AnyListen.RequestContext, next: AnyListen.Next): Promise<unknown> => {
  if (ctx.method == 'HEAD' || ctx.method == 'GET') {
    if (ctx.path.startsWith(mediaPath)) {
      const fileName = ctx.path.substring(mediaPath.length)
      const rawPath = global.anylisten.publicStaticPaths.get(fileName)
      if (rawPath) {
        return sendFileStream(ctx, rawPath, {
          hidden: false,
          maxAge,
          immutable: true,
          public: true,
        })
      }
    } else {
      if (!ctx.path.startsWith(API_PREFIX)) {
        let path = ctx.path
        if (path.endsWith('/')) path += 'index.html'
        const filePath = joinPath(publicDir, path)
        if (filePath.startsWith(publicDir)) {
          return sendFileStream(ctx, filePath, {
            hidden: false,
            maxAge,
            immutable: true,
            public: true,
          })
        }
      }
    }
  }
  return next()
}
