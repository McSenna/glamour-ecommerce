import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useCartStore } from '@/store/useCartStore'
import { useModalStore } from '@/store/useModalStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { fetchProductBySlug } from '@/services/productService'
import { cn } from '@/lib/cn'

export function ProductPage() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [imageIx, setImageIx] = useState(0)
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useModalStore((s) => s.openCart)
  const toggleWishlist = useWishlistStore((s) => s.toggle)
  const wishlisted = useWishlistStore((s) => s.has(product?._id))

  useEffect(() => {
    setImageIx(0)
    let cancelled = false
    ;(async () => {
      const p = await fetchProductBySlug(slug)
      if (!cancelled) setProduct(p)
    })()
    return () => {
      cancelled = true
    }
  }, [slug])

  if (!product) {
    return (
      <Container className="py-20">
        <div className="h-[480px] animate-pulse rounded-3xl bg-glamour-100" />
      </Container>
    )
  }

  return (
    <Container className="py-10 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <motion.div layout className="overflow-hidden rounded-[2rem] border border-glamour-100 bg-white shadow-card">
            <img
              src={product.images?.[imageIx] || product.images?.[0]}
              alt={product.name}
              className="aspect-[4/5] w-full object-cover"
            />
          </motion.div>
          {product.images?.length > 1 ? (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => setImageIx(i)}
                  className={cn(
                    'h-16 w-16 shrink-0 overflow-hidden rounded-xl border bg-glamour-50 ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    imageIx === i ? 'border-accent ring-2 ring-accent/30' : 'border-glamour-200',
                  )}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div className="space-y-6">
          <Badge>{product.shopName}</Badge>
          <h1 className="font-display text-4xl text-glamour-950">{product.name}</h1>
          <p className="text-sm leading-relaxed text-glamour-600">
            {product.descriptionRich || 'Premium listing with gallery, structured variants, and secure checkout through Glamour.'}
          </p>
          <div className="flex items-baseline gap-3">
            <p className="text-3xl font-semibold text-glamour-900">${(Number(product.price) || 0).toFixed(2)}</p>
            {product.compareAt ? (
              <p className="text-sm text-glamour-400 line-through">${(Number(product.compareAt) || 0).toFixed(2)}</p>
            ) : null}
            {product.ratingAvg ? (
              <span className="text-sm text-glamour-500">
                {Number(product.ratingAvg).toFixed(1)}★ {product.ratingCount ? `(${product.ratingCount})` : ''}
              </span>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => {
                addItem({
                  productId: product._id,
                  name: product.name,
                  price: product.price,
                  image: product.images?.[imageIx] || product.images?.[0],
                  shopId: product.shopId,
                  shopName: product.shopName,
                  variantKey: product.variants?.[0]?.sku || 'default',
                  slug: product.slug,
                  quantity: 1,
                })
                openCart()
              }}
            >
              Add to cart
            </Button>
            <Button size="lg" variant="ghost" type="button" onClick={() => toggleWishlist(product._id)}>
              {wishlisted ? 'Saved' : 'Save to wishlist'}
            </Button>
          </div>
          <div className="rounded-3xl border border-glamour-100 bg-glamour-50/60 p-6 text-sm text-glamour-600">
            <p className="font-medium text-glamour-900">Order timeline</p>
            <p className="mt-2">
              After checkout, track your parcel from Order Placed through Delivered with live updates and an estimated
              delivery date — similar to leading marketplaces, refined for Glamour.
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}
