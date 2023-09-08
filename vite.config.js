import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true }, // <- enable https
  plugins: [react(), mkcert()], // <- add mkcert
  base: '/demo_react_three_fiber/', // <- add base
})
