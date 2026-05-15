import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ProductCard } from '@/components/product/ProductCard'
import { NICHE_CATEGORIES } from '@/lib/constants'
import { fetchProducts } from '@/services/productService'
import { useEffect, useState } from 'react'

const stagger = (i = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: i * 0.08 },
})

const scrollIn = (i = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: i * 0.07 },
})

const TICKER_ITEMS = [
  'Free shipping over ₱1,500',
  'Lighting',
  'Kitchen Essentials',
  'Home Decor',
  'Smart Living',
  'Textiles & Soft Furnishings',
  'New arrivals every week',
  'Verified independent makers',
  'Outdoor & Garden',
]

export function HomePage() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const items = await fetchProducts({ filter: 'featured' })
      if (!cancelled) {
        setFeatured(items)
        setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="w-full max-w-[96rem] mx-auto">

      {/* ─── HERO — full viewport height with ticker pinned to bottom ─── */}
      <section className="relative flex flex-col" style={{ height: 'calc(100vh - 64px)', minHeight: 560 }}>

        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85"
            alt="Warm minimal interior"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-glamour-950/75 via-glamour-950/40 to-glamour-950/10" />
        </div>

        {/* Hero content — vertically centered */}
        <div className="relative flex flex-1 items-center px-6 sm:px-12 lg:px-20">
          <div className="w-full max-w-2xl">

            {/* Trust pill */}
            <motion.div
              {...stagger(0)}
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 backdrop-blur-sm"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-white/90">
                340+ verified makers · Shipped across the Philippines
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...stagger(1)}
              className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Your home,{' '}
              <span className="text-amber-300">beautifully</span>{' '}
              curated.
            </motion.h1>

            <motion.p
              {...stagger(2)}
              className="mt-4 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg"
            >
              Premium lighting, kitchen, decor, and smart home products from independent Filipino makers — all in one place.
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...stagger(3)} className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-glamour-950 shadow-lg transition hover:bg-amber-50 hover:shadow-xl active:scale-95"
              >
                Shop now →
              </Link>
              <Link
                to="/shop?filter=new"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
              >
                New arrivals
              </Link>
            </motion.div>

            {/* Quick stats */}
            <motion.div {...stagger(4)} className="mt-10 flex flex-wrap gap-8">
              {[
                { n: '2,400+', label: 'Products' },
                { n: '340', label: 'Makers' },
                { n: '4.9 ★', label: 'Rating' },
                { n: 'Free', label: 'Returns' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-xl font-bold text-white">{s.n}</p>
                  <p className="text-xs text-white/60">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── TICKER pinned to bottom of hero, always visible on load ── */}
        <div className="relative overflow-hidden bg-glamour-950/90 backdrop-blur-sm py-3">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
            className="flex whitespace-nowrap"
          >
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="flex items-center">
                <span className="px-6 text-xs font-medium uppercase tracking-widest text-white/70">
                  {item}
                </span>
                <span className="text-amber-400/60">✦</span>
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="px-6 py-12 sm:px-12 lg:px-20">
        <motion.div {...scrollIn(0)} className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-glamour-400">Browse</p>
            <h2 className="font-display text-2xl font-bold text-glamour-950 sm:text-3xl">Shop by category</h2>
          </div>
          <Link
            to="/shop"
            className="hidden text-sm font-medium text-glamour-500 underline underline-offset-4 hover:text-glamour-900 sm:block"
          >
            View all →
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {NICHE_CATEGORIES.map((c, i) => (
            <motion.div key={c.slug} {...scrollIn(i * 0.05)}>
              <Link
                to={`/shop?category=${c.slug}`}
                className="group flex flex-col gap-2 rounded-2xl border border-glamour-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-glamour-200 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-glamour-50 text-lg">
                  {['🪔', '🍳', '🛋️', '💡', '🌿', '🛁', '📦', '✨'][i % 8]}
                </div>
                <span className="mt-1 font-semibold text-glamour-900 transition group-hover:text-accent">
                  {c.label}
                </span>
                <span className="text-xs text-glamour-400">Shop now →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="bg-glamour-50 px-6 py-12 sm:px-12 lg:px-20">
        <motion.div {...scrollIn()} className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-glamour-400">Hand-picked</p>
            <h2 className="font-display text-2xl font-bold text-glamour-950 sm:text-3xl">Featured this week</h2>
          </div>
          <Link
            to="/shop?filter=featured"
            className="hidden text-sm font-medium text-glamour-500 underline underline-offset-4 hover:text-glamour-900 sm:block"
          >
            See all →
          </Link>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                  <div className="aspect-[4/3] animate-pulse bg-glamour-100" />
                  <div className="space-y-2 p-4">
                    <div className="h-4 w-3/4 animate-pulse rounded-full bg-glamour-100" />
                    <div className="h-4 w-1/3 animate-pulse rounded-full bg-glamour-100" />
                  </div>
                </div>
              ))
            : featured.map((p, i) => (
                <motion.div key={p._id} {...scrollIn(i * 0.07)}>
                  <ProductCard product={p} index={i} />
                </motion.div>
              ))}
        </div>
      </section>

      {/* ─── EDITORIAL BANNER ─── */}
      <section className="px-6 py-12 sm:px-12 lg:px-20">
        <motion.div {...scrollIn()} className="relative overflow-hidden rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1800&q=80"
            alt="Styled interior"
            className="h-64 w-full object-cover sm:h-80 lg:h-96"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-glamour-950/70 to-glamour-950/20" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-14">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-300">
              The Edit — Summer 2025
            </p>
            <h2 className="max-w-sm font-display text-3xl font-bold text-white sm:text-4xl">
              The art of slow living.
            </h2>
            <Link
              to="/shop?collection=summer"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-glamour-950 transition hover:bg-amber-50 active:scale-95"
            >
              Explore collection →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── TRUST STRIP ─── */}
      <section className="border-y border-glamour-100 bg-white px-6 py-8 sm:px-12 lg:px-20">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { icon: '🚚', title: 'Free shipping', desc: 'On orders over ₱1,500' },
            { icon: '🔄', title: 'Easy returns', desc: '30-day hassle-free returns' },
            { icon: '✅', title: 'Verified makers', desc: 'Every seller is vetted' },
            { icon: '💬', title: '24/7 support', desc: 'Always here to help' },
          ].map((t, i) => (
            <motion.div key={t.title} {...scrollIn(i * 0.06)} className="flex items-start gap-3">
              <span className="text-2xl">{t.icon}</span>
              <div>
                <p className="text-sm font-semibold text-glamour-900">{t.title}</p>
                <p className="text-xs text-glamour-400">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="px-6 py-16 sm:px-12 lg:px-20">
        <motion.div {...scrollIn()} className="mx-auto max-w-lg text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-glamour-400">Stay in the loop</p>
          <h2 className="font-display text-2xl font-bold text-glamour-950 sm:text-3xl">Get the weekly edit.</h2>
          <p className="mt-3 text-sm text-glamour-500">
            New arrivals, maker spotlights, and home inspiration — every Friday.
          </p>
          <div className="mt-6 flex overflow-hidden rounded-full border border-glamour-200 bg-white shadow-sm">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-5 py-3.5 text-sm text-glamour-900 placeholder:text-glamour-300 outline-none"
            />
            <button className="rounded-full bg-glamour-950 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-glamour-800 active:scale-95">
              Subscribe
            </button>
          </div>
          <p className="mt-3 text-xs text-glamour-300">No spam. Unsubscribe any time.</p>
        </motion.div>
      </section>

      {/* ─── SELLER CTA ─── */}
      <section className="bg-glamour-950 px-6 py-14 text-center sm:px-12 lg:px-20">
        <motion.div {...scrollIn()}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-glamour-400">For makers</p>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Sell your work here.</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-glamour-400">
            Join 340+ independent makers reaching thousands of home-lovers across the Philippines.
          </p>
          <Link
            to="/auth/register?role=seller"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-glamour-950 transition hover:bg-amber-50 active:scale-95"
          >
            Open your shop →
          </Link>
        </motion.div>
      </section>

    </div>
  )
}