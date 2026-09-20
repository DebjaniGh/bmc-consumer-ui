import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // forwards any /api/* request from the Vite dev server to bmc-server,
      // so the browser sees everything as same-origin (no CORS) in dev
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
})
