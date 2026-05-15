import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDebounce } from '@/hooks/useDebounce'
import { cn } from '@/lib/cn'

export function SiteHeaderSearch({ className }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [q, setQ] = useState('')
  const debounced = useDebounce(q.trim(), 300)

  useEffect(() => {
    if (location.pathname !== '/shop') return
    const cur = new URLSearchParams(location.search).get('q') || ''
    setQ((prev) => (prev === cur ? prev : cur))
  }, [location.pathname, location.search])

  useEffect(() => {
    if (location.pathname !== '/shop') {
      if (!debounced) return
      navigate(`/shop?q=${encodeURIComponent(debounced)}`, { replace: false })
      return
    }
    const next = new URLSearchParams(location.search)
    const current = (next.get('q') || '').trim()
    if (debounced === current) return
    if (debounced) next.set('q', debounced)
    else next.delete('q')
    const qs = next.toString()
    navigate(qs ? `/shop?${qs}` : '/shop', { replace: true })
  }, [debounced, location.pathname, location.search, navigate])

  return (
    <div className={cn('relative hidden min-w-0 flex-1 max-w-md lg:block', className)}>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-glamour-400"
        aria-hidden
      />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products…"
        aria-label="Search products"
        autoComplete="off"
        className="w-full rounded-full border border-glamour-200/90 bg-white/80 py-2 pl-10 pr-4 text-sm text-glamour-900 shadow-sm outline-none transition placeholder:text-glamour-400 focus:border-glamour-400 focus:ring-2 focus:ring-glamour-900/10"
      />
    </div>
  )
}
