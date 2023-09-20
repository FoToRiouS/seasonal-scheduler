import {defineConfig} from 'vite'
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
      },
      '/backend': {
        target: 'http://localhost:8080', //http://scheduler-back:8080
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/backend/, "")
      },
      '/telegram': {
        target: 'https://api.telegram.org/bot6353731187:AAESmnxiCkivT5JOR3q-WHyjIClzQsNsWck',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/telegram/, "")
      }
    },
  },
  plugins: [react()],
})
