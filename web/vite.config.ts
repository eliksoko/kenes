import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/dev_test': {
        target: 'https://customapi.kenes.com',
        changeOrigin: true,
        secure: false
      },
    },
  },
})
