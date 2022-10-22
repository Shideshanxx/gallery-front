<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referenceTarget">
      <!-- 具名插槽：触发弹层的视图 -->
      <slot name="reference" />
    </div>
    <!-- 气泡展示 -->
    <transition name="slide">
      <div
        v-show="isVisible"
        ref="contentTarget"
        class="absolute p-1 z-20 bg-white border rounded-md"
        :style="contentStyle"
      >
        <!-- 匿名插槽：弹出层视图中展示的内容 -->
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
// 左上
const PROP_TOP_LEFT = 'top-left'
// 右上
const PROP_TOP_RIGHT = 'top-right'
// 左下
const PROP_BOTTOM_LEFT = 'bottom-left'
// 右下
const PROP_BOTTOM_RIGHT = 'bottom-right'

const positionEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]

// 延迟关闭时间
const DELAY_TIME = 100
</script>

<script setup>
import { ref, nextTick, watch } from 'vue'
/**
 * 1. 指定可选位置的常量，并生成enum
 * 2. 通过 prop 控制指定位置
 * 3. 获取元素DOM，创建读取元素尺寸的方法
 * 4. 生成气泡的样式对象，用来控制每个位置对应的样式
 * 5. 根据prop 计算样式对象
 */

const props = defineProps({
  // 控制气泡弹出位置，给出开发者错误提示
  position: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator(val) {
      const result = positionEnum.includes(val)
      if (!result) {
        throw new Error(
          `你的 position 必须是 ${positionEnum.join('、')} 中的一个`
        )
      }
      return result
    }
  }
})

/**
 * 气泡显示与隐藏
 * 问题分析：当鼠标慢速移动到视图与气泡之间的空隙，会触发 mouseleave 事件，导致气泡隐藏，无法选中气泡中的内容。
 * 解决方式：【类似于防抖】当鼠标刚离开时，不立刻修改 isVisible，而是延迟一段时间；如果在这段时间内，再次触发了鼠标移入事件，则不修改 isVisible
 */
const isVisible = ref(false)
let timer
const onMouseenter = () => {
  isVisible.value = true
  if (timer) {
    clearTimeout(timer)
  }
}
const onMouseleave = () => {
  timer = setTimeout(() => {
    isVisible.value = false
    timer = null
  }, DELAY_TIME)
}

/**
 * 计算元素尺寸
 */
const referenceTarget = ref(null)
const contentTarget = ref(null)
const useElementSize = (target) => {
  if (!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}

// 气泡样式
const contentStyle = ref({
  top: 0,
  left: 0
})

// 计算样式：期望气泡展示的时候再进行计算
watch(isVisible, (val) => {
  if (!val) return
  // 在nextTick中获取渲染之后的DOM（但是气泡是通过v-show控制的，也可以直接获取到）
  nextTick(() => {
    switch (props.position) {
      // 左上
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + 'px'
        break
      // 右上
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          useElementSize(referenceTarget.value).width + 'px'
        break
      // 左下
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + 'px'
        break
      // 右下
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          useElementSize(referenceTarget.value).width + 'px'
        break
    }
  })
})
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
