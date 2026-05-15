import { flushServerCartSync } from '@/lib/cartSyncScheduler'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { authTokens } from '@/lib/authTokens'
import { api } from '@/lib/api'

const initial = {
  user: null,
  accessToken: null,
  refreshToken: null,
}

export const useAuthStore = create(
  persist(
    (set, get) => ({
      ...initial,
      setTokens: ({ accessToken, refreshToken }) => {
        authTokens.setTokens(accessToken, refreshToken)
        set({ accessToken, refreshToken })
      },
      setUser: (user) => set({ user }),
      login: async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password })
        get().setTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
        set({ user: data.user })
        flushServerCartSync()
        const { useCartStore } = await import('@/store/useCartStore')
        useCartStore.getState().clear()
        await useCartStore.getState().hydrateFromServer()
        return data.user
      },
      register: async (payload) => {
        const { data } = await api.post('/auth/register', payload)
        get().setTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
        set({ user: data.user })
        flushServerCartSync()
        const { useCartStore } = await import('@/store/useCartStore')
        useCartStore.getState().clear()
        await useCartStore.getState().hydrateFromServer()
        return data.user
      },
      fetchProfile: async () => {
        const { data } = await api.get('/auth/me')
        set({ user: data.user })
        return data.user
      },
      logout: () => {
        flushServerCartSync()
        authTokens.clear()
        set({ ...initial })
        import('@/store/useCartStore').then((m) => m.useCartStore.getState().clear())
        import('@/store/useCheckoutStore').then((m) => m.useCheckoutStore.getState().reset())
      },
    }),
    {
      name: 'glamour-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        user: s.user,
        accessToken: s.accessToken,
        refreshToken: s.refreshToken,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.accessToken && state?.refreshToken) {
          authTokens.setTokens(state.accessToken, state.refreshToken)
        }
      },
    },
  ),
)
