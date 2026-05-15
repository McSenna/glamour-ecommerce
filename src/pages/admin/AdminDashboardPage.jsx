import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const mix = [
  { name: 'Customers', value: 62 },
  { name: 'Sellers', value: 24 },
  { name: 'Admins', value: 6 },
]
const palette = ['#292524', '#b45309', '#a8a29e']

export function AdminDashboardPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <p className="text-xs uppercase tracking-wide text-glamour-500">Platform health</p>
          <p className="mt-3 font-display text-3xl text-glamour-950">Stable</p>
          <p className="mt-2 text-sm text-glamour-600">
            Seller approvals, product moderation, and analytics share the same service boundaries as Shopee-scale
            marketplaces — trimmed for clarity here.
          </p>
        </Card>
      </motion.div>
      <Card className="p-0">
        <div className="border-b border-glamour-100 px-6 py-4">
          <p className="text-sm font-semibold text-glamour-900">Role distribution</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={mix} dataKey="value" innerRadius={60} outerRadius={90} paddingAngle={4}>
                {mix.map((_, i) => (
                  <Cell key={mix[i].name} fill={palette[i % palette.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
