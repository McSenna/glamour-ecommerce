import { api } from '@/lib/api'

export async function fetchServerCart() {
  const { data } = await api.get('/cart')
  return data.lines || []
}

export async function saveServerCart(lines) {
  const { data } = await api.put('/cart', { lines })
  return data.lines || []
}
