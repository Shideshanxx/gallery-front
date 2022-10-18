import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

/**
 * 判断当前是否为移动设备，判断依据：屏幕宽度是否小于一个指定宽度（1280）
 * 也可以通过正则来匹配 navigator.userAgent
 */
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})

/**
 * 动态设置rem值：根据用户的屏幕宽度进行计算，把计算出来的值设为html根标签的fontsize大小
 */
export const useREM = () => {
  // 定义最大的 fontsize
  const MAX_FONT_SIZE = 40
  // 监听 html 解析完成事件
  document.addEventListener('DOMContentLoaded', () => {
    // 拿到 html 标签
    const html = document.querySelector('html')
    // 计算 fontsize：按照 屏幕宽度/10 来计算
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize

    // 赋值给 html
    html.style.fontSize = fontSize + 'px'
  })
}
