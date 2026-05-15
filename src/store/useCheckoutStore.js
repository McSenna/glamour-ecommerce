import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useCheckoutStore = create(
  persist(
    (set) => ({
      shippingAddress: null,
      couponCode: '',
      paymentMethod: 'gcash',
      setShipping: (shippingAddress) => set({ shippingAddress }),
      setCoupon: (couponCode) => set({ couponCode }),
      setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
      reset: () =>
        set({
          shippingAddress: null,
          couponCode: '',
          paymentMethod: 'gcash',
        }),
    }),
    {
      name: 'glamour-checkout',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (s) => ({
        shippingAddress: s.shippingAddress,
        couponCode: s.couponCode,
        paymentMethod: s.paymentMethod,
      }),
    },
  ),
)
