import { Card } from '@/components/ui/Card'

const rows = [
  { id: 'ORD-9001', buyer: 'A. Laurent', total: 128, status: 'to_ship' },
  { id: 'ORD-9002', buyer: 'M. Chen', total: 64, status: 'paid' },
]

export function SellerOrdersPage() {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-glamour-100 px-6 py-4">
        <p className="font-display text-xl text-glamour-950">Orders</p>
        <p className="text-xs text-glamour-500">Minimal tables with soft hover states.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-glamour-50/80 text-xs uppercase tracking-wide text-glamour-500">
            <tr>
              <th className="px-6 py-3 font-medium">Order</th>
              <th className="px-6 py-3 font-medium">Buyer</th>
              <th className="px-6 py-3 font-medium">Total</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-glamour-100 transition hover:bg-glamour-50/60">
                <td className="px-6 py-4 font-medium text-glamour-900">{r.id}</td>
                <td className="px-6 py-4 text-glamour-600">{r.buyer}</td>
                <td className="px-6 py-4">${r.total}</td>
                <td className="px-6 py-4 capitalize text-glamour-700">{r.status.replace('_', ' ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
