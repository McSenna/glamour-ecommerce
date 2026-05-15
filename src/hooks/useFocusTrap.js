import { useEffect } from 'react'

const selector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function useFocusTrap(containerRef, active) {
  useEffect(() => {
    if (!active) return
    const el = containerRef.current
    if (!el) return

    const focusable = () =>
      [...el.querySelectorAll(selector)].filter(
        (node) => node.offsetParent !== null || node === document.activeElement,
      )

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return
      const nodes = focusable()
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first || !el.contains(document.activeElement)) {
          e.preventDefault()
          last.focus()
        }
      } else if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    el.addEventListener('keydown', handleKeyDown)
    const id = window.requestAnimationFrame(() => {
      const nodes = focusable()
      if (nodes.length) nodes[0].focus()
    })
    return () => {
      window.cancelAnimationFrame(id)
      el.removeEventListener('keydown', handleKeyDown)
    }
  }, [active, containerRef])
}
