export function CheckoutSummary({ subtotal, discount, shippingEstimate, itemCount }) {
  const total = Math.max(0, subtotal - discount + shippingEstimate)

  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between text-glamour-600">
        <span>Subtotal ({itemCount} items)</span>
        <span className="font-medium text-glamour-900">${subtotal.toFixed(2)}</span>
      </div>
      {discount > 0 ? (
        <div className="flex justify-between text-emerald-700">
          <span>Discount</span>
          <span>−${discount.toFixed(2)}</span>
        </div>
      ) : null}
      <div className="flex justify-between text-glamour-600">
        <span>Shipping (est.)</span>
        <span className="font-medium text-glamour-900">${shippingEstimate.toFixed(2)}</span>
      </div>
      <div className="border-t border-glamour-100 pt-3">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-glamour-500">Total</span>
          <span className="text-2xl font-bold text-glamour-950">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
