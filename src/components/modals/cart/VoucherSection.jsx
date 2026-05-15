import { Tag } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function VoucherSection({ onApply, appliedCode, discountAmount }) {
  const [code, setCode] = useState('')

  return (
    <div className="rounded-2xl border border-dashed border-glamour-200 bg-glamour-50/50 p-4">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-glamour-600">
        <Tag className="h-3.5 w-3.5" />
        Voucher
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input
            placeholder="Enter voucher code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="rounded-xl py-2.5 text-sm"
          />
        </div>
        <Button
          type="button"
          variant="ghost"
          className="shrink-0 rounded-xl px-4"
          onClick={() => onApply(code.trim())}
        >
          Apply
        </Button>
      </div>
      {appliedCode ? (
        <p className="mt-2 text-xs text-emerald-700">
          Applied <span className="font-semibold">{appliedCode}</span>
          {discountAmount > 0 ? ` · −$${discountAmount.toFixed(2)}` : ''}
        </p>
      ) : (
        <p className="mt-2 text-xs text-glamour-500">Try SAVE10 for 10% off (demo).</p>
      )}
    </div>
  )
}
