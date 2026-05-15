import { LayoutDashboard, LineChart, Package, ShoppingCart } from 'lucide-react'
import { DashboardShell } from '@/layouts/DashboardShell'

const nav = [
  { to: '/seller', label: 'Overview', icon: <LayoutDashboard className="h-4 w-4" /> },
  { to: '/seller/products', label: 'Products', icon: <Package className="h-4 w-4" /> },
  { to: '/seller/orders', label: 'Orders', icon: <ShoppingCart className="h-4 w-4" /> },
  { to: '/seller/analytics', label: 'Analytics', icon: <LineChart className="h-4 w-4" /> },
]

export function SellerLayout() {
  return <DashboardShell title="Seller studio" nav={nav} />
}
