import { useId } from 'react'
import { AuthSplitShell, AuthTrustStrip } from '@/components/modals/AuthSplitShell'
import { RoleSelector } from '@/features/auth/register/RoleSelector'
import { ShopperRegisterForm } from '@/features/auth/register/ShopperRegisterForm'
import { SellerRegisterForm } from '@/features/auth/register/SellerRegisterForm'
import { useModalStore } from '@/store/useModalStore'

export function RegisterModal() {
  const titleId = useId()
  const active = useModalStore((s) => s.active)
  const registerStep = useModalStore((s) => s.registerStep)
  const authPersona = useModalStore((s) => s.authPersona)
  const registerSkipRoleSelect = useModalStore((s) => s.registerSkipRoleSelect)
  const closeModal = useModalStore((s) => s.closeModal)
  const selectRegisterPersona = useModalStore((s) => s.selectRegisterPersona)
  const backToRegisterRoleStep = useModalStore((s) => s.backToRegisterRoleStep)

  const open = active === 'register'

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
      footerSlot={<AuthTrustStrip />}
      brandPersona={brandPersona}
      persona={authPersona}
    >
      {registerStep === 'role' ? (
        <RoleSelector theme="light" titleId={titleId} onSelect={selectRegisterPersona} />
      ) : (
        <div className="flex h-full min-h-0 w-full flex-col overflow-hidden">
          {!registerSkipRoleSelect ? (
            <button
              type="button"
              onClick={() => backToRegisterRoleStep()}
              className="mb-2 inline-flex min-h-[40px] shrink-0 items-center gap-2 self-start text-sm font-semibold text-glamour-600 transition-colors hover:text-glamour-900"
            >
              ← Change role
            </button>
          ) : null}
          {authPersona === 'shopper' ? (
            <ShopperRegisterForm theme="light" titleId={titleId} dark={false} formKey={formKey} />
          ) : (
            <SellerRegisterForm theme="light" titleId={titleId} dark={false} formKey={formKey} />
          )}
        </div>
      )}
    </AuthSplitShell>
  )
}
