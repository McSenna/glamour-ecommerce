import { create } from 'zustand'

export const useNotificationStore = create((set, get) => ({
  items: [],
  unread: 0,
  push: (n) =>
    set({
      items: [{ id: crypto.randomUUID?.() ?? String(Date.now()), ...n }, ...get().items].slice(
        0,
        50,
      ),
      unread: get().unread + (n.read ? 0 : 1),
    }),
  markAllRead: () => set({ unread: 0, items: get().items.map((i) => ({ ...i, read: true })) }),
  clear: () => set({ items: [], unread: 0 }),
}))
