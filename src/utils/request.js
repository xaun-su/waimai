import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/use.js'
import { ElMessage } from 'element-plus' // 导入 ElMessage 组件
// 定义基础URL，方便后续维护和修改
export const baseURL = 'http://8.137.157.16:9002/api'

// 创建axios实例，可以自定义配置
const request = axios.create({
 baseURL, // 基础URL
 timeout: 10000 // 请求超时时间，设置为5秒，可以根据实际情况调整
})

// 添加请求拦截器
request.interceptors.request.use(
 (config) => {
   // 在发送请求之前做些什么，例如添加token
   // TODO 1. 当第一个请求开始时显示Loading
   // 可以使用 element-plus 的 loading 组件，这里省略具体实现

   // TODO 2. 携带token
   const userStore = useUserStore() // 获取用户状态管理 store
   const token = userStore.token // 从 store 中获取 token

   // 如果存在 token，则添加到请求头中
   if (token) {
     config.headers.Authorization = 'Bearer ' + token
   }

   return config // 必须返回 config，否则请求将无法发送
 },
 (err) => {
   // 请求错误处理
   console.error('请求错误：', err)
   return Promise.reject(err) // 必须 reject，否则后续请求会认为成功
 }
)

// 添加响应拦截器
request.interceptors.response.use(
 (res) => {
   // 2xx 范围内的状态码都会触发该函数。
   // 对响应数据做点什么
   // 统一处理响应状态码，方便后续判断
   if (!res.data.code) {
     res.data.code = 0 // 默认code为0，表示成功
   }

   if (res.data.code === 0) {
     // 请求成功
     // TODO 4. 摘取核心响应数据 (可以根据项目需求，只返回核心数据)
     return res // 直接返回完整响应，可以根据需要修改
   } else {
     // TODO 3. 处理业务失败
     // 业务逻辑错误，例如用户名密码错误等
     ElMessage.error(res.data.msg || '服务器异常') // 使用 Element Plus 的 message 组件提示错误信息
     return Promise.reject(res.data) // 必须 reject，否则后续请求会认为成功
   }
 },
 (err) => {
   // 超出 2xx 范围的状态码都会触发该函数。
   // 处理响应错误
   // TODO 5. 处理401错误---权限不足--token过期
   if (err.response?.status === 401) {
     // 未授权，token过期
     const router = useRouter() // 获取路由实例
     // 跳转到登录页面，并携带当前页面的路径，方便登录后跳转回来
     router.push({
       path: '/login',
       query: { redirect: router.currentRoute.value.fullPath }
     })
     ElMessage.warning('登录已过期，请重新登录') // 提示用户重新登录
   } else {
     // 默认错误处理
     ElMessage.error(err.response?.data?.msg || '服务器异常') // 使用 Element Plus 的 message 组件提示错误信息
   }
   console.error('响应错误：', err)
   return Promise.reject(err) // 必须 reject，否则后续请求会认为成功
 }
)

// 导出 axios 实例
export default request
