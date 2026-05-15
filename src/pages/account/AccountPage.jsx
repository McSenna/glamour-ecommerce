import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/store/useAuthStore'

export function AccountPage() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  return (
    <Container className="py-14">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-glamour-500">Account</p>
          <h1 className="font-display text-3xl text-glamour-950">Hello, {user?.name}</h1>
          <p className="mt-2 text-sm text-glamour-600">{user?.email}</p>
          <p className="mt-1 text-sm font-medium text-glamour-800">
            Glamour Points: <span className="text-accent">{user?.glamourPoints ?? 0}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/account/orders">
            <Button variant="ghost">Orders</Button>
          </Link>
          <Button variant="subtle" type="button" onClick={() => logout()}>
            Sign out
          </Button>
        </div>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          { title: 'Addresses', body: 'Manage shipping destinations and billing profiles.' },
          { title: 'Wishlist', body: 'Synced locally with Zustand — ready to merge server-side.' },
          { title: 'Notifications', body: 'Realtime channel hooks stubbed for Socket.IO integration.' },
        ].map((c) => (
          <div key={c.title} className="rounded-3xl border border-glamour-100 bg-white/90 p-6 shadow-card">
            <p className="font-display text-xl text-glamour-950">{c.title}</p>
            <p className="mt-3 text-sm text-glamour-600">{c.body}</p>
          </div>
        ))}
      </div>
    </Container>
  )
}
