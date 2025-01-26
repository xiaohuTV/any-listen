// import '@common/utils/rendererError'
import { mount } from 'svelte'
import { initWorkers } from './worker'

import 'virtual:svg-icons-register'
import './app.less'
import App from './App.svelte'
import { connectIPC, registerModules } from './modules'
import { initTooltips } from './components/apis/tooltips/global'
import { initNotify } from './components/apis/notify'

// import './components/base/VirtualizedList'
void initWorkers()

mount(App, {
  target: document.getElementById('root')!,
})
initNotify()

registerModules()
connectIPC()
initTooltips()
