import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { Mail, User } from 'lucide-react'
import {
  AuthTextField,
  AuthPasswordField,
  AuthPrimaryButton,
  AuthSocialDivider,
  AuthSocialButton,
  AuthCheckbox,
} from '@/components/modals/AuthFormPrimitives'
import { shopperRegisterSchema } from '@/schemas/authSchemas'
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

export function ShopperRegisterForm({ theme, titleId, dark, formKey }) {
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
    resolver: zodResolver(shopperRegisterSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirm: '',
      agreeTerms: false,
    },
  })

  const password = watch('password') || ''
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
      email: '',
      password: '',
      confirm: '',
      agreeTerms: false,
    })
  }, [formKey, reset])

  const onSubmit = async (values) => {
    try {
      await registerUser({
        name: values.fullName,
        email: values.email,
        password: values.password,
        role: 'customer',
      })
      closeModal()
      navigate('/account', { replace: true })
    } catch (e) {
      const status = e.response?.status
      const message =
        status === 409
          ? 'An account with that email already exists.'
          : e.response?.data?.message || 'Unable to register. Please try again.'
      setError('root', { message })
    }
  }

  const socialPlaceholder = () => window.alert('Social sign-up is a UI placeholder in this build.')

  return (
    <form
      className="flex h-full min-h-0 w-full flex-col justify-center space-y-3.5 sm:space-y-4"
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
          Create your shopper profile
        </h2>
        <p className={cn('text-sm leading-snug', dark ? 'text-white/55' : 'text-glamour-600')}>
          Four fields. Instant access. Designed to feel welcoming on every device.
        </p>
      </header>

      <div className="min-h-0 shrink-0 space-y-3">
        <AuthTextField
          label="Full name"
          autoComplete="name"
          icon={User}
          theme={theme}
          error={errors.fullName?.message}
          {...register('fullName')}
        />
        <AuthTextField
          label="Email address"
          type="email"
          autoComplete="email"
          icon={Mail}
          theme={theme}
          error={errors.email?.message}
          {...register('email')}
        />
        <AuthPasswordField
          label="Password"
          autoComplete="new-password"
          theme={theme}
          error={errors.password?.message}
          {...register('password')}
        />
        {password ? (
          <div className="space-y-1">
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
        <AuthPasswordField
          label="Confirm password"
          autoComplete="new-password"
          theme={theme}
          error={errors.confirm?.message}
          {...register('confirm')}
        />
      </div>

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
        Create account
      </AuthPrimaryButton>

      <AuthSocialDivider theme={theme} />
      <div className="grid grid-cols-2 gap-2">
        <AuthSocialButton provider="google" theme={theme} onClick={socialPlaceholder} />
        <AuthSocialButton provider="apple" theme={theme} onClick={socialPlaceholder} />
      </div>

      <p className={cn('pt-1 text-center text-sm', dark ? 'text-white/50' : 'text-glamour-600')}>
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
