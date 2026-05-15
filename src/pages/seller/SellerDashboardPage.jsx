import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

const trend = [
  { label: 'Mon', revenue: 1200 },
  { label: 'Tue', revenue: 1800 },
  { label: 'Wed', revenue: 1600 },
  { label: 'Thu', revenue: 2100 },
  { label: 'Fri', revenue: 2400 },
  { label: 'Sat', revenue: 3200 },
  { label: 'Sun', revenue: 2800 },
]

export function SellerDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Gross revenue', value: '$48.2k', delta: '+12.4%' },
          { label: 'Orders', value: '326', delta: '+4.1%' },
          { label: 'Conversion', value: '3.8%', delta: '+0.6%' },
        ].map((kpi) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <p className="text-xs uppercase tracking-wide text-glamour-500">{kpi.label}</p>
              <p className="mt-3 font-display text-3xl text-glamour-950">{kpi.value}</p>
              <p className="mt-2 text-xs font-semibold text-emerald-600">{kpi.delta} vs last week</p>
            </Card>
          </motion.div>
        ))}
      </div>
      <Card className="p-0">
        <div className="border-b border-glamour-100 px-6 py-4">
          <p className="text-sm font-semibold text-glamour-900">Revenue curve</p>
          <p className="text-xs text-glamour-500">Recharts + aggregation-ready service layer.</p>
        </div>
        <div className="h-72 px-2 py-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#b45309" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#b45309" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" stroke="#a8a29e" tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 16, borderColor: '#e7e5e4', boxShadow: '0 12px 40px -16px rgba(28,25,23,0.08)' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#b45309" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
