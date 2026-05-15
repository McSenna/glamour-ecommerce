import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useRef } from 'react'
import { cn } from '@/lib/cn'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { ModalBackdrop } from '@/components/modals/ModalBackdrop'

export function BaseModal({ open, onClose, title, subtitle, children, className, mobileFullScreen }) {
  const panelRef = useRef(null)
  useBodyScrollLock(open)
  useFocusTrap(panelRef, open)

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4">
          <ModalBackdrop onClose={onClose} />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, y: mobileFullScreen ? 48 : 24, scale: mobileFullScreen ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className={cn(
              'relative z-10 flex max-h-[min(92dvh,920px)] w-full flex-col overflow-hidden border border-white/70 bg-white/95 shadow-[0_24px_80px_-24px_rgba(28,25,23,0.35)] backdrop-blur-xl',
              mobileFullScreen
                ? 'h-[100dvh] max-h-[100dvh] rounded-none sm:h-auto sm:max-h-[min(90dvh,880px)] sm:rounded-2xl'
                : 'max-w-md rounded-2xl sm:rounded-3xl',
              className,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={cn(
                'flex shrink-0 items-start justify-between gap-4 border-b border-glamour-100/80 px-5 pb-4 pt-5 sm:px-7 sm:pt-6',
                mobileFullScreen && 'pt-[max(1.25rem,env(safe-area-inset-top))]',
              )}
            >
              <div>
                <h2 id="modal-title" className="font-display text-xl text-glamour-950 sm:text-2xl">
                  {title}
                </h2>
                {subtitle ? <p className="mt-1 text-xs text-glamour-500 sm:text-sm">{subtitle}</p> : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-glamour-500 transition hover:bg-glamour-100 hover:text-glamour-800"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6">
              {children}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
