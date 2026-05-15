import { motion } from 'framer-motion'

export function ModalBackdrop({ onClose }) {
  return (
    <motion.button
      type="button"
      aria-label="Close dialog"
      className="absolute inset-0 bg-glamour-950/45 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    />
  )
}
