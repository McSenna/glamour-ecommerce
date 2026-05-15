import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ProductCard } from '@/components/product/ProductCard'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Container } from '@/components/ui/Container'
import { Input } from '@/components/ui/Input'
import { useDebounce } from '@/hooks/useDebounce'
import { NICHE_CATEGORIES } from '@/lib/constants'
import { fetchProducts } from '@/services/productService'

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [localQ, setLocalQ] = useState(searchParams.get('q') || '')
  const debouncedQ = useDebounce(localQ, 300)

  const filters = useMemo(
    () => ({
      category: searchParams.get('category') || undefined,
      filter: searchParams.get('filter') || undefined,
      minPrice: searchParams.get('minPrice') || undefined,
      maxPrice: searchParams.get('maxPrice') || undefined,
      seller: searchParams.get('seller') || undefined,
      sort: searchParams.get('sort') || undefined,
      q: debouncedQ || undefined,
    }),
    [searchParams, debouncedQ],
  )

  const filtersKey = useMemo(() => JSON.stringify(filters), [filters])

  return (
    <Container className="py-10 sm:py-14">
      <SectionHeading
        eyebrow="Marketplace"
        title="Shop the collection."
        subtitle="Debounced search, category routing, and filter chips mirror a production discovery layer."
      />
      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-6 rounded-3xl border border-glamour-100 bg-white/80 p-6 shadow-card backdrop-blur-sm">
          <Input label="Search" placeholder="Vases, lighting, textiles…" value={localQ} onChange={(e) => setLocalQ(e.target.value)} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-glamour-500">Categories</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-glamour-700">
              {NICHE_CATEGORIES.map((c) => (
                <Link key={c.slug} className="rounded-xl px-2 py-2 hover:bg-glamour-50" to={`/shop?category=${c.slug}`}>
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </aside>
        <div>
          <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-glamour-600">
            <FilterChip label="Featured" to="/shop?filter=featured" />
            <FilterChip label="Trending" to="/shop?filter=trending" />
            <FilterChip label="Under $150" to="/shop?maxPrice=150" />
            <span className="hidden h-4 w-px bg-glamour-200 sm:inline" aria-hidden />
            <label className="flex items-center gap-2 text-glamour-700">
              <span className="text-glamour-500">Sort</span>
              <select
                className="rounded-full border border-glamour-200 bg-white px-3 py-1.5 text-xs font-medium text-glamour-800 shadow-sm"
                value={searchParams.get('sort') || ''}
                onChange={(e) => {
                  const next = new URLSearchParams(searchParams)
                  if (e.target.value) next.set('sort', e.target.value)
                  else next.delete('sort')
                  setSearchParams(next)
                }}
              >
                <option value="">Recommended</option>
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </label>
          </div>
          <ShopProductGrid key={filtersKey} filters={filters} />
        </div>
      </div>
    </Container>
  )
}

function ShopProductGrid({ filters }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const data = await fetchProducts(filters)
      if (!cancelled) {
        setItems(data)
        setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [filters])

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[420px] animate-pulse rounded-3xl bg-glamour-100" />
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-glamour-200 bg-white/70 p-12 text-center text-glamour-600">
        No products match these filters.
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((p, index) => (
        <ProductCard key={p._id} product={p} index={index} />
      ))}
    </div>
  )
}

function FilterChip({ label, to }) {
  return (
    <Link
      to={to}
      className="rounded-full border border-glamour-200 bg-white px-3 py-1 font-medium text-glamour-800 shadow-sm transition hover:border-glamour-300"
    >
      {label}
    </Link>
  )
}
