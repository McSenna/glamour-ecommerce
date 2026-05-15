import { cn } from '@/lib/cn'

export function Badge({ children, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-glamour-100 px-3 py-1 text-xs font-medium text-glamour-700',
        className,
      )}
    >
      {children}
    </span>
  )
}
