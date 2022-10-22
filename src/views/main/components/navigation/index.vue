<template>
  <mobile-navigation-vue v-if="isMobileTerminal" />
  <pc-navigation-vue v-else />
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import mobileNavigationVue from './mobile/index.vue'
import pcNavigationVue from './pc/index.vue'
import { useStore } from 'vuex'

const store = useStore()
// 派发 action，获取 category 数据
store.dispatch('category/useCategoryData')
</script>

<style lang="scss" scoped></style>
