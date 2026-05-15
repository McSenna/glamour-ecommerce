import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { FulfillmentTimeline } from '@/components/orders/FulfillmentTimeline'
import { fetchOrderByTracking } from '@/services/orderApi'

export function OrderTrackingPage() {
  const { trackingId } = useParams()
  const [order, setOrder] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const o = await fetchOrderByTracking(trackingId)
        if (!cancelled) setOrder(o)
      } catch (e) {
        if (!cancelled) {
          setError(e.response?.status === 404 ? 'We could not find this order.' : 'Unable to load tracking.')
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [trackingId])

  if (error) {
    return (
      <Container className="py-20 text-center">
        <p className="text-glamour-700">{error}</p>
        <Link to="/account/orders" className="mt-4 inline-block text-sm font-semibold text-accent underline">
          Back to orders
        </Link>
      </Container>
    )
  }

  if (!order) {
    return (
      <Container className="py-20">
        <div className="mx-auto max-w-xl space-y-4">
          <div className="h-10 w-48 animate-pulse rounded-xl bg-glamour-100" />
          <div className="h-64 animate-pulse rounded-3xl bg-glamour-100" />
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-12 sm:py-16">
      <Link to="/account/orders" className="text-sm font-medium text-accent underline-offset-4 hover:underline">
        ← Orders
      </Link>
      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_340px]">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-glamour-500">Tracking</p>
          <h1 className="font-display text-3xl text-glamour-950 sm:text-4xl">{order.trackingId}</h1>
          <p className="mt-2 text-sm text-glamour-600">
            Payment: <span className="font-medium capitalize">{String(order.paymentMethod || '').replace(/_/g, ' ')}</span>
            {' · '}
            Total:{' '}
            <span className="font-semibold text-glamour-900">${Number(order.total).toFixed(2)}</span>
          </p>
          <div className="mt-10 rounded-3xl border border-glamour-100 bg-white/90 p-8 shadow-card">
            <h2 className="font-display text-xl text-glamour-900">Shipment progress</h2>
            <div className="mt-8">
              <FulfillmentTimeline
                currentKey={order.fulfillment || 'order_placed'}
                estimatedDate={order.estimatedDeliveryAt}
              />
            </div>
          </div>
        </div>
        <aside className="h-fit rounded-3xl border border-glamour-100 bg-glamour-50/80 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-glamour-500">Delivery</p>
          <p className="mt-4 text-sm font-medium text-glamour-900">{order.shippingAddress?.fullName}</p>
          <p className="mt-2 text-sm text-glamour-600">
            {order.shippingAddress?.line1}
            {order.shippingAddress?.line2 ? `, ${order.shippingAddress.line2}` : ''}
            <br />
            {order.shippingAddress?.city}
            {order.shippingAddress?.region ? `, ${order.shippingAddress.region}` : ''}{' '}
            {order.shippingAddress?.postal}
            <br />
            {order.shippingAddress?.country}
            <br />
            <span className="mt-2 inline-block text-glamour-800">{order.shippingAddress?.phone}</span>
          </p>
        </aside>
      </div>
    </Container>
  )
}
