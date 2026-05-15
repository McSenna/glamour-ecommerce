import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { Mail, User, Building2, Store, Phone, Globe2, Link as LinkIcon } from 'lucide-react'
import {
  AuthTextField,
  AuthPasswordField,
  AuthPrimaryButton,
  AuthSocialDivider,
  AuthSocialButton,
  AuthCheckbox,
} from '@/components/modals/AuthFormPrimitives'
import { handleFromStoreName, sellerRegisterSchema } from '@/schemas/authSchemas'
import { useAuthStore } from '@/store/useAuthStore'
import { useModalStore } from '@/store/useModalStore'
import { cn } from '@/lib/cn'

function scorePassword(pw) {
  if (!pw) return 0
  let s = 0
  if (pw.length >= 8) s += 1
  if (pw.length >= 12) s += 1
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s += 1
  if (/\d/.test(pw)) s += 1
  if (/[^A-Za-z0-9]/.test(pw)) s += 1
  return Math.min(s, 4)
}

function selectClass(theme) {
  const dark = theme === 'dark'
  return cn(
    'w-full appearance-none rounded-xl border bg-clip-padding py-2.5 pl-3.5 pr-9 text-[13px] font-medium outline-none transition-all duration-200 focus:ring-[3px] focus:ring-offset-0',
    dark
      ? 'border-white/[0.08] bg-white/[0.06] text-white focus:border-amber-400/35 focus:ring-amber-500/25'
      : 'border-glamour-200/70 bg-glamour-50/80 text-glamour-900 focus:border-amber-400/50 focus:ring-amber-400/20',
  )
}

const INTEGRATION_OPTS = ['Shopee', 'Lazada', 'TikTok Shop', 'Meta Shops']

