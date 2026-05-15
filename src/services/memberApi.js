import { api } from '@/lib/api'

export async function postAddress(body) {
  const { data } = await api.post('/members/me/addresses', body)
  return data.addresses
}

export async function setDefaultAddress(addressId) {
  const { data } = await api.patch(`/members/me/addresses/${addressId}/default`)
  return data.addresses
}

export async function deleteAddress(addressId) {
  const { data } = await api.delete(`/members/me/addresses/${addressId}`)
  return data.addresses
}
