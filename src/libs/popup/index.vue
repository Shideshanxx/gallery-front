<template>
  <div>
    <teleport to="body">
      <transition name="fade">
        <div
          v-if="isOpen"
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
          @click="isOpen = false"
        ></div>
      </transition>
      <transition name="popup-down-up">
        <div
          v-if="isOpen"
          v-bind="$attrs"
          class="w-screen bg-white z-50 fixed bottom-0"
        >
          <slot />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { useScrollLock, useVModel } from '@vueuse/core'
import { watch } from 'vue'

const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  }
})

// 通过 useVModel 获取到响应式数据 isOpen，当 isOpen 改变时，会自动触发 update:modelValue，不需要手动触发
const isOpen = useVModel(props)

// 锁定滚动
// const isLocked = useScrollLock(document.body)
// watch(
//   isOpen,
//   (val) => {
//     isLocked.value = val
//   },
//   {
//     immediate: true
//   }
// )
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
// 准备进入和离开完成
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}
.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
