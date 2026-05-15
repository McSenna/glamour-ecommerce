import { Card } from '@/components/ui/Card'

export function SellerProductsPage() {
  return (
    <Card>
      <p className="font-display text-xl text-glamour-950">Product management</p>
      <p className="mt-2 text-sm text-glamour-600">
        Variants (color, size, material, style), SKU stock, moderation states, and multi-image galleries map to the
        Product schema on the API.
      </p>
    </Card>
  )
}
