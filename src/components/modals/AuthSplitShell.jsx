import { AuthLayout, AuthTrustStrip } from '@/features/auth/AuthLayout'

export { AuthLayout, AuthTrustStrip }

/**
 * Back-compat wrapper around AuthLayout with legacy prop names.
 * @param {object} props
 * @param {'universal' | 'shopper' | 'seller'} [props.brandPersona] — explicit left-panel tone
 * @param {'shopper' | 'seller'} [props.persona] — fallback when `brandPersona` omitted and `variant` is `register`
 */
export function AuthSplitShell({
  open,
  onClose,
  variant = 'login',
  titleId,
  children,
  footerSlot,
  mobileFullScreen: _mobileFullScreen = true,
  persona = 'shopper',
  brandPersona: brandPersonaProp,
  rightTagline,
}) {
  const brandPersona =
    brandPersonaProp ??
    (variant === 'login' ? 'universal' : persona === 'seller' ? 'seller' : 'shopper')

  return (
    <AuthLayout
      open={open}
      onClose={onClose}
      variant={variant}
      titleId={titleId}
      footerSlot={footerSlot}
      brandPersona={brandPersona}
      rightTagline={rightTagline}
    >
      {children}
    </AuthLayout>
  )
}
