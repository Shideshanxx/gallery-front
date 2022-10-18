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