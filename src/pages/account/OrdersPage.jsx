import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { FULFILLMENT_STEPS } from '@/lib/constants'
import { fetchMyOrders } from '@/services/orderApi'

function labelForFulfillment(key) {
  return FULFILLMENT_STEPS.find((s) => s.key === key)?.label || key?.replace(/_/g, ' ') || '—'
}

export function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const list = await fetchMyOrders()
        if (!cancelled) setOrders(list)
      } catch {
        if (!cancelled) setOrders([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Container className="py-14">
      <p className="text-xs uppercase tracking-[0.25em] text-glamour-500">Orders</p>
      <h1 className="font-display text-3xl text-glamour-950">Your Glamour orders</h1>
      <p className="mt-2 max-w-2xl text-sm text-glamour-600">
        Every order receives a unique tracking ID. Open any row to follow the Shopee-style fulfillment timeline.
      </p>
      <div className="mt-10 space-y-4">
        {loading ? (
          <div className="h-32 animate-pulse rounded-3xl bg-glamour-100" />
        ) : orders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-glamour-200 bg-white/70 p-12 text-center text-glamour-600">
            No orders yet. Discover the collection in the shop.
            <Link to="/shop" className="mt-4 block text-sm font-semibold text-accent underline">
              Browse products
            </Link>
          </div>
        ) : (
          orders.map((o) => (
            <Link
              key={String(o._id)}
              to={`/orders/track/${encodeURIComponent(o.trackingId)}`}
              className="flex flex-col gap-4 rounded-3xl border border-glamour-100 bg-white/95 p-6 shadow-card transition hover:border-accent/30 hover:shadow-soft sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-xs text-glamour-500">{new Date(o.createdAt).toLocaleString()}</p>
                <p className="font-mono text-sm font-semibold text-glamour-900">{o.trackingId}</p>
              </div>
              <Badge className="w-fit capitalize">{labelForFulfillment(o.fulfillment)}</Badge>
              <p className="text-lg font-semibold text-glamour-900">${Number(o.total).toFixed(2)}</p>
            </Link>
          ))
        )}
      </div>
    </Container>
  )
}
