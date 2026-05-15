import { Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { QuantityController } from '@/components/modals/cart/QuantityController'

export function CartItemCard({ line, onRemove, onQtyChange }) {
  const lineTotal = (line.price || 0) * (line.quantity || 1)

  return (
    <div className="flex gap-3 rounded-2xl border border-glamour-100/90 bg-white/90 p-3 shadow-sm">
      <Link
        to={`/product/${line.slug}`}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-glamour-100"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={line.image || '/placeholder-product.svg'} alt="" className="h-full w-full object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-xs font-medium uppercase tracking-wide text-glamour-500">{line.shopName}</p>
            <Link
              to={`/product/${line.slug}`}
              className="line-clamp-2 text-sm font-semibold text-glamour-900 hover:text-accent"
              onClick={(e) => e.stopPropagation()}
            >
              {line.name}
            </Link>
            {line.variantKey && line.variantKey !== 'default' ? (
              <p className="mt-0.5 text-xs text-glamour-500">Variant: {line.variantKey}</p>
            ) : null}
          </div>
          <button
            type="button"
            className="shrink-0 self-start rounded-full p-2 text-glamour-400 transition hover:bg-red-50 hover:text-red-500"
            aria-label="Remove item"
            onClick={() => onRemove(line.lineId)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2">
          <QuantityController
            quantity={line.quantity}
            onDecrement={() => onQtyChange(line.lineId, line.quantity - 1)}
            onIncrement={() => onQtyChange(line.lineId, line.quantity + 1)}
          />
          <p className="text-sm font-bold text-glamour-950">${lineTotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}
