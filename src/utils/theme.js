import { watch } from 'vue'
import store from '../store'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '../constants'

/**
 * 监听系统主题变更
 */
let matchMedia
const watchSystemThemeChange = () => {
  // 只需初始化一次
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  // 监听主题变化
  matchMedia.onchange = () => {
    changeTheme(THEME_SYSTEM)
  }
}

/**
 * 变更主题
 * @param {*} theme
 */
const changeTheme = (theme) => {
  let themeClassName = ''
  switch (theme) {
    case THEME_LIGHT:
      themeClassName = 'light'
      break
    case THEME_DARK:
      themeClassName = 'dark'
      break
    case THEME_SYSTEM:
      watchSystemThemeChange()
      themeClassName = matchMedia.matches ? 'dark' : 'light'
      break
    default:
      break
  }
  // 修改 html 的 class
  document.querySelector('html').className = themeClassName
}

/**
 * 初始化主题
 */
export default () => {
  watch(
    () => store.getters.themeType,
    (val) => {
      changeTheme(val)
    },
    { immediate: true }
  )
}
