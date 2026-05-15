import { forwardRef, useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/cn'

export const AuthTextField = forwardRef(function AuthTextField(
  {
    className,
    label,
    error,
    icon: Icon,
    type = 'text',
    theme = 'light',
    ...props
  },
  ref,
) {
  const id = useId()
  const dark = theme === 'dark'

  return (
    <div className={cn('relative w-full', className)}>
      {Icon ? (
        <span
          className={cn(
            'pointer-events-none absolute left-4 top-1/2 z-[1] -translate-y-1/2 transition-colors',
            dark ? 'text-white/45' : 'text-glamour-400',
          )}
          aria-hidden
        >
          <Icon className="h-[18px] w-[18px] stroke-[1.75]" />
        </span>
      ) : null}
      <input
        ref={ref}
        id={id}
        type={type}
        placeholder=" "
        className={cn(
          'peer w-full rounded-xl border bg-clip-padding pb-2.5 pt-[22px] text-[15px] font-medium outline-none transition-all duration-200',
          'focus:ring-[3px] focus:ring-offset-0',
          Icon ? 'pl-11 pr-4' : 'px-4',
          dark
            ? 'border-white/[0.08] bg-white/[0.06] text-white placeholder:text-transparent focus:border-amber-400/35 focus:bg-white/[0.09] focus:shadow-[0_0_0_1px_rgba(251,191,36,0.15),0_0_24px_-4px_rgba(251,146,60,0.35)] focus:ring-amber-500/25'
            : 'border-glamour-200/70 bg-glamour-50/80 text-glamour-900 placeholder:text-transparent focus:border-amber-400/50 focus:bg-white focus:shadow-[0_0_0_1px_rgba(251,191,36,0.2),0_8px_28px_-12px_rgba(234,88,12,0.18)] focus:ring-amber-400/20',
          error &&
            (dark
              ? 'border-red-400/50 focus:border-red-400/60 focus:ring-red-500/20'
              : 'border-red-400/80 focus:border-red-500 focus:ring-red-100'),
        )}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          'pointer-events-none absolute top-1/2 origin-left -translate-y-1/2 text-[15px] transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-[13px] peer-focus:-translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-[13px] peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-semibold',
          Icon ? 'left-11' : 'left-4',
          dark
            ? 'text-white/50 peer-focus:text-amber-200/90 peer-[:not(:placeholder-shown)]:text-amber-200/80'
            : 'text-glamour-500 peer-focus:text-amber-700/90 peer-[:not(:placeholder-shown)]:text-glamour-600',
        )}
      >
        {label}
      </label>
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 text-xs font-medium text-red-500 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
})

export const AuthPasswordField = forwardRef(function AuthPasswordField(
  { className, label = 'Password', error, theme = 'light', autoComplete, ...props },
  ref,
) {
  const id = useId()
  const [visible, setVisible] = useState(false)
  const dark = theme === 'dark'

  return (
    <div className={cn('relative w-full', className)}>
      <input
        ref={ref}
        id={id}
        type={visible ? 'text' : 'password'}
        autoComplete={autoComplete}
        placeholder=" "
        className={cn(
          'peer w-full rounded-xl border bg-clip-padding pb-2.5 pl-4 pr-12 pt-[22px] text-[15px] font-medium outline-none transition-all duration-200',
          'focus:ring-[3px] focus:ring-offset-0',
          dark
            ? 'border-white/[0.08] bg-white/[0.06] text-white placeholder:text-transparent focus:border-amber-400/35 focus:bg-white/[0.09] focus:shadow-[0_0_0_1px_rgba(251,191,36,0.15),0_0_24px_-4px_rgba(251,146,60,0.35)] focus:ring-amber-500/25'
            : 'border-glamour-200/70 bg-glamour-50/80 text-glamour-900 placeholder:text-transparent focus:border-amber-400/50 focus:bg-white focus:shadow-[0_0_0_1px_rgba(251,191,36,0.2),0_8px_28px_-12px_rgba(234,88,12,0.18)] focus:ring-amber-400/20',
          error &&
            (dark
              ? 'border-red-400/50 focus:border-red-400/60 focus:ring-red-500/20'
              : 'border-red-400/80 focus:border-red-500 focus:ring-red-100'),
        )}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          'pointer-events-none absolute left-4 top-1/2 origin-left -translate-y-1/2 text-[15px] transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-[13px] peer-focus:-translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-[13px] peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-semibold',
          dark
            ? 'text-white/50 peer-focus:text-amber-200/90 peer-[:not(:placeholder-shown)]:text-amber-200/80'
            : 'text-glamour-500 peer-focus:text-amber-700/90 peer-[:not(:placeholder-shown)]:text-glamour-600',
        )}
      >
        {label}
      </label>
      <button
        type="button"
        className={cn(
          'absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-2 transition-all duration-200',
          dark
            ? 'text-white/45 hover:bg-white/10 hover:text-white'
            : 'text-glamour-500 hover:bg-glamour-100 hover:text-glamour-800',
        )}
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        <span className="relative block h-[18px] w-[18px]">
          <Eye
            className={cn(
              'absolute inset-0 h-[18px] w-[18px] transition-all duration-200',
              visible ? 'scale-100 opacity-100' : 'scale-75 opacity-0',
            )}
            strokeWidth={1.75}
          />
          <EyeOff
            className={cn(
              'absolute inset-0 h-[18px] w-[18px] transition-all duration-200',
              !visible ? 'scale-100 opacity-100' : 'scale-75 opacity-0',
            )}
            strokeWidth={1.75}
          />
        </span>
      </button>
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 text-xs font-medium text-red-500 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
})

