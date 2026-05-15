import { Minus, Plus } from 'lucide-react'

export function QuantityController({ quantity, onDecrement, onIncrement }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-glamour-200 bg-glamour-50/80 p-0.5 text-sm font-medium text-glamour-900">
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white"
        aria-label="Decrease quantity"
        onClick={onDecrement}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-[2ch] text-center tabular-nums">{quantity}</span>
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white"
        aria-label="Increase quantity"
        onClick={onIncrement}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}