export function SellerRegisterForm({ theme, titleId, dark, formKey }) {
  const navigate = useNavigate()
  const closeModal = useModalStore((s) => s.closeModal)
  const switchToLogin = useModalStore((s) => s.switchToLogin)
  const registerUser = useAuthStore((s) => s.register)

  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(sellerRegisterSchema),
    defaultValues: {
      fullName: '',
      businessName: '',
      storeName: '',
      email: '',
      password: '',
      confirm: '',
      country: '',
      storeCategory: '',
      phone: '',
      monthlySalesRange: '',
      websiteUrl: '',
      marketplaceIntegrations: [],
      agreeTerms: false,
    },
  })

  const password = watch('password') || ''
  const integrations = watch('marketplaceIntegrations') || []
  const strength = scorePassword(password)
  const strengthLabel = useMemo(() => {
    if (!password) return { text: '', width: '0%', className: 'bg-white/10' }
    if (strength <= 1) return { text: 'Weak', width: '28%', className: 'bg-red-400' }
    if (strength <= 2) return { text: 'Fair', width: '52%', className: 'bg-amber-400' }
    if (strength === 3) return { text: 'Good', width: '76%', className: 'bg-amber-400' }
    return { text: 'Strong', width: '100%', className: 'bg-emerald-500' }
  }, [password, strength])

  useEffect(() => {
    reset({
      fullName: '',
      businessName: '',
      storeName: '',
      email: '',
      password: '',
      confirm: '',
      country: '',
      storeCategory: '',
      phone: '',
      monthlySalesRange: '',
      websiteUrl: '',
      marketplaceIntegrations: [],
      agreeTerms: false,
    })
  }, [formKey, reset])

  const toggleIntegration = (name) => {
    const cur = watch('marketplaceIntegrations') || []
    const next = cur.includes(name) ? cur.filter((x) => x !== name) : [...cur, name]
    setValue('marketplaceIntegrations', next, { shouldValidate: true })
  }

  const onSubmit = async (values) => {
    try {
      const phone = values.phone?.trim()
      await registerUser({
        name: values.fullName,
        username: handleFromStoreName(values.storeName),
        email: values.email,
        password: values.password,
        phone: phone && phone.length >= 8 ? phone : undefined,
        role: 'seller',
        businessName: values.businessName,
        shopDisplayName: values.storeName,
        country: values.country,
        storeCategory: values.storeCategory,
        monthlySalesRange: values.monthlySalesRange || undefined,
        websiteUrl: values.websiteUrl || undefined,
        marketplaceIntegrations: values.marketplaceIntegrations?.length ? values.marketplaceIntegrations : undefined,
      })
      closeModal()
      navigate('/seller', { replace: true })
    } catch (e) {
      const status = e.response?.status
      const message =
        status === 409
          ? 'An account with that email or store handle already exists.'
          : e.response?.data?.message || 'Unable to register. Please try again.'
      setError('root', { message })
    }
  }

  const socialPlaceholder = () => window.alert('Social sign-up is a UI placeholder in this build.')

  const labelSm = (text) => (
    <span className={cn('text-[10px] font-semibold uppercase tracking-wide', dark ? 'text-white/45' : 'text-glamour-500')}>
      {text}
    </span>
  )

  return (
    <form
      className="flex h-full min-h-0 w-full flex-col justify-center space-y-3 sm:space-y-3.5"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <header className="shrink-0 space-y-1">
        <h2
          id={titleId}
          className={cn(
            'font-auth text-2xl font-bold tracking-[-0.03em] sm:text-[1.7rem]',
            dark ? 'text-white' : 'text-glamour-950',
          )}
        >
          Launch your seller workspace
        </h2>
        <p className={cn('text-sm leading-snug', dark ? 'text-white/55' : 'text-glamour-600')}>
          Operational fields for scale — inventory, channels, and analytics-ready foundations.
        </p>
      </header>

      <div className="grid min-h-0 shrink-0 grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-2.5">
        <div className="sm:col-span-2">
          <AuthTextField
            label="Full name"
            autoComplete="name"
            icon={User}
            theme={theme}
            error={errors.fullName?.message}
            {...register('fullName')}
          />
        </div>
        <AuthTextField
          label="Business name"
          autoComplete="organization"
          icon={Building2}
          theme={theme}
          error={errors.businessName?.message}
          {...register('businessName')}
        />
        <AuthTextField
          label="Store name"
          autoComplete="off"
          icon={Store}
          theme={theme}
          error={errors.storeName?.message}
          {...register('storeName')}
        />
        <AuthTextField
          label="Business email"
          type="email"
          autoComplete="email"
          icon={Mail}
          theme={theme}
          error={errors.email?.message}
          {...register('email')}
        />
        <label className="block space-y-1">
          {labelSm('Country')}
          <div className="relative">
            <Globe2
              className={cn(
                'pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2',
                dark ? 'text-white/40' : 'text-glamour-400',
              )}
            />
            <select className={cn(selectClass(theme), 'pl-9')} {...register('country')} aria-label="Country">
              <option value="">Select country</option>
              <option value="PH">Philippines</option>
              <option value="US">United States</option>
              <option value="SG">Singapore</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
          </div>
          {errors.country ? <p className="text-xs font-medium text-red-500">{errors.country.message}</p> : null}
        </label>
        <label className="block space-y-1 sm:col-span-2">
          {labelSm('Store category')}
          <div className="relative">
            <Store
              className={cn(
                'pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2',
                dark ? 'text-white/40' : 'text-glamour-400',
              )}
            />
            <select className={cn(selectClass(theme), 'pl-9')} {...register('storeCategory')} aria-label="Store category">
              <option value="">Select category</option>
              <option value="fashion">Fashion & apparel</option>
              <option value="beauty">Beauty & wellness</option>
              <option value="electronics">Electronics</option>
              <option value="home">Home & living</option>
              <option value="food">Food & beverage</option>
              <option value="handmade">Handmade & gifts</option>
            </select>
          </div>
          {errors.storeCategory ? (
            <p className="text-xs font-medium text-red-500">{errors.storeCategory.message}</p>
          ) : null}
        </label>
        <div className="sm:col-span-2">
          <AuthPasswordField
            label="Password"
            autoComplete="new-password"
            theme={theme}
            error={errors.password?.message}
            {...register('password')}
          />
        </div>
        {password ? (
          <div className="space-y-1 sm:col-span-2">
            <div className="flex justify-between text-[11px] font-semibold">
              <span className={dark ? 'text-white/45' : 'text-glamour-500'}>Password strength</span>
              <span className={dark ? 'text-white/80' : 'text-glamour-800'}>{strengthLabel.text}</span>
            </div>
            <div className={cn('h-1 overflow-hidden rounded-full', dark ? 'bg-white/[0.08]' : 'bg-glamour-100')}>
              <div
                className={cn('h-full rounded-full transition-all duration-300', strengthLabel.className)}
                style={{ width: strengthLabel.width }}
              />
            </div>
          </div>
        ) : null}
        <div className="sm:col-span-2">
          <AuthPasswordField
            label="Confirm password"
            autoComplete="new-password"
            theme={theme}
            error={errors.confirm?.message}
            {...register('confirm')}
          />
        </div>
        <div className="sm:col-span-2">
          <AuthTextField
            label="Phone (optional)"
            type="tel"
            autoComplete="tel"
            icon={Phone}
            theme={theme}
            error={errors.phone?.message}
            {...register('phone')}
          />
        </div>
      </div>

      <details
        className={cn(
          'shrink-0 rounded-xl border transition-colors',
          dark ? 'border-white/[0.08] bg-white/[0.03]' : 'border-glamour-200/80 bg-white/60',
        )}
      >
        <summary
          className={cn(
            'cursor-pointer list-none px-3 py-2.5 text-xs font-semibold outline-none marker:content-none [&::-webkit-details-marker]:hidden',
            dark ? 'text-white/70 hover:text-white' : 'text-glamour-700 hover:text-glamour-900',
          )}
        >
          Operations & channels (optional)
        </summary>
        <div className="space-y-2 border-t border-inherit px-3 pb-3 pt-2">
          <label className="block space-y-1">
            {labelSm('Monthly sales range')}
            <select className={selectClass(theme)} {...register('monthlySalesRange')} aria-label="Monthly sales range">
              <option value="">Prefer not to say</option>
              <option value="0-10k">Under ₱10k</option>
              <option value="10k-50k">₱10k – ₱50k</option>
              <option value="50k-200k">₱50k – ₱200k</option>
              <option value="200k+">₱200k+</option>
            </select>
          </label>
          <AuthTextField
            label="Website URL (optional)"
            type="url"
            autoComplete="url"
            icon={LinkIcon}
            theme={theme}
            error={errors.websiteUrl?.message}
            {...register('websiteUrl')}
          />
          <fieldset>
            <legend className={cn('mb-1.5 text-[10px] font-semibold uppercase tracking-wide', dark ? 'text-white/45' : 'text-glamour-500')}>
              Marketplace integrations
            </legend>
            <div className="flex flex-wrap gap-1.5">
              {INTEGRATION_OPTS.map((name) => (
                <label
                  key={name}
                  className={cn(
                    'flex cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-colors',
                    integrations.includes(name)
                      ? dark
                        ? 'border-amber-400/40 bg-amber-500/15 text-white'
                        : 'border-orange-300 bg-orange-50 text-glamour-900'
                      : dark
                        ? 'border-white/10 text-white/55 hover:border-white/20'
                        : 'border-glamour-200 text-glamour-600 hover:border-glamour-300',
                  )}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={integrations.includes(name)}
                    onChange={() => toggleIntegration(name)}
                  />
                  {name}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </details>

      <AuthCheckbox
        theme={theme}
        checked={!!watch('agreeTerms')}
        onChange={(e) => setValue('agreeTerms', e.target.checked, { shouldValidate: true, shouldTouch: true })}
        error={errors.agreeTerms?.message}
      >
        I agree to the{' '}
        <button
          type="button"
          className="font-semibold text-orange-600 underline decoration-orange-500/30 underline-offset-2 hover:decoration-orange-500 dark:text-amber-300 dark:decoration-amber-500/30"
          onClick={(e) => {
            e.stopPropagation()
            window.alert('Terms of Service — placeholder in this demo build.')
          }}
        >
          Terms of Service
        </button>{' '}
        and{' '}
        <button
          type="button"
          className="font-semibold text-orange-600 underline decoration-orange-500/30 underline-offset-2 hover:decoration-orange-500 dark:text-amber-300 dark:decoration-amber-500/30"
          onClick={(e) => {
            e.stopPropagation()
            window.alert('Privacy Policy — placeholder in this demo build.')
          }}
        >
          Privacy Policy
        </button>
        .
      </AuthCheckbox>

      {errors.root ? (
        <p
          className="rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400"
          role="alert"
        >
          {errors.root.message}
        </p>
      ) : null}

      <AuthPrimaryButton loading={isSubmitting} theme={theme}>
        Start selling
      </AuthPrimaryButton>

      <AuthSocialDivider theme={theme} />
      <div className="grid grid-cols-2 gap-2">
        <AuthSocialButton provider="google" theme={theme} onClick={socialPlaceholder} />
        <AuthSocialButton provider="apple" theme={theme} onClick={socialPlaceholder} />
      </div>

      <p className={cn('text-center text-sm', dark ? 'text-white/50' : 'text-glamour-600')}>
        Already have an account?{' '}
        <button
          type="button"
          className={cn(
            'font-semibold underline decoration-orange-500/40 underline-offset-4 transition-colors hover:decoration-orange-500',
            dark ? 'text-amber-300 hover:text-amber-200' : 'text-glamour-900 hover:text-orange-700',
          )}
          onClick={() => switchToLogin()}
        >
          Sign in
        </button>
      </p>
    </form>
  )
}
