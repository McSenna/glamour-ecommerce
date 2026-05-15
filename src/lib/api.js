import axios from 'axios'
import { authTokens } from '@/lib/authTokens'

const baseURL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '/api'

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = authTokens.getAccess()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let refreshPromise = null

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    const status = error.response?.status
    if (status === 401 && !original._retry) {
      original._retry = true
      const refresh = authTokens.getRefresh()
      if (!refresh) {
        const { useAuthStore } = await import('@/store/useAuthStore')
        useAuthStore.getState().logout()
        return Promise.reject(error)
      }
      try {
        if (!refreshPromise) {
          refreshPromise = axios
            .post(`${baseURL}/auth/refresh`, { refreshToken: refresh })
            .finally(() => {
              refreshPromise = null
            })
        }
        const { data } = await refreshPromise
        const { useAuthStore } = await import('@/store/useAuthStore')
        useAuthStore.getState().setTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
        original.headers.Authorization = `Bearer ${data.accessToken}`
        return api(original)
      } catch {
        const { useAuthStore } = await import('@/store/useAuthStore')
        useAuthStore.getState().logout()
      }
    }
    return Promise.reject(error)
  },
)
