import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers.icode = '7d28c2e584177da353c5956c106f656f'
    //   if (store.getters.token) {
    //     // 如果token存在 注入token
    //     config.headers.Authorization = `Bearer ${store.getters.token}`
    //   }
    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
