import { motion } from 'framer-motion'
import { ShoppingBag, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * Registration-only role selection (Shopper vs Seller).
 * @param {{ theme: 'light' | 'dark', titleId: string, onSelect: (id: 'shopper' | 'seller') => void }} props
 */
export function RoleSelector({ theme, titleId, onSelect }) {
  const dark = theme === 'dark'
  const cards = [
    {
      id: 'shopper',
      title: 'Shopper',
      emoji: '🛍',
      desc: 'Save favorites, earn rewards, and checkout faster with a lightweight profile.',
      icon: ShoppingBag,
    },
    {
      id: 'seller',
      title: 'Seller',
      emoji: '🏪',
      desc: 'Spin up a storefront workspace with inventory, orders, and growth analytics.',
      icon: BarChart3,
    },
  ]

  return (
    <div className="flex h-full min-h-0 w-full flex-col justify-center space-y-6">
      <header className="space-y-2 text-center sm:text-left">
        <h2
          id={titleId}
          className={cn(
            'font-auth text-2xl font-bold tracking-[-0.03em] sm:text-[1.75rem]',
            dark ? 'text-white' : 'text-glamour-950',
          )}
        >
          Choose how you&apos;re joining
        </h2>
        <p className={cn('text-sm leading-relaxed', dark ? 'text-white/55' : 'text-glamour-600')}>
          Pick a path — we&apos;ll tailor fields, messaging, and your first-run workspace.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {cards.map(({ id, title, emoji, desc, icon: Icon }, i) => (
          <motion.button
            key={id}
            type="button"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3, transition: { duration: 0.18 } }}
            whileTap={{ scale: 0.992 }}
            onClick={() => onSelect(id)}
            className={cn(
              'group relative flex min-h-[148px] flex-col rounded-2xl border p-5 text-left transition-all',
              dark
                ? 'border-white/10 bg-white/[0.04] hover:border-amber-400/35 hover:bg-white/[0.07] hover:shadow-[0_0_44px_-14px_rgba(251,146,60,0.38)]'
                : 'border-glamour-200/90 bg-white hover:border-orange-200 hover:shadow-[0_20px_50px_-24px_rgba(234,88,12,0.18)]',
            )}
          >
            <span className="text-2xl" aria-hidden>
              {emoji}
            </span>
            <span className="mt-2 flex items-center gap-2">
              <Icon className={cn('h-5 w-5', dark ? 'text-amber-300' : 'text-orange-600')} strokeWidth={1.75} />
              <span className={cn('text-base font-bold', dark ? 'text-white' : 'text-glamour-950')}>{title}</span>
            </span>
            <p className={cn('mt-1.5 text-[13px] leading-snug', dark ? 'text-white/55' : 'text-glamour-600')}>{desc}</p>
            <span
              className={cn(
                'mt-auto pt-3 text-[11px] font-bold uppercase tracking-widest',
                dark ? 'text-amber-300/90' : 'text-orange-700',
              )}
            >
              Continue →
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