export function AuthCheckbox({ checked, onChange, theme = 'light', children, error }) {
  const dark = theme === 'dark'
  return (
    <div>
      <label
        className={cn(
          'group flex cursor-pointer items-start gap-3.5 rounded-xl transition-colors',
          dark ? 'hover:bg-white/[0.04]' : 'hover:bg-glamour-50/80',
        )}
      >
        <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="peer sr-only"
          />
          <span
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded-md border transition-all duration-200',
              'peer-focus-visible:ring-[3px] peer-focus-visible:ring-amber-400/35',
              dark
                ? 'border-white/20 bg-white/[0.06] peer-checked:border-amber-400/60 peer-checked:bg-gradient-to-br peer-checked:from-amber-500 peer-checked:to-orange-600'
                : 'border-glamour-300/90 bg-white peer-checked:border-transparent peer-checked:bg-gradient-to-br peer-checked:from-amber-500 peer-checked:to-orange-600 peer-checked:shadow-[0_2px_8px_-2px_rgba(234,88,12,0.45)]',
            )}
            aria-hidden
          >
            <svg
              className={cn(
                'h-3 w-3 text-white transition-transform duration-200',
                checked ? 'scale-100' : 'scale-0',
              )}
              viewBox="0 0 12 10"
              fill="none"
            >
              <path
                d="M1 5l3.5 3.5L11 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
        <span
          className={cn(
            'text-[13px] leading-relaxed',
            dark ? 'text-white/65' : 'text-glamour-600',
          )}
        >
          {children}
        </span>
      </label>
      {error ? <p className="mt-1.5 pl-8 text-xs font-medium text-red-500 dark:text-red-400">{error}</p> : null}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function AppleIcon({ className }) {
  return (
    <svg className={cn('h-[18px] w-[18px]', className)} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.53 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="#1877F2" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export function AuthSocialDivider({ theme = 'light' }) {
  const dark = theme === 'dark'
  return (
    <div className="relative py-2" role="separator">
      <div
        className={cn(
          'absolute inset-x-0 top-1/2 h-px -translate-y-1/2',
          dark ? 'bg-gradient-to-r from-transparent via-white/15 to-transparent' : 'bg-gradient-to-r from-transparent via-glamour-200 to-transparent',
        )}
      />
      <p
        className={cn(
          'relative mx-auto w-max px-4 text-center text-[11px] font-semibold uppercase tracking-[0.22em]',
          dark ? 'bg-[#0f0e0c] text-white/40' : 'bg-[#faf8f5] text-glamour-500',
        )}
      >
        Continue with
      </p>
    </div>
  )
}

export function AuthSocialButton({ provider, onClick, theme = 'light' }) {
  const dark = theme === 'dark'
  const cfg = {
    google: { label: 'Google', icon: <GoogleIcon /> },
    apple: { label: 'Apple', icon: <AppleIcon className={dark ? 'text-white' : 'text-glamour-900'} /> },
    facebook: { label: 'Facebook', icon: <FacebookIcon /> },
  }[provider]

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center justify-center gap-2.5 rounded-xl border py-3 text-sm font-semibold transition-all duration-200',
        'hover:-translate-y-0.5 active:translate-y-0',
        dark
          ? 'border-white/[0.1] bg-white/[0.04] text-white/90 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-[0_12px_40px_-20px_rgba(0,0,0,0.8)]'
          : 'border-glamour-200/90 bg-white/90 text-glamour-800 hover:border-glamour-300 hover:bg-white hover:shadow-[0_12px_32px_-18px_rgba(28,25,23,0.12)]',
      )}
    >
      {cfg.icon}
      {cfg.label}
    </button>
  )
}

export function AuthPrimaryButton({ children, loading, theme = 'light', className, ...props }) {
  const dark = theme === 'dark'
  return (
    <button
      type="submit"
      disabled={loading}
      className={cn(
        'group relative w-full overflow-hidden rounded-xl py-3.5 text-[15px] font-semibold tracking-tight transition-all duration-300',
        'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]',
        'disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0',
        dark
          ? 'text-glamour-950 shadow-[0_16px_48px_-12px_rgba(251,146,60,0.45)] bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 hover:shadow-[0_20px_56px_-10px_rgba(251,146,60,0.55)]'
          : 'text-white shadow-[0_14px_40px_-12px_rgba(234,88,12,0.45)] bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:shadow-[0_18px_48px_-10px_rgba(234,88,12,0.5)]',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100',
          'bg-gradient-to-t from-transparent via-white/25 to-white/10',
        )}
        aria-hidden
      />
      <span className="relative inline-flex items-center justify-center gap-2">
        {loading ? (
          <span
            className={cn(
              'h-4 w-4 animate-spin rounded-full border-2 border-t-transparent',
              dark ? 'border-glamour-900/30 border-t-glamour-900' : 'border-white/30 border-t-white',
            )}
          />
        ) : null}
        {children}
      </span>
    </button>
  )
}
