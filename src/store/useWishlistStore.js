import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (productId) => {
        const has = get().ids.includes(productId)
        set({
          ids: has ? get().ids.filter((id) => id !== productId) : [...get().ids, productId],
        })
        return !has
      },
      has: (productId) => get().ids.includes(productId),
      clear: () => set({ ids: [] }),
    }),
    { name: 'glamour-wishlist', storage: createJSONStorage(() => localStorage) },
  ),
)
