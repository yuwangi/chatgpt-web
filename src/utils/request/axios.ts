import axios, { type AxiosResponse } from 'axios'
import { useAuthStore } from '@/store'
import { getUserIP } from '@/utils/crypto/index'

const service = axios.create({
  baseURL: import.meta.env.VITE_GLOB_API_URL,
})
let curIP = ''

service.interceptors.request.use(
  (config) => {
    // console.log('config', config)
    if (config?.url?.includes('chat-bing-api'))
      config.baseURL = ''
    if (config?.url?.includes('proxy-api'))
      config.baseURL = ''

    getUserIP((ip) => {
      curIP = ip
    })
    if (curIP)
      config.headers['User-Ip'] = curIP
    const token = useAuthStore().token
    if (token)
      config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.status === 200)
      return response

    throw new Error(response.status.toString())
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default service
