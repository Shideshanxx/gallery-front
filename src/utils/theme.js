import { watch } from 'vue'
import store from '../store'
import { THEME_LIGHT, THEME_DARK } from '../constants'

export default () => {
  watch(
    () => store.getters.themeType,
    (val) => {
      let themeClassName = ''
      switch (val) {
        case THEME_LIGHT:
          themeClassName = 'light'
          break
        case THEME_DARK:
          themeClassName = 'dark'
          break
        default:
          break
      }
      // 修改 html 的 class
      document.querySelector('html').className = themeClassName
    },
    { immediate: true }
  )
}
