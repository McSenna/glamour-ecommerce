export const APP_NAME = 'Glamour'

/** Customer order tracking pipeline (aligned with API). */
export const FULFILLMENT_STEPS = [
  { key: 'order_placed', label: 'Order Placed' },
  { key: 'processing', label: 'Processing' },
  { key: 'packed', label: 'Packed' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'out_for_delivery', label: 'Out for Delivery' },
  { key: 'delivered', label: 'Delivered' },
]

export const PAYMENT_OPTIONS = [
  { id: 'gcash', label: 'GCash', group: 'E-wallet' },
  { id: 'paymaya', label: 'PayMaya', group: 'E-wallet' },
  { id: 'paypal', label: 'PayPal', group: 'E-wallet' },
  { id: 'cod', label: 'Cash on Delivery (COD)', group: 'Offline' },
  { id: 'bank_transfer', label: 'Bank transfer', group: 'Offline' },
  { id: 'glamour_points', label: 'Glamour Points (full balance)', group: 'Rewards' },
]

export const NICHE_CATEGORIES = [
  { slug: 'house-accessories', label: 'House Accessories' },
  { slug: 'home-decor', label: 'Home Decor' },
  { slug: 'furniture-accents', label: 'Furniture Accents' },
  { slug: 'kitchen-essentials', label: 'Kitchen Essentials' },
  { slug: 'interior-lifestyle', label: 'Interior Lifestyle' },
  { slug: 'lighting-decorations', label: 'Lighting & Decorations' },
  { slug: 'smart-home', label: 'Smart Home' },
]

export const USER_ROLES = {
  CUSTOMER: 'customer',
  SELLER: 'seller',
  ADMIN: 'admin',
}
