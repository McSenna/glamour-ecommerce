import { api } from '@/lib/api'

export async function fetchMyOrders() {
  const { data } = await api.get('/orders/mine')
  return data.orders || []
}

export async function fetchOrderByTracking(trackingId) {
  const { data } = await api.get(`/orders/track/${encodeURIComponent(trackingId)}`)
  return data.order
}

export async function postCheckout(payload) {
  const { data } = await api.post('/orders/checkout', payload)
  return data.order
}
