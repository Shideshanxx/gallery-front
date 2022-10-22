/**
 * 处理 navigationBar 中的数据 categories
 */
import { ALL_CATEGORY_ITEM, CATEGORY_NOMAL_DATA } from '@/constants'
import { getCategory } from '@/api/category'
export default {
  // 独立作用域
  namespaced: true,
  state: () => {
    return {
      /**
       * 【问题】页面初始化或刷新数据时，categories栏数据闪烁
       * 1. 让 categorys 具备一个初始化数据
       * 2. 从服务端获取数据，替换初始化数据
       * 3. 为了防止数据太老，我们把每次获取到的数据作为下一次的初始化数据
       *    3.1 把每次从接口获取到的数据进行缓存
       *    3.2 在下一次运行时，把缓存的数据作为初始值
       */
      categorys: CATEGORY_NOMAL_DATA
    }
  },
  mutations: {
    setCategorys(state, newCategorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...newCategorys]
    }
  },
  actions: {
    async useCategoryData(context) {
      const { categorys } = await getCategory()
      context.commit('setCategorys', categorys)
    }
  }
}
