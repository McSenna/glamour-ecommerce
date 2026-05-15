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

export function LoginModal() {
  const navigate = useNavigate()
  const titleId = useId()
  const active = useModalStore((s) => s.active)
  const closeModal = useModalStore((s) => s.closeModal)
  const switchToRegister = useModalStore((s) => s.switchToRegister)
  const login = useAuthStore((s) => s.login)

  const open = active === 'login'

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
      footerSlot={<AuthTrustStrip />}
    >
      <form
        className="flex h-full min-h-0 w-full max-w-[400px] flex-col justify-center space-y-4 sm:max-w-[420px] lg:mx-auto"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <header className="shrink-0 space-y-1.5">
          <h2 id={titleId} className="font-auth text-2xl font-bold tracking-[-0.03em] text-glamour-950 sm:text-[1.75rem]">
            Welcome back
          </h2>
          <p className="text-sm leading-relaxed text-glamour-600">Sign in to continue shopping and manage your orders.</p>
        </header>

        <div className="shrink-0 space-y-3">
          <AuthTextField
            label="Email"
            type="email"
            autoComplete="email"
            icon={Mail}
            theme="light"
            error={errors.email?.message}
            {...register('email')}
          />
          <AuthPasswordField
            label="Password"
            autoComplete="current-password"
            theme="light"
            error={errors.password?.message}
            {...register('password')}
          />
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
          <label className="flex min-h-[44px] cursor-pointer select-none items-center gap-2.5 text-sm font-medium text-glamour-700">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border border-glamour-300 text-orange-600 transition focus:ring-amber-400/40"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>
          <button
            type="button"
            className="min-h-[44px] text-sm font-semibold text-orange-700 transition-colors hover:text-orange-600"
            onClick={() => window.alert('Password reset is not wired in this demo build.')}
          >
            Forgot password?
          </button>
        </div>

        {errors.root ? (
          <p
            className="shrink-0 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-600"
            role="alert"
          >
            {errors.root.message}
          </p>
        ) : null}

        <AuthPrimaryButton loading={isSubmitting} theme="light">
          Continue
        </AuthPrimaryButton>

        <AuthSocialDivider theme="light" />
        <div className="grid grid-cols-2 gap-2">
          <AuthSocialButton provider="google" theme="light" onClick={socialPlaceholder} />
          <AuthSocialButton provider="apple" theme="light" onClick={socialPlaceholder} />
        </div>

        <p className="shrink-0 pt-1 text-center text-sm text-glamour-600">
          New to Glamour?{' '}
          <button
            type="button"
            className="font-semibold text-glamour-900 underline decoration-orange-500/40 underline-offset-4 transition-colors hover:text-orange-700 hover:decoration-orange-500"
            onClick={() => switchToRegister()}
          >
            Create an account
          </button>
        </p>
      </form>
    </AuthSplitShell>
  )
}
