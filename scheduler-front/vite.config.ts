import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/myanimelist': {
        target: 'https://api.myanimelist.net/v2',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/myanimelist/, "")
      }
    },
  },
  plugins: [react()],
})
