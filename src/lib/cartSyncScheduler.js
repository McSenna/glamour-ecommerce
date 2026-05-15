let timer = null

/**
 * Debounced server cart sync for authenticated shoppers only.
 * Avoid calling from hydrate / sync response handlers.
 */
export function scheduleServerCartSync(delay = 450) {
  clearTimeout(timer)
  timer = setTimeout(() => {
    timer = null
    void (async () => {
      const { useAuthStore } = await import('@/store/useAuthStore')
      if (!useAuthStore.getState().user) return
      const { useCartStore } = await import('@/store/useCartStore')
      await useCartStore.getState().syncToServer()
    })()
  }, delay)
}

export function flushServerCartSync() {
  clearTimeout(timer)
  timer = null
}
