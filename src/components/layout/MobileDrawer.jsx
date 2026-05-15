import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { NICHE_CATEGORIES } from '@/lib/constants'
import { useUIStore } from '@/store/useUIStore'

export function MobileDrawer() {
  const open = useUIStore((s) => s.mobileNavOpen)
  const setOpen = useUIStore((s) => s.setMobileNav)

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" className="absolute inset-0 bg-glamour-950/40" onClick={() => setOpen(false)} />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="absolute right-0 top-0 flex h-full w-[min(100%,360px)] flex-col bg-white/95 p-6 shadow-soft backdrop-blur-xl"
          >
            <div className="mb-8 flex items-center justify-between">
              <p className="font-display text-xl text-glamour-950">Menu</p>
              <button
                type="button"
                className="rounded-full p-2 text-glamour-600 hover:bg-glamour-100"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 text-sm font-medium text-glamour-700">
              <NavLink to="/" onClick={() => setOpen(false)} className="rounded-2xl px-3 py-3 hover:bg-glamour-50">
                Home
              </NavLink>
              <NavLink to="/shop" onClick={() => setOpen(false)} className="rounded-2xl px-3 py-3 hover:bg-glamour-50">
                Shop
              </NavLink>
              <NavLink
                to="/seller"
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3 py-3 hover:bg-glamour-50"
              >
                Seller
              </NavLink>
              <NavLink
                to="/admin"
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3 py-3 hover:bg-glamour-50"
              >
                Admin
              </NavLink>
            </nav>
            <div className="mt-8 border-t border-glamour-100 pt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-glamour-500">Categories</p>
              <div className="flex flex-col gap-2">
                {NICHE_CATEGORIES.map((c) => (
                  <NavLink
                    key={c.slug}
                    to={`/shop?category=${c.slug}`}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm text-glamour-700 hover:bg-glamour-50"
                  >
                    {c.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
