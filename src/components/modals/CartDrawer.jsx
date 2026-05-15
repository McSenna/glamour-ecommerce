import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { useMemo, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useModalStore } from '@/store/useModalStore'
import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/useAuthStore'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { ModalBackdrop } from '@/components/modals/ModalBackdrop'
import { Button } from '@/components/ui/Button'
import { CartItemCard } from '@/components/modals/cart/CartItemCard'
import { VoucherSection } from '@/components/modals/cart/VoucherSection'
import { CheckoutSummary } from '@/components/modals/cart/CheckoutSummary'
import { MobileBottomSheet } from '@/components/modals/cart/MobileBottomSheet'

function groupBySeller(items) {
  const map = new Map()
  for (const line of items) {
    const key = line.shopId || line.shopName || 'default'
    if (!map.has(key)) {
      map.set(key, { shopName: line.shopName || 'Seller', lines: [] })
    }
    map.get(key).lines.push(line)
  }
  return [...map.entries()].map(([id, g]) => ({ id, ...g }))
}

export function CartDrawer() {
  const navigate = useNavigate()
  const active = useModalStore((s) => s.active)
  const closeModal = useModalStore((s) => s.closeModal)
  const openLogin = useModalStore((s) => s.openLogin)
  const user = useAuthStore((s) => s.user)

  const items = useCartStore((s) => s.items)
  const updateQty = useCartStore((s) => s.updateQty)
  const removeLine = useCartStore((s) => s.removeLine)
  const subtotal = useCartStore((s) => s.subtotal())

  const [appliedCode, setAppliedCode] = useState(null)
  const panelRef = useRef(null)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const open = active === 'cart'

  useBodyScrollLock(open)
  useFocusTrap(panelRef, open)

  const discount = useMemo(() => {
    if (!appliedCode) return 0
    const c = appliedCode.toUpperCase()
    if (c === 'SAVE10') return Math.round(subtotal * 0.1 * 100) / 100
    return 0
  }, [appliedCode, subtotal])

  const shippingEstimate = items.length ? 4.99 : 0
  const itemCount = items.reduce((n, i) => n + (i.quantity || 0), 0)
  const groups = useMemo(() => groupBySeller(items), [items])

  const handleApplyVoucher = (code) => {
    if (!code) return
    const upper = code.toUpperCase()
    if (upper === 'SAVE10') {
      setAppliedCode('SAVE10')
      return
    }
    setAppliedCode(null)
  }

  const goCheckout = () => {
    if (!user) {
      openLogin({ from: { pathname: '/checkout', search: '', hash: '' } })
      closeModal()
      return
    }
    closeModal()
    navigate('/checkout')
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100] flex md:justify-end">
          <ModalBackdrop onClose={closeModal} />
          {isDesktop ? (
            <motion.aside
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-drawer-title"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 36 }}
              className="relative z-10 flex h-full min-h-0 w-full max-w-md flex-col border-l border-white/60 bg-white/97 shadow-[0_0_80px_-20px_rgba(28,25,23,0.35)] backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <header className="flex shrink-0 items-center justify-between border-b border-glamour-100/80 px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-glamour-500">Shopping cart</p>
                  <h2 id="cart-drawer-title" className="font-display text-xl text-glamour-950">
                    Your bag
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full p-2 text-glamour-500 transition hover:bg-glamour-100"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </header>
              <CartDrawerBody
                groups={groups}
                items={items}
                itemCount={itemCount}
                subtotal={subtotal}
                discount={discount}
                shippingEstimate={shippingEstimate}
                appliedCode={appliedCode}
                onRemove={removeLine}
                onQtyChange={updateQty}
                onApplyVoucher={handleApplyVoucher}
                onCheckout={goCheckout}
                onClose={closeModal}
                onContinueShopping={() => {
                  closeModal()
                  navigate('/shop')
                }}
              />
            </motion.aside>
          ) : (
            <div className="pointer-events-none fixed inset-0 z-10 flex flex-col justify-end p-0">
              <div className="pointer-events-auto flex justify-center px-0 pb-0 pt-8">
                <MobileBottomSheet dragHandle className="w-full max-w-lg">
                  <div
                    ref={panelRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="cart-sheet-title"
                    className="flex max-h-[min(88dvh,640px)] min-h-0 flex-1 flex-col"
                  >
                    <header className="flex shrink-0 items-center justify-between px-5 pb-2 pt-1">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-glamour-500">Cart</p>
                        <h2 id="cart-sheet-title" className="font-display text-lg text-glamour-950">
                          Your bag ({itemCount})
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="rounded-full p-2 text-glamour-500 transition hover:bg-glamour-100"
                        aria-label="Close cart"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </header>
                    <CartDrawerBody
                      groups={groups}
                      items={items}
                      itemCount={itemCount}
                      subtotal={subtotal}
                      discount={discount}
                      shippingEstimate={shippingEstimate}
                      appliedCode={appliedCode}
                      onRemove={removeLine}
                      onQtyChange={updateQty}
                      onApplyVoucher={handleApplyVoucher}
                      onCheckout={goCheckout}
                      onClose={closeModal}
                      onContinueShopping={() => {
                        closeModal()
                        navigate('/shop')
                      }}
                    />
                  </div>
                </MobileBottomSheet>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

function CartDrawerBody({
  groups,
  items,
  itemCount,
  subtotal,
  discount,
  shippingEstimate,
  appliedCode,
  onRemove,
  onQtyChange,
  onApplyVoucher,
  onCheckout,
  onClose,
  onContinueShopping,
}) {
  if (!items.length) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12 text-center">
        <p className="font-display text-xl text-glamour-900">Your cart is empty</p>
        <p className="max-w-xs text-sm text-glamour-600">Browse the shop and tap add to cart — your picks sync here instantly.</p>
        <Button type="button" onClick={onContinueShopping}>
          Continue shopping
        </Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-5 pb-4 pt-2">
        {groups.map((g) => (
          <section key={g.id}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-glamour-500">{g.shopName}</p>
            <div className="space-y-3">
              {g.lines.map((line) => (
                <CartItemCard key={line.lineId} line={line} onRemove={onRemove} onQtyChange={onQtyChange} />
              ))}
            </div>
          </section>
        ))}
        <VoucherSection onApply={onApplyVoucher} appliedCode={appliedCode} discountAmount={discount} />
        <div className="rounded-2xl border border-glamour-100 bg-glamour-50/60 p-4 text-xs text-glamour-600">
          <p className="font-semibold text-glamour-800">Shipping preview</p>
          <p className="mt-1">Standard delivery from ${shippingEstimate.toFixed(2)} — final rates at checkout.</p>
        </div>
      </div>
      <footer className="shrink-0 border-t border-glamour-100 bg-white/95 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 shadow-[0_-8px_24px_-12px_rgba(28,25,23,0.12)]">
        <CheckoutSummary
          subtotal={subtotal}
          discount={discount}
          shippingEstimate={shippingEstimate}
          itemCount={itemCount}
        />
        <Button type="button" size="lg" className="mt-4 w-full rounded-2xl" onClick={onCheckout}>
          Checkout
        </Button>
      </footer>
    </div>
  )
}
