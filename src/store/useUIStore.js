import { create } from 'zustand'

export const useUIStore = create((set) => ({
  mobileNavOpen: false,
  theme: 'light',
  setMobileNav: (open) => set({ mobileNavOpen: open }),
  toggleTheme: () =>
    set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
}))
