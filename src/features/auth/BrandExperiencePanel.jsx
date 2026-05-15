import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  LayoutDashboard,
  TrendingUp,
  Package,
  ShoppingBag,
  Heart,
  Truck,
  BarChart3,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/cn'

function HandUnderline({ className, variant = 'warm' }) {
  return (
    <svg
      className={cn(
        'mt-3 h-3 w-[min(100%,240px)]',
        variant === 'soft' ? 'text-rose-200/95' : 'text-amber-200/90',
        className,
      )}
      viewBox="0 0 220 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 8c32-6 64-8 96-6s64 4 120 2"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  )
}

function FloatingWidget({ className, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: [0, -5, 0] }}
      transition={{
        opacity: { delay: 0.12 + delay, duration: 0.45 },
        y: { delay: 0.35 + delay, duration: 5.5 + delay * 0.4, repeat: Infinity, ease: 'easeInOut' },
      }}
      className={cn(
        'rounded-2xl border p-3 shadow-[0_16px_48px_-18px_rgba(0,0,0,0.4)] backdrop-blur-xl',
        className,
      )}
    >
      {children}
    </motion.div>
  )
}

const UNIVERSAL_HEADLINES = [
  'Simplify your ecommerce operations.',
  'Modern commerce made effortless.',
  'Scale smarter with one powerful dashboard.',
]

function panelShell(theme, children, compact) {
  const dark = theme === 'dark'
  return (
    <div
      className={cn(
        'relative flex h-full min-h-0 flex-col justify-between overflow-hidden',
        compact ? 'p-4 sm:p-5' : 'p-6 sm:p-8 lg:p-10 xl:p-12',
        'lg:border-r',
        dark
          ? 'border-white/[0.06] bg-gradient-to-br from-[#14100f] via-[#1f1512] to-[#0f0d0c]'
          : 'border-white/25',
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          dark
            ? 'bg-[radial-gradient(ellipse_110%_85%_at_15%_0%,rgba(251,146,60,0.28)_0%,transparent_52%),radial-gradient(ellipse_95%_70%_at_100%_35%,rgba(234,88,12,0.18)_0%,transparent_55%),radial-gradient(ellipse_80%_55%_at_45%_100%,rgba(253,186,116,0.1)_0%,transparent_48%)]'
            : 'bg-[radial-gradient(ellipse_115%_85%_at_12%_5%,rgba(255,237,213,0.98)_0%,transparent_50%),radial-gradient(ellipse_100%_72%_at_92%_28%,rgba(254,215,170,0.92)_0%,transparent_52%),radial-gradient(ellipse_90%_58%_at_48%_100%,rgba(251,146,60,0.5)_0%,transparent_46%),linear-gradient(162deg,#ff6900_0%,#fb923c_30%,#fdba74_58%,#fed7aa_88%,#fff7ed_100%)]',
        )}
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-amber-400/28 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-orange-300/22 blur-3xl" aria-hidden />
      <div
        className={cn(
          'auth-grain pointer-events-none absolute inset-0 mix-blend-overlay',
          dark ? 'opacity-[0.2]' : 'opacity-[0.32]',
        )}
        aria-hidden
      />
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  )
}

/** @param {{ theme: 'light' | 'dark', persona: 'universal' | 'shopper' | 'seller', compact?: boolean }} props */
export function BrandExperiencePanel({ theme, persona, compact = false }) {
  if (persona === 'universal') {
    return <UniversalBrand theme={theme} compact={compact} />
  }
  if (persona === 'seller') {
    return <SellerBrand theme={theme} compact={compact} />
  }
  return <ShopperBrand theme={theme} compact={compact} />
}

