import { cn } from '@/lib/cn'

export function Card({ className, children, glass }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-glamour-100 bg-white/90 p-6 shadow-card backdrop-blur-sm',
        glass && 'glass-panel border-white/50',
        className,
      )}
    >
      {children}
    </div>
  )
}
