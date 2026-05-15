import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useModalStore } from '@/store/useModalStore'

export function CartPage() {
  const navigate = useNavigate()
  const openCart = useModalStore((s) => s.openCart)

  useLayoutEffect(() => {
    openCart()
    navigate('/', { replace: true })
  }, [navigate, openCart])

  return null
}