function UniversalBrand({ theme, compact }) {
  const dark = theme === 'dark'
  const [headline] = useState(
    () => UNIVERSAL_HEADLINES[Math.floor(Math.random() * UNIVERSAL_HEADLINES.length)],
  )
  return panelShell(
    theme,
    <>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/35 bg-white/16 shadow-lg backdrop-blur-md">
          <Zap className="h-5 w-5 text-white drop-shadow-sm" strokeWidth={1.75} />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">Glamour</p>
          <p className="text-sm font-semibold tracking-tight text-white">Commerce Cloud</p>
        </div>
      </motion.div>

      <motion.div
        className={cn('max-w-xl', compact ? 'mt-3' : 'mt-6 lg:mt-10')}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2
          className={cn(
            'font-auth font-bold leading-[1.05] tracking-[-0.035em] text-white text-balance',
            compact ? 'text-lg sm:text-xl' : 'text-[clamp(1.85rem,3.6vw,3.15rem)]',
          )}
        >
          {headline}
        </h2>
        {!compact ? <HandUnderline variant="warm" /> : null}
        {!compact ? (
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/88">
            One immersive workspace for discovery, conversion, and operations — crafted with the restraint of Apple, the
            motion of Framer, and the reliability you expect from enterprise SaaS.
          </p>
        ) : (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/75">
            Discovery, checkout, and operations — one cinematic surface.
          </p>
        )}
      </motion.div>

      <div className={cn('relative flex-1', compact ? 'mt-2 hidden' : 'mt-6 hidden min-h-[200px] sm:block lg:min-h-[220px]')}>
        <FloatingWidget
          className="absolute left-0 top-0 w-[min(100%,210px)] border-white/28 bg-white/12"
          delay={0}
        >
          <div className="flex items-center gap-2 text-white/92">
            <LayoutDashboard className="h-4 w-4 text-amber-200" strokeWidth={1.75} />
            <span className="text-xs font-semibold">Live pulse</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/14">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-amber-200 to-orange-200"
              initial={{ width: '0%' }}
              animate={{ width: '82%' }}
              transition={{ delay: 0.55, duration: 1.1, ease: 'easeOut' }}
            />
          </div>
          <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-white/55">Revenue + demand</p>
        </FloatingWidget>
        <FloatingWidget
          className="absolute right-0 top-8 w-[min(100%,195px)] border-white/26 bg-white/11"
          delay={0.12}
        >
          <div className="flex items-center justify-between gap-2 text-white/95">
            <span className="text-xs font-semibold">New arrivals</span>
            <Heart className="h-4 w-4 text-rose-100" strokeWidth={1.75} />
          </div>
          <div className="mt-2 flex gap-1.5">
            {['bg-rose-200/90', 'bg-orange-200/90', 'bg-amber-100/90', 'bg-white/45'].map((bg, i) => (
              <motion.span
                key={i}
                className={cn('h-12 w-9 rounded-lg shadow-inner', bg)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 + i * 0.07 }}
              />
            ))}
          </div>
        </FloatingWidget>
        <FloatingWidget
          className="absolute bottom-0 left-[18%] w-[min(100%,205px)] border-white/24 bg-white/10"
          delay={0.24}
        >
          <div className="flex items-center gap-2 text-white/90">
            <Truck className="h-4 w-4 text-amber-100" strokeWidth={1.75} />
            <span className="text-xs font-semibold">Fulfillment</span>
          </div>
          <p className="mt-1 text-2xl font-bold tabular-nums text-white">2–4d</p>
          <p className={cn('text-[10px] font-medium', dark ? 'text-emerald-200/90' : 'text-emerald-100/95')}>
            SLA-grade routing
          </p>
        </FloatingWidget>
        <FloatingWidget
          className="absolute bottom-10 right-[8%] w-[min(100%,180px)] border-white/22 bg-white/9"
          delay={0.32}
        >
          <div className="flex items-center gap-2 text-white/90">
            <TrendingUp className="h-4 w-4 text-emerald-200" strokeWidth={1.75} />
            <span className="text-xs font-semibold">Forecast</span>
          </div>
          <div className="mt-2 flex h-7 items-end gap-1">
            {[36, 52, 44, 68, 58, 84, 72].map((h, i) => (
              <motion.span
                key={i}
                className="w-1.5 rounded-sm bg-gradient-to-t from-white/25 to-white/95"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.48 + i * 0.05, duration: 0.35 }}
              />
            ))}
          </div>
        </FloatingWidget>
      </div>
    </>,
    compact,
  )
}

