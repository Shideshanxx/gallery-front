<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul
      ref="ulTarget"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    >
      <!-- 滑块 -->
      <li
        :style="sliderStyle"
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200"
      ></li>
      <!-- 汉堡按钮 -->
      <li
        class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white z-20 shadow-l-white"
      >
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
      </li>
      <li
        v-for="(item, index) in data"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{
          'text-zinc-100': currentCategoryIndex === index
        }"
        :ref="setItemRef"
        @click="onItemClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onBeforeUpdate, watch } from 'vue'
import { useScroll } from '@vueuse/core'

// vite 构建的项目中，我们可以直接使用 defineProps 方法
defineProps({
  data: {
    type: Array,
    required: true
  }
})

// 滑块初始样式
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'
})

// 选中 item 下标
const currentCategoryIndex = ref(0)

// 获取所有的 item 元素
let itemRefs = []
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}

// 数据改变之后，DOM 变化之前
onBeforeUpdate(() => {
  // 清空 itemRefs
  itemRefs = []
})

// 获 ul 元素
const ulTarget = ref(null)

// 通过 vueuse 提供的 useScroll API 获取响应式的 scroll 距离
const { x: ulScrollLeft } = useScroll(ulTarget)

// 监听当前 categoryIndex 的变化
watch(currentCategoryIndex, (val) => {
  const { left, width } = itemRefs[val].getBoundingClientRect()
  sliderStyle.value = {
    // 滑块的位置 = ul 横向滚动的距离 + 当前元素的left - ul 的padding
    transform: `translateX(${ulScrollLeft.value + left - 10 + 'px'})`,
    width: width + 'px'
  }
})

// item 点击事件
const onItemClick = (index) => {
  currentCategoryIndex.value = index
}
</script>

<style lang="scss" scoped></style>
