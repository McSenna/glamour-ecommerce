import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { fetchServerCart, saveServerCart } from '@/services/cartApi'

const generateId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `line-${Date.now()}-${Math.random().toString(16).slice(2)}`

function mapLinesFromServer(lines) {
  return (lines || []).map((l) => ({
    lineId: l.lineId,
    productId: l.productId,
    name: l.name,
    price: l.price,
    image: l.image,
    shopId: l.shopId,
    shopName: l.shopName,
    variantKey: l.variantKey,
    slug: l.slug,
    quantity: l.quantity,
  }))
}

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      hydrateFromServer: async () => {
        try {
          const lines = await fetchServerCart()
          set({ items: mapLinesFromServer(lines) })
        } catch {
          /* not authenticated */
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
      setItems: (items) => set({ items: items || [] }),
      addItem: (item) => {
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
                ? { ...i, quantity: i.quantity + item.quantity }
                : i,
            ),
          })
          return existing.lineId
        }
        set({ items: [...get().items, { ...item, lineId: id, quantity: item.quantity || 1 }] })
        return id
      },
      updateQty: (lineId, quantity) => {
        if (quantity < 1) return get().removeLine(lineId)
        set({
          items: get().items.map((i) => (i.lineId === lineId ? { ...i, quantity } : i)),
        })
      },
      removeLine: (lineId) =>
        set({ items: get().items.filter((i) => i.lineId !== lineId) }),
      clear: () => set({ items: [] }),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0),
    }),
    { name: 'glamour-cart', storage: createJSONStorage(() => localStorage) },
  ),
)
