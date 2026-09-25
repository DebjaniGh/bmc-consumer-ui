/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // ui-kit is linked via file:../ui-kit and carries its own node_modules,
    // so without this, React and the linked library resolve to two separate
    // React copies -- hooks called inside ui-kit components then blow up
    // with "Invalid hook call" because they're not the app's React instance.
    dedupe: ["react", "react-dom"],
  },
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
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    globals: true,
  },
})
