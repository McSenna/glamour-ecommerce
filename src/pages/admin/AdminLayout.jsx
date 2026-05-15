import { LayoutDashboard, Shield, Store, Users } from 'lucide-react'
import { DashboardShell } from '@/layouts/DashboardShell'

const nav = [
  { to: '/admin', label: 'Overview', icon: <LayoutDashboard className="h-4 w-4" /> },
  { to: '/admin/users', label: 'Users', icon: <Users className="h-4 w-4" /> },
  { to: '/admin/sellers', label: 'Sellers', icon: <Store className="h-4 w-4" /> },
  { to: '/admin/moderation', label: 'Moderation', icon: <Shield className="h-4 w-4" /> },
]

export function AdminLayout() {
  return <DashboardShell title="Admin console" nav={nav} />
}
