import { cn } from '@/lib/cn'
import { FULFILLMENT_STEPS } from '@/lib/constants'

export function FulfillmentTimeline({ currentKey, estimatedDate }) {
  const idx = Math.max(
    0,
    FULFILLMENT_STEPS.findIndex((s) => s.key === (currentKey || 'order_placed')),
  )

  return (
    <div className="space-y-8">
      {estimatedDate ? (
        <p className="inline-flex rounded-full bg-glamour-100 px-4 py-2 text-sm font-medium text-glamour-800">
          Estimated delivery:{' '}
          {new Date(estimatedDate).toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      ) : null}
      <ol className="relative space-y-0">
        {FULFILLMENT_STEPS.map((step, i) => {
          const done = i <= idx
          const active = i === idx
          return (
            <li key={step.key} className="relative flex gap-4 pb-10 last:pb-0">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    'z-10 flex h-4 w-4 shrink-0 rounded-full border-2 bg-white transition',
                    done ? 'border-accent shadow-[0_0_0_4px_rgba(180,83,9,0.15)]' : 'border-glamour-300',
                    active && 'scale-110',
                  )}
                />
                {i < FULFILLMENT_STEPS.length - 1 ? (
                  <span
                    className={cn(
                      'mt-1 w-px flex-1 min-h-[2.5rem] bg-gradient-to-b',
                      done ? 'from-accent/60 to-glamour-200' : 'from-glamour-200 to-glamour-200',
                    )}
                  />
                ) : null}
              </div>
              <div className="pt-0.5">
                <p className={cn('font-medium', active ? 'text-glamour-950' : 'text-glamour-600')}>{step.label}</p>
                {active ? <p className="mt-1 text-xs text-glamour-500">Current step</p> : null}
                {done && !active ? (
                  <p className="mt-1 text-xs text-glamour-400">Completed</p>
                ) : null}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
