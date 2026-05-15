import { useId } from 'react'
import { AuthSplitShell, AuthTrustStrip } from '@/components/modals/AuthSplitShell'
import { RoleSelector } from '@/features/auth/register/RoleSelector'
import { ShopperRegisterForm } from '@/features/auth/register/ShopperRegisterForm'
import { SellerRegisterForm } from '@/features/auth/register/SellerRegisterForm'
import { useModalStore } from '@/store/useModalStore'
import { useUIStore } from '@/store/useUIStore'
import { cn } from '@/lib/cn'

export function RegisterModal() {
  const titleId = useId()
  const theme = useUIStore((s) => s.theme)
  const active = useModalStore((s) => s.active)
  const registerStep = useModalStore((s) => s.registerStep)
  const authPersona = useModalStore((s) => s.authPersona)
  const registerSkipRoleSelect = useModalStore((s) => s.registerSkipRoleSelect)
  const closeModal = useModalStore((s) => s.closeModal)
  const selectRegisterPersona = useModalStore((s) => s.selectRegisterPersona)
  const backToRegisterRoleStep = useModalStore((s) => s.backToRegisterRoleStep)

  const open = active === 'register'
  const dark = theme === 'dark'

  const brandPersona =
    registerStep === 'role' ? 'universal' : authPersona === 'seller' ? 'seller' : 'shopper'

  const formKey = `${open}-${registerStep}-${authPersona}`

  if (!open) return null

  return (
    <AuthSplitShell
      open={open}
      onClose={closeModal}
      variant="register"
      titleId={titleId}
      footerSlot={<AuthTrustStrip theme={theme} />}
      brandPersona={brandPersona}
      persona={authPersona}
    >
      {registerStep === 'role' ? (
        <RoleSelector theme={theme} titleId={titleId} onSelect={selectRegisterPersona} />
      ) : (
        <div className="flex h-full min-h-0 w-full flex-col overflow-hidden">
          {!registerSkipRoleSelect ? (
            <button
              type="button"
              onClick={() => backToRegisterRoleStep()}
              className={cn(
                'mb-2 inline-flex min-h-[40px] shrink-0 items-center gap-2 self-start text-sm font-semibold transition-colors',
                dark ? 'text-white/55 hover:text-white' : 'text-glamour-600 hover:text-glamour-900',
              )}
            >
              ← Change role
            </button>
          ) : null}
          {authPersona === 'shopper' ? (
            <ShopperRegisterForm theme={theme} titleId={titleId} dark={dark} formKey={formKey} />
          ) : (
            <SellerRegisterForm theme={theme} titleId={titleId} dark={dark} formKey={formKey} />
          )}
        </div>
      )}
    </AuthSplitShell>
  )
}
