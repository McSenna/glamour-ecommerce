import { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/cn'

export const PasswordInput = forwardRef(function PasswordInput(
  { className, label = 'Password', error, id, autoComplete, ...props },
  ref,
) {
  const [visible, setVisible] = useState(false)
  const inputId = id || props.name || 'password'

  return (
    <div className="w-full space-y-1.5">
      {label ? (
        <label htmlFor={inputId} className="block text-xs font-medium uppercase tracking-wide text-glamour-500">
          {label}
        </label>
      ) : null}
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          autoComplete={autoComplete}
          type={visible ? 'text' : 'password'}
          className={cn(
            'w-full rounded-2xl border border-glamour-200/80 bg-white/80 py-3 pl-4 pr-12 text-sm text-glamour-900 shadow-sm outline-none transition focus:border-glamour-400 focus:ring-2 focus:ring-glamour-200/60',
            error && 'border-red-400 focus:border-red-500 focus:ring-red-100',
            className,
          )}
          {...props}
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-glamour-500 transition hover:bg-glamour-100 hover:text-glamour-800"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </div>
  )
})
