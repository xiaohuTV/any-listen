import { onThemeChanged } from '@/shared/ipc/theme'
import { themeState } from './state'
import * as commit from './commit'

export const applyTheme = (colors: AnyListen.ThemeSetting['colors']) => {
  window.setTheme(colors)
}

export const setThemePreview = (preview: boolean) => {
  commit.setThemePreview(preview)
}

export const themePreview = (colors: AnyListen.ThemeSetting['colors'] | null) => {
  if (colors) {
    applyTheme(colors)
    setThemePreview(true)
  } else {
    applyTheme(themeState.theme.colors)
    setThemePreview(false)
  }
}

export const registerRemoteThemeAction = () => {
  return onThemeChanged((theme) => {
    commit.updateTheme(theme)
    if (themeState.themePreview) return
    applyTheme(theme.colors)
  })
}

export { getThemeSetting, getThemeList } from '@/shared/ipc/theme'
