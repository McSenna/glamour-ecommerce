import { z } from 'zod'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { PAYMENT_OPTIONS } from '@/lib/constants'
import { cn } from '@/lib/cn'
import { postCheckout } from '@/services/orderApi'
import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/useAuthStore'
import { useCheckoutStore } from '@/store/useCheckoutStore'

const addressSchema = z.object({
  fullName: z.string().min(2),
  line1: z.string().min(4),
  line2: z.string().optional(),
  city: z.string().min(2),
  region: z.string().optional(),
  postal: z.string().min(3),
  country: z.string().min(2),
  phone: z.string().min(6),
  label: z.string().max(80).optional(),
  saveAddress: z.boolean().optional(),
})

const steps = ['Delivery', 'Payment', 'Review']

export function CheckoutPage() {
  const navigate = useNavigate()
  const [idempotencyKey] = useState(
    () => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `idem-${Date.now()}`),
  )
  const user = useAuthStore((s) => s.user)
  const fetchProfile = useAuthStore((s) => s.fetchProfile)
  const subtotal = useCartStore((s) => s.subtotal())
  const items = useCartStore((s) => s.items)
  const hydrateFromServer = useCartStore((s) => s.hydrateFromServer)
  const checkoutPayment = useCheckoutStore((s) => s.paymentMethod)
  const setCheckoutPayment = useCheckoutStore((s) => s.setPaymentMethod)

  const [step, setStep] = useState(0)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [glamourPointsToApply, setGlamourPointsToApply] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const placingRef = useRef(false)

  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: '',
      line1: '',
      line2: '',
      city: '',
      region: '',
      postal: '',
      country: 'Philippines',
      phone: '',
      label: 'Home',
      saveAddress: false,
    },
  })

  const shipping = subtotal >= 75 || !items.length ? 0 : 4.99
  const pointsValue = glamourPointsToApply / 100
  const discount = Math.min(subtotal + shipping, pointsValue)
  const total = Math.max(0, subtotal + shipping - discount)

  const applySavedAddress = (a) => {
    form.reset({
      fullName: a.fullName || user?.name || '',
      line1: a.line1 || '',
      line2: a.line2 || '',
      city: a.city || '',
      region: a.region || '',
      postal: a.postal || '',
      country: a.country || 'Philippines',
      phone: a.phone || user?.phone || '',
      label: a.label || 'Home',
      saveAddress: false,
    })
  }

  const nextFromAddress = async () => {
    const ok = await form.trigger()
    if (!ok) {
      setToast({ type: 'error', message: 'Please complete all required address fields.' })
      return
    }
    setStep(1)
    setToast(null)
  }

  const nextFromPayment = () => {
    if (!checkoutPayment) {
      setToast({ type: 'error', message: 'Select a payment method.' })
      return
    }
    if (checkoutPayment === 'glamour_points') {
      const needed = Math.ceil((subtotal + shipping) * 100)
      if ((user?.glamourPoints || 0) < needed) {
        setToast({ type: 'error', message: 'Not enough Glamour Points for this order total.' })
        return
      }
    }
    setStep(2)
    setToast(null)
  }

  const placeOrder = async () => {
    if (placingRef.current) return
    placingRef.current = true
    setSubmitting(true)
    setToast(null)
    try {
      const v = form.getValues()
      const order = await postCheckout({
        idempotencyKey,
        paymentMethod: checkoutPayment,
        glamourPointsToApply: checkoutPayment === 'glamour_points' ? 0 : glamourPointsToApply,
        shippingAddress: {
          label: v.label,
          fullName: v.fullName,
          line1: v.line1,
          line2: v.line2,
          city: v.city,
          region: v.region,
          postal: v.postal,
          country: v.country,
          phone: v.phone,
        },
        saveAddressToProfile: !!v.saveAddress,
      })
      setConfirmOpen(false)
      useCheckoutStore.getState().reset()
      await hydrateFromServer()
      await fetchProfile()
      navigate(`/orders/track/${encodeURIComponent(order.trackingId)}`)
    } catch (e) {
      const msg = e.response?.data?.message || 'Checkout failed. Please try again.'
      setToast({ type: 'error', message: msg })
    } finally {
      setSubmitting(false)
      placingRef.current = false
    }
  }

  if (!items.length) {
    return (
      <Container className="py-16 text-center text-glamour-600">
        <p>Your cart is empty.</p>
        <Link to="/shop" className="mt-4 inline-block text-sm font-semibold text-accent underline">
          Continue shopping
        </Link>
      </Container>
    )
  }

  return (
    <Container className="max-w-6xl py-10 sm:py-14">
      <p className="text-xs uppercase tracking-[0.25em] text-glamour-500">Checkout</p>
      <h1 className="font-display text-3xl text-glamour-950 sm:text-4xl">Glamour secure checkout</h1>
      <p className="mt-2 max-w-2xl text-sm text-glamour-600">
        Step-by-step flow with live totals, Philippine payment options, and Glamour Points redemption.
      </p>

      {toast ? (
        <div
          className={cn(
            'mt-6 rounded-2xl border px-4 py-3 text-sm',
            toast.type === 'error'
              ? 'border-red-200 bg-red-50 text-red-800'
              : 'border-emerald-200 bg-emerald-50 text-emerald-900',
          )}
        >
          {toast.message}
        </div>
      ) : null}

      <div className="mt-10 flex flex-wrap gap-2">
        {steps.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => {
              if (i <= step) setStep(i)
            }}
            disabled={i > step}
            className={cn(
              'rounded-full px-4 py-2 text-xs font-semibold transition',
              step === i ? 'bg-glamour-900 text-white shadow-sm' : 'bg-glamour-100 text-glamour-600 hover:bg-glamour-200',
              i > step && 'cursor-not-allowed opacity-40 hover:bg-glamour-100',
            )}
          >
            {i + 1}. {label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="min-h-[420px]">
          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div
                key="addr"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="space-y-6 rounded-3xl border border-glamour-100 bg-white/95 p-6 shadow-card sm:p-8"
              >
                <h2 className="font-display text-xl text-glamour-900">Delivery address</h2>
                {user?.addresses?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {user.addresses.map((a) => (
                      <button
                        key={String(a._id)}
                        type="button"
                        onClick={() => applySavedAddress(a)}
                        className="rounded-2xl border border-glamour-200 bg-glamour-50/80 px-4 py-2 text-left text-xs text-glamour-800 transition hover:border-accent/40"
                      >
                        <span className="font-semibold">{a.label}</span>
                        <span className="mt-1 block text-glamour-600">{a.line1}</span>
                      </button>
                    ))}
                  </div>
                ) : null}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Full name" {...form.register('fullName')} error={form.formState.errors.fullName?.message} />
                  <Input label="Phone" {...form.register('phone')} error={form.formState.errors.phone?.message} />
                </div>
                <Input label="Address line 1" {...form.register('line1')} error={form.formState.errors.line1?.message} />
                <Input label="Address line 2 (optional)" {...form.register('line2')} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="City" {...form.register('city')} error={form.formState.errors.city?.message} />
                  <Input label="Region / State" {...form.register('region')} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Postal code" {...form.register('postal')} error={form.formState.errors.postal?.message} />
                  <Input label="Country" {...form.register('country')} error={form.formState.errors.country?.message} />
                </div>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-glamour-700">
                  <input type="checkbox" {...form.register('saveAddress')} className="rounded border-glamour-300" />
                  Save this address to my profile
                </label>
                <Button type="button" onClick={nextFromAddress} className="mt-2">
                  Continue to payment
                </Button>
              </motion.div>
            ) : null}

            {step === 1 ? (
              <motion.div
                key="pay"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="space-y-6 rounded-3xl border border-glamour-100 bg-white/95 p-6 shadow-card sm:p-8"
              >
                <h2 className="font-display text-xl text-glamour-900">Payment</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {PAYMENT_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      className={cn(
                        'flex cursor-pointer flex-col rounded-2xl border px-4 py-3 text-sm transition hover:border-accent/50',
                        checkoutPayment === opt.id
                          ? 'border-accent bg-accent-muted shadow-sm'
                          : 'border-glamour-200 bg-white',
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="pay"
                          value={opt.id}
                          checked={checkoutPayment === opt.id}
                          onChange={() => setCheckoutPayment(opt.id)}
                        />
                        <span className="font-medium text-glamour-900">{opt.label}</span>
                      </div>
                      <span className="mt-1 pl-7 text-xs text-glamour-500">{opt.group}</span>
                    </label>
                  ))}
                </div>
                {checkoutPayment !== 'glamour_points' ? (
                  <div className="rounded-2xl border border-glamour-100 bg-glamour-50/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-glamour-500">Glamour Points</p>
                    <p className="mt-1 text-sm text-glamour-600">
                      Balance: <span className="font-semibold text-glamour-900">{user?.glamourPoints ?? 0}</span> pts
                      (100 pts = $1 off)
                    </p>
                    <input
                      type="number"
                      min={0}
                      max={user?.glamourPoints || 0}
                      value={glamourPointsToApply}
                      onChange={(e) =>
                        setGlamourPointsToApply(
                          Math.min(
                            user?.glamourPoints || 0,
                            Math.max(0, Math.floor(Number(e.target.value) || 0)),
                          ),
                        )
                      }
                      className="mt-3 w-full rounded-xl border border-glamour-200 px-3 py-2 text-sm"
                    />
                  </div>
                ) : (
                  <p className="text-sm text-glamour-600">
                    Full order total will be paid with Glamour Points at the current redemption rate.
                  </p>
                )}
                <div className="flex flex-wrap gap-3">
                  <Button type="button" variant="ghost" onClick={() => setStep(0)}>
                    Back
                  </Button>
                  <Button type="button" onClick={nextFromPayment}>
                    Review order
                  </Button>
                </div>
              </motion.div>
            ) : null}

            {step === 2 ? (
              <motion.div
                key="rev"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="space-y-6 rounded-3xl border border-glamour-100 bg-white/95 p-6 shadow-card sm:p-8"
              >
                <h2 className="font-display text-xl text-glamour-900">Review & confirm</h2>
                <ul className="divide-y divide-glamour-100 text-sm">
                  {items.map((i) => (
                    <li key={i.lineId} className="flex justify-between gap-4 py-3">
                      <span className="text-glamour-700">
                        {i.name} × {i.quantity}
                      </span>
                      <span className="font-medium text-glamour-900">
                        ${((i.price || 0) * (i.quantity || 1)).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-2xl bg-glamour-50/80 p-4 text-sm text-glamour-700">
                  <p>
                    <span className="font-semibold">Ship to:</span> {form.getValues('fullName')}, {form.getValues('line1')},{' '}
                    {form.getValues('city')}
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold">Payment:</span>{' '}
                    {PAYMENT_OPTIONS.find((p) => p.id === checkoutPayment)?.label}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button type="button" variant="ghost" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="button" onClick={() => setConfirmOpen(true)}>
                    Place order
                  </Button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <aside className="h-fit space-y-4 rounded-3xl border border-glamour-100 bg-glamour-50/80 p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-glamour-500">Order summary</p>
          <div className="space-y-2 text-sm text-glamour-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            {discount > 0 ? (
              <div className="flex justify-between text-accent">
                <span>Points</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            ) : null}
          </div>
          <p className="border-t border-glamour-200 pt-4 text-2xl font-semibold text-glamour-950">${total.toFixed(2)}</p>
          <p className="text-xs text-glamour-500">Taxes included where applicable. Unique tracking ID issued after payment.</p>
        </aside>
      </div>

      <Modal open={confirmOpen} onClose={() => !submitting && setConfirmOpen(false)} title="Confirm your order">
        <p className="text-sm text-glamour-600">
          You are about to place an order for <span className="font-semibold text-glamour-900">${total.toFixed(2)}</span> with{' '}
          <span className="font-semibold capitalize">{checkoutPayment?.replace(/_/g, ' ')}</span>. This action cannot be duplicated — please
          confirm once.
        </p>
        <div className="mt-8 flex justify-end gap-3">
          <Button type="button" variant="ghost" disabled={submitting} onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
          <Button type="button" loading={submitting} onClick={placeOrder}>
            Confirm & pay
          </Button>
        </div>
      </Modal>
    </Container>
  )
}
