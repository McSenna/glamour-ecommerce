import { useLayoutEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useModalStore } from '@/store/useModalStore'

export function AuthRouteBridge({ mode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const openLogin = useModalStore((s) => s.openLogin)
  const openRegister = useModalStore((s) => s.openRegister)
  const roleParam = params.get('role')

  useLayoutEffect(() => {
    if (mode === 'login') {
      openLogin({ from: location.state?.from })
    } else {
      openRegister({
        from: location.state?.from,
        role: roleParam === 'seller' ? 'seller' : 'customer',
      })
    }
    const back = location.state?.from?.pathname || '/'
    navigate(back, { replace: true, state: {} })
  }, [mode, navigate, openLogin, openRegister, location.state, location.key, roleParam])

  return null
}
