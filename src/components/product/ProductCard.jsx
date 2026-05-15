import { motion } from 'framer-motion'
import { Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { useCartStore } from '@/store/useCartStore'
import { useModalStore } from '@/store/useModalStore'
import { useWishlistStore } from '@/store/useWishlistStore'

export function ProductCard({ product, index = 0 }) {
  const toggleWishlist = useWishlistStore((s) => s.toggle)
  const wishlisted = useWishlistStore((s) => s.has(product._id))
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useModalStore((s) => s.openCart)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-glamour-100 bg-white/90 shadow-card"
    >
      <Link to={`/product/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden">
        <img
          src={product.images?.[0] || '/placeholder-product.svg'}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-glamour-950/25 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-glamour-500">{product.shopName}</p>
            <Link to={`/product/${product.slug}`} className="mt-1 block">
              <h3 className="font-display text-lg text-glamour-900 transition group-hover:text-glamour-700">
                {product.name}
              </h3>
            </Link>
          </div>
          <button
            type="button"
            aria-label="Wishlist"
            onClick={() => toggleWishlist(product._id)}
            className={cn(
              'rounded-full p-2 transition',
              wishlisted ? 'bg-accent-muted text-accent' : 'bg-glamour-100 text-glamour-500 hover:bg-glamour-200',
            )}
          >
            <Heart className={cn('h-4 w-4', wishlisted && 'fill-current')} />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-sm font-semibold text-glamour-900">
            ${(Number(product.price) || 0).toFixed(2)}
            {product.compareAt ? (
              <span className="ml-2 text-xs font-normal text-glamour-400 line-through">
                ${(Number(product.compareAt) || 0).toFixed(2)}
              </span>
            ) : null}
          </p>
          <button
            type="button"
            onClick={() => {
              addItem({
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.images?.[0],
                shopId: product.shopId,
                shopName: product.shopName,
                variantKey: product.variants?.[0]?.sku || 'default',
                slug: product.slug,
                quantity: 1,
              })
              openCart()
            }}
            className="inline-flex items-center gap-2 rounded-full bg-glamour-900 px-4 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-glamour-800 active:scale-[0.98]"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>
    </motion.article>
  )
}
