import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, '')
  const proxyTarget = (env.VITE_DEV_PROXY_TARGET || 'http://127.0.0.1:5002').replace(
    /\/$/,
    '',
  )

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 5173,
      proxy: {
        // Express API (server PORT, default 5000). Never proxy /api to Vite’s own port or you get 502.
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
        },
        '/socket.io': {
          target: proxyTarget,
          ws: true,
        },
      },
    },
  }
})
