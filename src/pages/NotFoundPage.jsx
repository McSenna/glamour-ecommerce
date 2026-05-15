import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'

export function NotFoundPage() {
  return (
    <Container className="py-24 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-glamour-500">404</p>
      <h1 className="mt-4 font-display text-4xl text-glamour-950">This room is empty.</h1>
      <p className="mt-3 text-sm text-glamour-600">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-8 inline-flex rounded-full bg-glamour-900 px-6 py-3 text-sm font-semibold text-white">
        Back home
      </Link>
    </Container>
  )
}
