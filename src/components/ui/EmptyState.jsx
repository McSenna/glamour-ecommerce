import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export function EmptyState({ title, description, actionLabel, to }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-glamour-200 bg-white/70 px-8 py-16 text-center"
    >
      <p className="font-display text-2xl text-glamour-950">{title}</p>
      <p className="mt-3 max-w-md text-sm text-glamour-600">{description}</p>
      {actionLabel && to ? (
        <Link to={to} className="mt-8">
          <Button variant="primary">{actionLabel}</Button>
        </Link>
      ) : null}
    </motion.div>
  )
}
