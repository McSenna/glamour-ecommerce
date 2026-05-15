import { useEffect, useRef } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { useCartStore } from '@/store/useCartStore'

export function CartSyncBridge() {
  const user = useAuthStore((s) => s.user)
  const timer = useRef(null)

  useEffect(() => {
    if (!user) return undefined
    const unsub = useCartStore.subscribe(() => {
      clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        void useCartStore.getState().syncToServer()
      }, 480)
    })
    return () => {
      clearTimeout(timer.current)
      unsub()
    }
  }, [user])

  return null
}
