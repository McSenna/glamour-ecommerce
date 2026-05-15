import { motion } from 'framer-motion'

export function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  return (
    <div
      className={`mb-10 max-w-2xl space-y-3 ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      {eyebrow ? (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-glamour-500"
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="font-display text-3xl text-balance text-glamour-950 sm:text-4xl"
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm text-glamour-600 sm:text-base"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  )
}
