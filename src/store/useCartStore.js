import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { scheduleServerCartSync } from '@/lib/cartSyncScheduler'
import { fetchServerCart, saveServerCart } from '@/services/cartApi'
import { mapLinesFromServer, normalizeCartAddPayload } from '@/store/cartLineUtils'

const generateId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `line-${Date.now()}-${Math.random().toString(16).slice(2)}`

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      hydrateFromServer: async () => {
        try {
          const lines = await fetchServerCart()
          set({ items: mapLinesFromServer(lines) })
        } catch {
          /* not authenticated or network */
        }
      },
      syncToServer: async () => {
        try {
          const lines = get().items.map((i) => ({
            productId: i.productId,
            shopId: i.shopId,
            quantity: i.quantity,
            variantSku: i.variantKey === 'default' ? undefined : i.variantKey,
          }))
          const serverLines = await saveServerCart(lines)
          set({ items: mapLinesFromServer(serverLines) })
        } catch {
          /* ignore */
        }
      },
      setItems: (items) => set({ items: mapLinesFromServer(items) }),
      addItem: (raw) => {
        const item = normalizeCartAddPayload(raw)
        if (!item) return null
        const id = item.lineId || generateId()
        const existing = get().items.find(
          (i) =>
            i.productId === item.productId &&
            i.variantKey === item.variantKey &&
            i.shopId === item.shopId,
        )
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.lineId === existing.lineId
                ? {
                    ...i,
                    quantity: Math.min(999, (i.quantity || 1) + item.quantity),
                  }
                : i,
            ),
          })
          scheduleServerCartSync()
          return existing.lineId
        }
        set({ items: [...get().items, { ...item, lineId: id }] })
        scheduleServerCartSync()
        return id
      },
      updateQty: (lineId, quantity) => {
        const n = Math.floor(Number(quantity))
        if (!Number.isFinite(n) || n < 1) return get().removeLine(lineId)
        const clamped = Math.min(999, n)
        set({
          items: get().items.map((i) => (i.lineId === lineId ? { ...i, quantity: clamped } : i)),
        })
        scheduleServerCartSync()
      },
      removeLine: (lineId) => {
        set({ items: get().items.filter((i) => i.lineId !== lineId) })
        scheduleServerCartSync()
      },
      clear: () => set({ items: [] }),
      subtotal: () =>
        get().items.reduce(
          (sum, i) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 1),
          0,
        ),
    }),
    { name: 'glamour-cart', storage: createJSONStorage(() => localStorage) },
  ),
)
