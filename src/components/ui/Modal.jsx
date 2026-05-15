import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'

export function Modal({ open, onClose, title, children, className }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-glamour-950/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className={cn(
              'relative z-10 w-full max-w-lg rounded-3xl border border-white/60 bg-white/95 p-8 shadow-soft',
              className,
            )}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <h2 className="font-display text-2xl text-glamour-900">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-glamour-500 transition hover:bg-glamour-100 hover:text-glamour-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
