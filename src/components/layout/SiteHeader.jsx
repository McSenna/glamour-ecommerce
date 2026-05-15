import { motion } from 'framer-motion'
import { Menu, Search, ShoppingBag, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { SiteHeaderSearch } from '@/components/layout/SiteHeaderSearch'
import { cn } from '@/lib/cn'
import { APP_NAME } from '@/lib/constants'
import { useAuthStore } from '@/store/useAuthStore'
import { useCartStore } from '@/store/useCartStore'
import { useModalStore } from '@/store/useModalStore'
import { useUIStore } from '@/store/useUIStore'

const links = [
  { to: '/shop', label: 'Shop' },
  { to: '/shop?filter=featured', label: 'Featured' },
  { to: '/shop?filter=trending', label: 'Trending' },
]

export function SiteHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStore((s) => s.user)
  const cartCount = useCartStore((s) =>
    s.items.reduce((n, i) => n + (Number(i.quantity) > 0 ? Number(i.quantity) : 0), 0),
  )
  const setMobileNav = useUIStore((s) => s.setMobileNav)
  const openCart = useModalStore((s) => s.openCart)
  const openLogin = useModalStore((s) => s.openLogin)
  const cartModalOpen = useModalStore((s) => s.active === 'cart')
  const [elevated, setElevated] = useState(false)

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: elevated ? 'rgba(255,255,255,0.92)' : 'rgba(250,250,249,0.72)',
        backdropFilter: elevated ? 'blur(18px)' : 'blur(12px)',
      }}
      transition={{ duration: 0.25 }}
      className={cn(
        'sticky top-0 z-40 border-b border-transparent',
        elevated && 'border-glamour-100/80 shadow-[0_8px_30px_-18px_rgba(28,25,23,0.18)]',
      )}
    >
      <div className="mx-auto flex max-w-8xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="inline-flex rounded-full p-2 text-glamour-700 hover:bg-glamour-100 lg:hidden"
            onClick={() => setMobileNav(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="group flex min-w-0 items-center gap-2">
            <span className="font-display text-xl tracking-tight text-glamour-950 sm:text-2xl">{APP_NAME}</span>
            <span className="hidden rounded-full bg-glamour-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-glamour-600 sm:inline">
              Luxury
            </span>
          </Link>
        </div>

        <div className="hidden min-w-0 flex-1 items-center gap-8 lg:flex">
          <nav className="flex shrink-0 items-center gap-8 text-sm font-medium text-glamour-600">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    'transition hover:text-glamour-900',
                    isActive && 'text-glamour-900 underline decoration-glamour-300 decoration-2 underline-offset-8',
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <SiteHeaderSearch />
        </div>

        <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="rounded-full border border-glamour-200/80 bg-white/70 p-2 text-glamour-600 shadow-sm transition hover:border-glamour-300 lg:hidden"
            aria-label="Open shop search"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => openCart()}
            className={cn(
              'relative inline-flex rounded-full p-2 text-glamour-700 transition hover:bg-glamour-100',
              cartModalOpen && 'bg-glamour-100 text-glamour-900',
            )}
            aria-label="Open shopping cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 min-h-[18px] min-w-[18px] rounded-full bg-accent px-1 text-[10px] font-semibold leading-[18px] text-white">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            ) : null}
          </button>
          {user ? (
            <Link
              to="/account"
              className="inline-flex rounded-full p-2 text-glamour-700 transition hover:bg-glamour-100"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => openLogin({ from: location })}
              className="inline-flex rounded-full p-2 text-glamour-700 transition hover:bg-glamour-100"
              aria-label="Sign in"
            >
              <User className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </motion.header>
  )
}
