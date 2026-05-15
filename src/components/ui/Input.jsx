import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

export const Input = forwardRef(function Input({ className, label, error, ...props }, ref) {
  return (
    <label className="block w-full space-y-1.5">
      {label ? <span className="text-xs font-medium uppercase tracking-wide text-glamour-500">{label}</span> : null}
      <input
        ref={ref}
        className={cn(
          'w-full rounded-2xl border border-glamour-200/80 bg-white/80 px-4 py-3 text-sm text-glamour-900 shadow-sm outline-none transition focus:border-glamour-400 focus:ring-2 focus:ring-glamour-200/60',
          error && 'border-red-400 focus:border-red-500 focus:ring-red-100',
          className,
        )}
        {...props}
      />
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  )
})
