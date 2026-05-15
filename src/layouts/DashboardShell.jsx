import { Menu } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { useState } from 'react'

export function DashboardShell({ title, nav }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-dvh bg-glamour-50 text-glamour-900">
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 border-r border-glamour-100 bg-white/95 p-6 shadow-card backdrop-blur-xl transition-transform lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <div className="mb-10 flex items-center justify-between gap-2">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-glamour-500">{title}</p>
            <p className="font-display text-xl">Haven</p>
          </div>
          <button
            type="button"
            className="rounded-full p-2 text-glamour-600 hover:bg-glamour-100 lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>
        <nav className="space-y-1 text-sm font-medium">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-2xl px-3 py-2.5 text-glamour-600 transition hover:bg-glamour-50 hover:text-glamour-900',
                  isActive && 'bg-glamour-100 text-glamour-900 shadow-sm',
                )
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-glamour-950/30 backdrop-blur-[2px] lg:hidden"
          aria-label="Close overlay"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <div className="flex flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-glamour-100 bg-white/80 px-4 py-4 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex rounded-full p-2 text-glamour-700 hover:bg-glamour-100 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-glamour-500">{title}</p>
              <h1 className="font-display text-2xl">Overview</h1>
            </div>
          </div>
        </header>
        <div className="flex-1 space-y-8 p-4 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
