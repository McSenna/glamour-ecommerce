import { Card } from '@/components/ui/Card'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const data = [
  { label: 'Decor', value: 42 },
  { label: 'Lighting', value: 28 },
  { label: 'Kitchen', value: 36 },
  { label: 'Smart', value: 18 },
]

export function SellerAnalyticsPage() {
  return (
    <Card className="p-0">
      <div className="border-b border-glamour-100 px-6 py-4">
        <p className="font-display text-xl text-glamour-950">Category mix</p>
        <p className="text-xs text-glamour-500">Aggregation pipelines power these widgets.</p>
      </div>
      <div className="h-72 px-2 py-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="label" stroke="#a8a29e" tickLine={false} axisLine={false} />
            <YAxis stroke="#a8a29e" tickLine={false} axisLine={false} />
            <Tooltip cursor={{ fill: 'rgba(231,229,228,0.45)' }} />
            <Bar dataKey="value" fill="#292524" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
