import { create } from 'zustand'

function serializeLocation(from) {
  if (!from?.pathname) return null
  return {
    pathname: from.pathname,
    search: from.search || '',
    hash: from.hash || '',
  }
}

export const useModalStore = create((set) => ({
  active: null,
  authRedirect: null,
  registerDefaultRole: 'customer',
  /** 'shopper' | 'seller' — registration flow + brand panel (after role selection) */
  authPersona: 'shopper',
  /** 'role' = pick shopper vs seller; 'form' = registration fields */
  registerStep: 'role',
  /** When true (e.g. /register?role=seller), user cannot go back to role picker */
  registerSkipRoleSelect: false,

  openLogin: (opts) =>
    set({
      active: 'login',
      authRedirect: serializeLocation(opts?.from),
      registerDefaultRole: 'customer',
      /** Login is universal — role selection exists only on registration */
      authPersona: 'shopper',
    }),

  openRegister: (opts) => {
    const skipRole = opts?.role === 'seller'
    set({
      active: 'register',
      authRedirect: serializeLocation(opts?.from),
      registerDefaultRole: skipRole ? 'seller' : 'customer',
      authPersona: skipRole ? 'seller' : 'shopper',
      registerStep: skipRole ? 'form' : 'role',
      registerSkipRoleSelect: skipRole,
    })
  },

  openCart: () => set({ active: 'cart' }),

  closeModal: () =>
    set({
      active: null,
      authRedirect: null,
      registerStep: 'role',
      registerSkipRoleSelect: false,
    }),

  switchToRegister: () =>
    set({
      active: 'register',
      registerStep: 'role',
      registerSkipRoleSelect: false,
    }),

  switchToLogin: () => set({ active: 'login' }),

  selectRegisterPersona: (persona) =>
    set({
      registerStep: 'form',
      authPersona: persona === 'seller' ? 'seller' : 'shopper',
      registerDefaultRole: persona === 'seller' ? 'seller' : 'customer',
      registerSkipRoleSelect: false,
    }),

  backToRegisterRoleStep: () => set({ registerStep: 'role', registerSkipRoleSelect: false }),
}))
