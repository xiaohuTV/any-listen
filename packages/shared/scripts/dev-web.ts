process.env.NODE_ENV = 'development'
process.env.MODE = 'web'
// process.env.VITE_CJS_TRACE = 'true'
process.env.VITE_CJS_IGNORE_WARNING = 'true'

void import('./bundler/runner-web')
