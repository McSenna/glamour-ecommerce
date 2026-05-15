import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useEffect, useId, useState } from 'react'
import { Mail } from 'lucide-react'
import { AuthSplitShell, AuthTrustStrip } from '@/components/modals/AuthSplitShell'
import {
  AuthTextField,
  AuthPasswordField,
  AuthPrimaryButton,
  AuthSocialDivider,
  AuthSocialButton,
} from '@/components/modals/AuthFormPrimitives'
import { loginSchema } from '@/schemas/authSchemas'
import { useAuthStore } from '@/store/useAuthStore'
import { useModalStore } from '@/store/useModalStore'
import { useUIStore } from '@/store/useUIStore'
import { cn } from '@/lib/cn'

export function LoginModal() {
  const navigate = useNavigate()
  const titleId = useId()
  const theme = useUIStore((s) => s.theme)
  const active = useModalStore((s) => s.active)
  const closeModal = useModalStore((s) => s.closeModal)
  const switchToRegister = useModalStore((s) => s.switchToRegister)
  const login = useAuthStore((s) => s.login)

  const open = active === 'login'
  const dark = theme === 'dark'

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const [remember, setRemember] = useState(true)

  useEffect(() => {
    if (open) {
      reset({ email: '', password: '' })
      setRemember(localStorage.getItem('glamour-pref-remember-login') !== '0')
    }
  }, [open, reset])

  const onSubmit = async (values) => {
    try {
      localStorage.setItem('glamour-pref-remember-login', remember ? '1' : '0')
      const user = await login(values.email, values.password)
      const redirect = useModalStore.getState().authRedirect
      closeModal()
      if (redirect?.pathname) {
        navigate(`${redirect.pathname}${redirect.search || ''}${redirect.hash || ''}`)
      } else {
        navigate(user?.role === 'seller' ? '/seller' : '/account')
      }
    } catch (e) {
      setError('root', { message: e.response?.data?.message || 'Unable to login' })
    }
  }

  const socialPlaceholder = () => window.alert('Social login is a UI placeholder in this build.')

  return (
    <AuthSplitShell
      open={open}
      onClose={closeModal}
      variant="login"
      titleId={titleId}
      footerSlot={<AuthTrustStrip theme={theme} />}
    >
      <form
        className="flex h-full min-h-0 w-full max-w-[400px] flex-col justify-center space-y-4 sm:max-w-[420px] lg:mx-auto"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <header className="shrink-0 space-y-1.5">
          <h2
            id={titleId}
            className={cn(
              'font-auth text-2xl font-bold tracking-[-0.03em] sm:text-[1.75rem]',
              dark ? 'text-white' : 'text-glamour-950',
            )}
          >
            Welcome back
          </h2>
          <p className={cn('text-sm leading-relaxed', dark ? 'text-white/55' : 'text-glamour-600')}>
            Universal sign-in — enter your credentials and pick up exactly where you left off.
          </p>
        </header>

        <div className="shrink-0 space-y-3">
          <AuthTextField
            label="Email"
            type="email"
            autoComplete="email"
            icon={Mail}
            theme={theme}
            error={errors.email?.message}
            {...register('email')}
          />
          <AuthPasswordField
            label="Password"
            autoComplete="current-password"
            theme={theme}
            error={errors.password?.message}
            {...register('password')}
          />
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
          <label
            className={cn(
              'flex min-h-[44px] cursor-pointer select-none items-center gap-2.5 text-sm font-medium',
              dark ? 'text-white/70' : 'text-glamour-700',
            )}
          >
            <input
              type="checkbox"
              className={cn(
                'h-4 w-4 rounded border transition',
                dark
                  ? 'border-white/25 bg-white/5 text-amber-500 focus:ring-amber-500/30'
                  : 'border-glamour-300 text-orange-600 focus:ring-amber-400/40',
              )}
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>
          <button
            type="button"
            className={cn(
              'min-h-[44px] text-sm font-semibold transition-colors',
              dark ? 'text-amber-300/90 hover:text-amber-200' : 'text-orange-700 hover:text-orange-600',
            )}
            onClick={() => window.alert('Password reset is not wired in this demo build.')}
          >
            Forgot password?
          </button>
        </div>

        {errors.root ? (
          <p
            className="shrink-0 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400"
            role="alert"
          >
            {errors.root.message}
          </p>
        ) : null}

        <AuthPrimaryButton loading={isSubmitting} theme={theme}>
          Continue
        </AuthPrimaryButton>

        <AuthSocialDivider theme={theme} />
        <div className="grid grid-cols-2 gap-2">
          <AuthSocialButton provider="google" theme={theme} onClick={socialPlaceholder} />
          <AuthSocialButton provider="apple" theme={theme} onClick={socialPlaceholder} />
        </div>

        <p className={cn('shrink-0 pt-1 text-center text-sm', dark ? 'text-white/50' : 'text-glamour-600')}>
          New to Glamour?{' '}
          <button
            type="button"
            className={cn(
              'font-semibold underline decoration-orange-500/40 underline-offset-4 transition-colors hover:decoration-orange-500',
              dark ? 'text-amber-300 hover:text-amber-200' : 'text-glamour-900 hover:text-orange-700',
            )}
            onClick={() => switchToRegister()}
          >
            Create an account
          </button>
        </p>
      </form>
    </AuthSplitShell>
  )
}
