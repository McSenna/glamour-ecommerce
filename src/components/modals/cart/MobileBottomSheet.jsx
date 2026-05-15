import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

export function MobileBottomSheet({ children, className, dragHandle }) {
  return (
    <motion.div
      layout
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 420, damping: 38 }}
      className={cn(
        'flex max-h-[min(92dvh,720px)] w-full flex-col overflow-hidden rounded-t-3xl border border-white/70 bg-white/97 shadow-[0_-12px_48px_-12px_rgba(28,25,23,0.2)] backdrop-blur-xl',
        className,
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {dragHandle ? (
        <div className="flex justify-center pt-3 pb-1" aria-hidden>
          <div className="h-1 w-10 rounded-full bg-glamour-200" />
        </div>
      ) : null}
      {children}
    </motion.div>
  )
}
