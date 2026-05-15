import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useRef } from 'react'
import { cn } from '@/lib/cn'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useFocusTrap } from '@/hooks/useFocusTrap'

function AuthBackdrop({ onClose }) {
  return (
    <motion.button
      type="button"
      aria-label="Close dialog"
      className="absolute inset-0 bg-glamour-950/55 backdrop-blur-md transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    />
  )
}

/**
 * Minimal centered auth dialog — no theme toggle, no split marketing column.
 */
export function AuthLayout({
  open,
  onClose,
  variant: _variant = 'login',
  titleId,
  children,
  footerSlot,
  brandPersona: _brandPersona = 'universal',
  rightTagline: _rightTagline,
}) {
  const panelRef = useRef(null)

  useBodyScrollLock(open)
  useFocusTrap(panelRef, open)

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
          <AuthBackdrop onClose={onClose} />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
            className={cn(
              'relative z-10 flex max-h-[min(88dvh,620px)] w-full max-w-[400px] flex-col overflow-hidden',
              'rounded-2xl border border-glamour-200/80 bg-white/95 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.25)]',
              'ring-1 ring-black/4',
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-glamour-100 px-5 py-4">
              <p className="font-display text-lg tracking-tight text-glamour-950">Glamour</p>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-glamour-500 transition hover:bg-glamour-100 hover:text-glamour-900"
                aria-label="Close"
              >
                <X className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-5 py-5 scrollbar-none">
              {children}
            </div>

            {footerSlot ? (
              <div className="shrink-0 border-t border-glamour-100 bg-glamour-50/50 px-5 py-3">{footerSlot}</div>
            ) : null}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

export function AuthTrustStrip() {
  return (
    <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[11px] font-medium text-glamour-500">
      <span className="inline-flex items-center gap-1">
        <span className="h-1 w-1 rounded-full bg-emerald-500" aria-hidden />
        Secure session
      </span>
      <span className="text-glamour-300" aria-hidden>
        ·
      </span>
      <span>Encrypted checkout-ready account</span>
    </p>
  )
}
