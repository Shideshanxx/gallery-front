/**
 * 处理 navigationBar 中的数据 categories
 */
import { ALL_CATEGORY_ITEM } from '@/constants'
import { getCategory } from '@/api/category'
export default {
  // 独立作用域
  namespaced: true,
  state: () => {
    return {
      categorys: [ALL_CATEGORY_ITEM]
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