function ShopperBrand({ theme, compact }) {
  const dark = theme === 'dark'
  return panelShell(
    theme,
    <>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/35 bg-white/18 shadow-lg backdrop-blur-md">
          <ShoppingBag className="h-5 w-5 text-white drop-shadow-sm" strokeWidth={1.75} />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">Glamour</p>
          <p className="text-sm font-semibold tracking-tight text-white">Marketplace</p>
        </div>
      </motion.div>

      <motion.div
        className={cn('max-w-xl', compact ? 'mt-3' : 'mt-6 lg:mt-10')}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2
          className={cn(
            'font-auth font-bold leading-[1.06] tracking-[-0.032em] text-white text-balance',
            compact ? 'text-lg sm:text-xl' : 'text-[clamp(1.8rem,3.4vw,2.85rem)]',
          )}
        >
          Curated finds. Effortless shopping.
        </h2>
        {!compact ? <HandUnderline variant="soft" /> : null}
        {!compact ? (
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/88">
            A lightweight profile — save favorites, glide through checkout, and keep every order in sync across devices.
          </p>
        ) : (
          <p className="mt-2 text-xs leading-relaxed text-white/75">Lightweight profile · faster checkout.</p>
        )}
      </motion.div>

      <div className={cn('relative flex-1', compact ? 'mt-2 hidden' : 'mt-6 hidden min-h-[180px] sm:block lg:min-h-[200px]')}>
        <FloatingWidget className="absolute left-0 top-0 max-w-[200px] border-white/30 bg-white/14" delay={0}>
          <div className="flex items-center justify-between gap-2 text-white/95">
            <span className="text-xs font-semibold">New arrivals</span>
            <Heart className="h-4 w-4 text-rose-100" strokeWidth={1.75} />
          </div>
          <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-white/60">This week</p>
          <div className="mt-2 flex gap-1.5">
            {['bg-rose-200/90', 'bg-orange-200/90', 'bg-amber-100/90', 'bg-white/50'].map((bg, i) => (
              <motion.span
                key={i}
                className={cn('h-14 w-10 rounded-lg shadow-inner', bg)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
              />
            ))}
          </div>
        </FloatingWidget>
        <FloatingWidget className="absolute right-0 top-10 max-w-[185px] border-white/28 bg-white/12" delay={0.15}>
          <div className="flex items-center gap-2 text-white/90">
            <Truck className="h-4 w-4 text-amber-100" strokeWidth={1.75} />
            <span className="text-xs font-semibold">Delivery</span>
          </div>
          <p className="mt-1 text-2xl font-bold tabular-nums text-white">2–4d</p>
          <p className={cn('text-[10px] font-medium', dark ? 'text-emerald-100/90' : 'text-emerald-100/95')}>
            Free over ₱1,500
          </p>
        </FloatingWidget>
        <FloatingWidget
          className="absolute bottom-2 left-1/4 max-w-[200px] -translate-x-1/4 border-white/25 bg-white/10"
          delay={0.3}
        >
          <div className="flex items-center gap-2 text-white/90">
            <Sparkles className="h-4 w-4 text-amber-100" strokeWidth={1.75} />
            <span className="text-xs font-semibold">Style picks</span>
          </div>
          <p className="mt-2 text-[11px] leading-snug text-white/78">Editorial capsules tuned to how you browse.</p>
        </FloatingWidget>
      </div>
    </>,
    compact,
  )
}

function SellerBrand({ theme, compact }) {
  const dark = theme === 'dark'
  return panelShell(
    theme,
    <>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/32 bg-white/15 shadow-lg backdrop-blur-md">
          <BarChart3 className="h-5 w-5 text-white drop-shadow-sm" strokeWidth={1.75} />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/72">Glamour</p>
          <p className="text-sm font-semibold tracking-tight text-white">Seller OS</p>
        </div>
      </motion.div>

      <motion.div
        className={cn('max-w-xl', compact ? 'mt-3' : 'mt-6 lg:mt-10')}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2
          className={cn(
            'font-auth font-bold leading-[1.06] tracking-[-0.032em] text-white text-balance',
            compact ? 'text-lg sm:text-xl' : 'text-[clamp(1.8rem,3.4vw,2.85rem)]',
          )}
        >
          Scale smarter with one dashboard.
        </h2>
        {!compact ? <HandUnderline variant="warm" /> : null}
        {!compact ? (
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/86">
            Inventory, orders, and revenue signals in one cinematic workspace — built for operators who expect Stripe-grade
            clarity and Shopify-scale growth.
          </p>
        ) : (
          <p className="mt-2 text-xs leading-relaxed text-white/75">Operations desk · analytics-ready.</p>
        )}
      </motion.div>

      <div className={cn('relative flex-1', compact ? 'mt-2 hidden' : 'mt-6 hidden min-h-[180px] sm:block lg:min-h-[200px]')}>
        <FloatingWidget className="absolute left-0 top-0 max-w-[210px] border-white/26 bg-white/12" delay={0}>
          <div className="flex items-center gap-2 text-white/90">
            <LayoutDashboard className="h-4 w-4 text-amber-200" strokeWidth={1.75} />
            <span className="text-xs font-semibold tracking-tight">Live dashboard</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-amber-200 to-orange-100"
              initial={{ width: '0%' }}
              animate={{ width: '78%' }}
              transition={{ delay: 0.55, duration: 1.15, ease: 'easeOut' }}
            />
          </div>
          <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-white/55">Revenue pulse</p>
        </FloatingWidget>
        <FloatingWidget className="absolute right-0 top-12 max-w-[190px] border-white/25 bg-white/12" delay={0.18}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-white">Orders</span>
            <Package className="h-4 w-4 text-amber-200/90" strokeWidth={1.75} />
          </div>
          <p className="mt-1 text-2xl font-bold tabular-nums tracking-tight text-white">2,847</p>
          <p className={cn('text-[10px] font-medium', dark ? 'text-emerald-200/90' : 'text-emerald-200/95')}>
            +12.4% vs last week
          </p>
        </FloatingWidget>
        <FloatingWidget
          className="absolute bottom-4 left-1/4 max-w-[200px] -translate-x-1/4 border-white/25 bg-white/12"
          delay={0.32}
        >
          <div className="flex items-center gap-2 text-white/90">
            <TrendingUp className="h-4 w-4 text-emerald-200" strokeWidth={1.75} />
            <span className="text-xs font-semibold">Growth forecast</span>
          </div>
          <div className="mt-2 flex h-8 items-end gap-1">
            {[40, 55, 48, 70, 62, 88, 76].map((h, i) => (
              <motion.span
                key={i}
                className="w-1.5 rounded-sm bg-gradient-to-t from-white/30 to-white/92"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.48 + i * 0.06, duration: 0.38 }}
              />
            ))}
          </div>
        </FloatingWidget>
      </div>
    </>,
    compact,
  )
}
