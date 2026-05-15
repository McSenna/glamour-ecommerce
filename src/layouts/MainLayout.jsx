import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { FloatingDock } from '@/components/layout/FloatingDock'
import { MobileDrawer } from '@/components/layout/MobileDrawer'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { ModalProvider } from '@/components/modals/ModalProvider'
import { CartSyncBridge } from '@/components/cart/CartSyncBridge'
import { useAuthStore } from '@/store/useAuthStore'
import { useCartStore } from '@/store/useCartStore'

export function MainLayout() {
  const accessToken = useAuthStore((s) => s.accessToken)

  useEffect(() => {
    if (!accessToken) return undefined
    let cancelled = false
    ;(async () => {
      try {
        await useAuthStore.getState().fetchProfile()
        if (!cancelled) await useCartStore.getState().hydrateFromServer()
      } catch {
        /* session invalid */
      }
    })()
    return () => {
      cancelled = true
    }
  }, [accessToken])

  return (
    <ModalProvider>
      <CartSyncBridge />
      <div className="flex min-h-dvh flex-col bg-gradient-to-b from-glamour-50 via-white to-glamour-50">
        <SiteHeader />
        <MobileDrawer />
        <main className="flex-1 pb-24 sm:pb-0">
          <Outlet />
        </main>
        <SiteFooter />
        <FloatingDock />
      </div>
    </ModalProvider>
  )
}
