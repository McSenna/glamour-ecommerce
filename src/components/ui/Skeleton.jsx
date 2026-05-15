import { cn } from '@/lib/cn'

export function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-2xl bg-gradient-to-r from-glamour-100 via-glamour-50 to-glamour-100 bg-[length:200%_100%]',
        className,
      )}
    />
  )
}
