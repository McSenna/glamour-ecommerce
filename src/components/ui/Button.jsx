import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

const variants = {
  primary:
    'bg-glamour-900 text-white shadow-card hover:bg-glamour-800 active:scale-[0.99]',
  ghost: 'bg-white/70 text-glamour-800 hover:bg-white border border-glamour-200/80',
  subtle: 'bg-glamour-100 text-glamour-900 hover:bg-glamour-200',
  danger: 'bg-red-600 text-white hover:bg-red-500',
}

export const Button = forwardRef(function Button(
  { className, variant = 'primary', size = 'md', loading, disabled, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-6 py-2.5 text-sm',
        size === 'lg' && 'px-8 py-3 text-base',
        className,
      )}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      ) : null}
      {children}
    </button>
  )
})
