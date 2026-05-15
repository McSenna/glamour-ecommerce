import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun, X, ShoppingBag, BarChart3, Zap } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useRef } from 'react'
import { cn } from '@/lib/cn'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useUIStore } from '@/store/useUIStore'
import { BrandExperiencePanel } from '@/features/auth/BrandExperiencePanel'

function AuthBackdrop({ onClose, theme }) {
  const dark = theme === 'dark'
  return (
    <motion.button
      type="button"
      aria-label="Close dialog"
      className={cn(
        'absolute inset-0 backdrop-blur-2xl transition-colors',
        dark ? 'bg-[#060504]/82' : 'bg-glamour-950/48',
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      onClick={onClose}
    />
  )
}

/**
 * Fullscreen cinematic auth shell — split brand (≈58%) + form (≈42%).
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {'login' | 'register'} [props.variant]
 * @param {string} props.titleId — aria-labelledby
 * @param {import('react').ReactNode} props.children
 * @param {import('react').ReactNode} [props.footerSlot]
 * @param {'universal' | 'shopper' | 'seller'} props.brandPersona
 * @param {string} [props.rightTagline]
 */
export function AuthLayout({
  open,
  onClose,
  variant: _variant = 'login',
  titleId,
  children,
  footerSlot,
  brandPersona = 'universal',
  rightTagline,
}) {
  const panelRef = useRef(null)
  const theme = useUIStore((s) => s.theme)
  const toggleTheme = useUIStore((s) => s.toggleTheme)
  const dark = theme === 'dark'

  const tagline =
    rightTagline ??
    (brandPersona === 'seller'
      ? 'Seller workspace · enterprise-ready'
      : brandPersona === 'shopper'
        ? 'Shopping · calm & considered'
        : 'Unified commerce intelligence')

  const BrandIcon =
    brandPersona === 'seller' ? BarChart3 : brandPersona === 'shopper' ? ShoppingBag : Zap

  useBodyScrollLock(open)
  useFocusTrap(panelRef, open)

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100] flex items-stretch justify-center p-0">
          <AuthBackdrop onClose={onClose} theme={theme} />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, scale: 0.985, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.99, y: 10 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className={cn(
              'relative z-10 flex h-[100dvh] max-h-[100dvh] w-full max-w-[100vw] flex-col overflow-hidden rounded-none border shadow-[0_40px_120px_-48px_rgba(0,0,0,0.65)]',
              dark
                ? 'border-white/[0.07] bg-[#0c0b0a]/98'
                : 'border-white/55 bg-white/[0.98]',
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)]">
              <div className="relative order-2 hidden min-h-0 lg:order-1 lg:block">
                <BrandExperiencePanel theme={theme} persona={brandPersona} />
              </div>

              <div
                className={cn(
                  'relative order-1 flex min-h-0 flex-col overflow-hidden lg:order-2',
                  dark ? 'bg-[#0f0e0c]' : 'bg-[#faf8f5]',
                )}
              >
                <div
                  className={cn(
                    'flex shrink-0 items-start justify-between gap-3 px-5 pb-1 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-8 sm:pt-8',
                  )}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <span
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-sm',
                        dark
                          ? 'border-white/10 bg-white/[0.07] text-amber-300'
                          : 'border-glamour-200/80 bg-white text-orange-600',
                      )}
                    >
                      <BrandIcon className="h-[18px] w-[18px]" strokeWidth={2} />
                    </span>
                    <div className="min-w-0">
                      <p
                        className={cn(
                          'truncate text-[13px] font-semibold tracking-tight',
                          dark ? 'text-white' : 'text-glamour-900',
                        )}
                      >
                        Glamour Commerce
                      </p>
                      <p className={cn('text-[11px] font-medium', dark ? 'text-white/45' : 'text-glamour-500')}>
                        {tagline}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-0.5">
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className={cn(
                        'rounded-xl p-2.5 transition-colors',
                        dark ? 'text-white/50 hover:bg-white/10 hover:text-white' : 'text-glamour-500 hover:bg-glamour-100',
                      )}
                      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                      {dark ? <Sun className="h-4 w-4" strokeWidth={1.75} /> : <Moon className="h-4 w-4" strokeWidth={1.75} />}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className={cn(
                        'rounded-xl p-2.5 transition-colors',
                        dark ? 'text-white/50 hover:bg-white/10 hover:text-white' : 'text-glamour-500 hover:bg-glamour-100',
                      )}
                      aria-label="Close"
                    >
                      <X className="h-5 w-5" strokeWidth={1.75} />
                    </button>
                  </div>
                </div>

                <div
                  className={cn(
                    'min-h-0 flex-1 overflow-hidden px-5 sm:px-8',
                    'pb-[max(0.5rem,env(safe-area-inset-bottom))]',
                  )}
                >
                  <div className="mx-auto flex h-full min-h-0 w-full max-w-[420px] flex-col lg:max-w-none lg:px-2 xl:max-w-[440px]">
                    <div className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto overflow-x-hidden py-1 sm:py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                      {children}
                    </div>
                  </div>
                </div>

                {footerSlot ? (
                  <div
                    className={cn(
                      'shrink-0 border-t px-5 py-2.5 sm:px-8 sm:py-3',
                      dark ? 'border-white/[0.06] bg-black/25' : 'border-glamour-200/60 bg-white/55',
                    )}
                  >
                    {footerSlot}
                  </div>
                ) : null}
              </div>
            </div>

            <div
              className={cn(
                'h-[min(26dvh,168px)] shrink-0 overflow-hidden border-t lg:hidden',
                dark ? 'border-white/[0.08]' : 'border-glamour-200/50',
              )}
            >
              <BrandExperiencePanel theme={theme} persona={brandPersona} compact />
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

export function AuthTrustStrip({ theme = 'light' }) {
  const dark = theme === 'dark'
  return (
    <p
      className={cn(
        'flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[11px] font-medium',
        dark ? 'text-white/42' : 'text-glamour-500',
      )}
    >
      <span className="inline-flex items-center gap-1">
        <span className="h-1 w-1 rounded-full bg-emerald-500" aria-hidden />
        256-bit encryption
      </span>
      <span className={dark ? 'text-white/22' : 'text-glamour-300'} aria-hidden>
        ·
      </span>
      <span>WCAG-oriented contrast · keyboard friendly</span>
    </p>
  )
}
