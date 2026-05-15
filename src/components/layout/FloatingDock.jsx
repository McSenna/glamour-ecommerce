import { Home, LayoutGrid, ShoppingBag, User } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { useAuthStore } from '@/store/useAuthStore'
import { useModalStore } from '@/store/useModalStore'

export function FloatingDock() {
  const authed = useAuthStore((s) => !!s.user)
  const location = useLocation()
  const openCart = useModalStore((s) => s.openCart)
  const openLogin = useModalStore((s) => s.openLogin)
  const modalActive = useModalStore((s) => s.active)

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 pb-4 sm:hidden">
      <nav className="pointer-events-auto mx-auto flex max-w-md items-center justify-between gap-2 rounded-full border border-white/60 bg-white/85 px-3 py-2 shadow-soft backdrop-blur-xl">
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              'flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-medium text-glamour-500 transition',
              isActive && 'bg-glamour-100 text-glamour-900',
            )
          }
        >
          <Home className="h-5 w-5" />
          Home
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            cn(
              'flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-medium text-glamour-500 transition',
              isActive && 'bg-glamour-100 text-glamour-900',
            )
          }
        >
          <LayoutGrid className="h-5 w-5" />
          Shop
        </NavLink>
        <button
          type="button"
          onClick={() => openCart()}
          className={cn(
            'flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-medium text-glamour-500 transition',
            modalActive === 'cart' && 'bg-glamour-100 text-glamour-900',
          )}
        >
          <ShoppingBag className="h-5 w-5" />
          Cart
        </button>
        {authed ? (
          <NavLink
            to="/account"
            className={({ isActive }) =>
              cn(
                'flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-medium text-glamour-500 transition',
                isActive && 'bg-glamour-100 text-glamour-900',
              )
            }
          >
            <User className="h-5 w-5" />
            You
          </NavLink>
        ) : (
          <button
            type="button"
            onClick={() => openLogin({ from: location })}
            className={cn(
              'flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-medium text-glamour-500 transition',
              modalActive === 'login' && 'bg-glamour-100 text-glamour-900',
            )}
          >
            <User className="h-5 w-5" />
            You
          </button>
        )}
      </nav>
    </div>
  )
}
