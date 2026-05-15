import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ProductCard } from '@/components/product/ProductCard'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { NICHE_CATEGORIES } from '@/lib/constants'
import { fetchProducts } from '@/services/productService'
import { useEffect, useState } from 'react'

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
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div>
      <section className="relative overflow-hidden border-b border-glamour-100/80">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(180,83,9,0.08),_transparent_55%)]" />
        <Container className="relative py-16 sm:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="mb-6 bg-accent-muted text-accent">Curated for calm interiors</Badge>
              <h1 className="font-display text-4xl text-balance text-glamour-950 sm:text-5xl lg:text-6xl">
                Premium home marketplace for modern living.
              </h1>
              <p className="mt-6 max-w-xl text-base text-glamour-600 sm:text-lg">
                Discover independent makers across lighting, kitchen, decor, and smart home — with a Shopee-inspired
                flow, distilled into a softer, slower luxury experience.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center rounded-full bg-glamour-900 px-8 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-glamour-800"
                >
                  Start browsing
                </Link>
                <Link
                  to="/auth/register?role=seller"
                  className="inline-flex items-center justify-center rounded-full border border-glamour-200 bg-white/80 px-8 py-3 text-sm font-semibold text-glamour-800 shadow-sm transition hover:border-glamour-300"
                >
                  Open a shop
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08, duration: 0.55 }}
              className="relative"
            >
              <div className="glass-panel relative overflow-hidden rounded-[2rem] p-4 shadow-soft">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                  alt="Warm minimal interior"
                  className="h-[420px] w-full rounded-3xl object-cover sm:h-[480px]"
                />
                <div className="pointer-events-none absolute inset-6 rounded-3xl ring-1 ring-white/40" />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Categories"
          title="Everything for an elevated home."
          subtitle="Focused exclusively on home accessories, decor, furniture accents, kitchen, lifestyle, lighting, and smart living."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NICHE_CATEGORIES.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/shop?category=${c.slug}`}
                className="group flex flex-col rounded-3xl border border-glamour-100 bg-white/90 p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-glamour-500">Browse</span>
                <span className="mt-3 font-display text-xl text-glamour-950 transition group-hover:text-accent">
                  {c.label}
                </span>
                <span className="mt-4 text-sm text-glamour-500">Handpicked edits, refreshed weekly.</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>

      <Container className="pb-20">
        <SectionHeading
          eyebrow="Featured"
          title="Pieces that define a room."
          subtitle="Editorial highlights from verified sellers — optimized for performance with skeleton-ready grids."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-[420px] animate-pulse rounded-3xl bg-glamour-100" />
              ))
            : featured.map((p, index) => <ProductCard key={p._id} product={p} index={index} />)}
        </div>
      </Container>
    </div>
  )
}
