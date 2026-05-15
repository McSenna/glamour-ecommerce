import { useLayoutEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { useModalStore } from '@/store/useModalStore'

export function RequireAuth({ roles, children }) {
  const user = useAuthStore((s) => s.user)
  const location = useLocation()
  const openLogin = useModalStore((s) => s.openLogin)

  useLayoutEffect(() => {
    if (!user) {
      openLogin({ from: location })
    }
  }, [user, location.pathname, location.search, openLogin, location])

  if (!user) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-24 text-center">
        <p className="font-display text-xl text-glamour-900">Sign in required</p>
        <p className="mt-2 text-sm text-glamour-600">Use the sign-in window to continue to your account.</p>
      </div>
    )
  }
  if (roles?.length && !roles.includes(user.role)) {
    return <Navigate to="/" replace />
  }
  return children ?? <Outlet />
}
