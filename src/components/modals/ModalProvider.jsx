import { Suspense, lazy, useEffect } from 'react'
import { useModalStore } from '@/store/useModalStore'

const LoginModal = lazy(() =>
  import('@/components/modals/LoginModal').then((m) => ({ default: m.LoginModal })),
)
const RegisterModal = lazy(() =>
  import('@/components/modals/RegisterModal').then((m) => ({ default: m.RegisterModal })),
)
const CartDrawer = lazy(() =>
  import('@/components/modals/CartDrawer').then((m) => ({ default: m.CartDrawer })),
)

export function ModalProvider({ children }) {
  const active = useModalStore((s) => s.active)
  const closeModal = useModalStore((s) => s.closeModal)

  useEffect(() => {
    if (!active) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, closeModal])

  return (
    <>
      {children}
      <Suspense fallback={null}>
        {active === 'login' ? <LoginModal /> : null}
        {active === 'register' ? <RegisterModal /> : null}
        {active === 'cart' ? <CartDrawer /> : null}
      </Suspense>
    </>
  )
}
