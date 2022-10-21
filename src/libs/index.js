import { defineAsyncComponent } from 'vue'

export default {
  install(app) {
    // 1. 获取当前路径下所有文件夹中的 index.vue
    const components = import.meta.glob('./*/index.vue')
    // 2. 遍历获取到的组件模块
    for (const [fullPath, fn] of Object.entries(components)) {
      const componentName = 'm-' + fullPath.replace('./', '').split('/')[0]
      // 3. 用 defineAsyncComponent 创建异步组件，并利用 app.component 进行注册
      app.component(componentName, defineAsyncComponent(fn))
    }
  }
}
