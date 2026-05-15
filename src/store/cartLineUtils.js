export function mapLinesFromServer(lines) {
  return (lines || []).map((l) => ({
    lineId: l.lineId,
    productId: l.productId,
    name: l.name ?? 'Item',
    price: Number(l.price) || 0,
    image: l.image,
    shopId: l.shopId,
    shopName: l.shopName ?? '',
    variantKey: l.variantKey || 'default',
    slug: l.slug,
    quantity: Math.min(999, Math.max(1, Number(l.quantity) || 1)),
  }))
}

export function normalizeCartAddPayload(raw) {
  if (!raw?.productId) return null
  const variantKey = raw.variantKey || 'default'
  const quantity = Math.min(999, Math.max(1, Math.floor(Number(raw.quantity) || 1)))
  const price = Number(raw.price)
  if (!Number.isFinite(price) || price < 0) return null
  return {
    productId: String(raw.productId),
    name: String(raw.name || 'Product').slice(0, 240),
    price,
    image: raw.image || undefined,
    shopId: raw.shopId != null ? String(raw.shopId) : '',
    shopName: raw.shopName ? String(raw.shopName).slice(0, 120) : '',
    variantKey: String(variantKey).slice(0, 80),
    slug: raw.slug ? String(raw.slug).slice(0, 160) : undefined,
    quantity,
    lineId: raw.lineId,
  }
}
