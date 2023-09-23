import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd())
  return {
    server:{
      host: true,
      port: 5173,
      proxy: {
        '/myanimelist': {
          target:  env.VITE_MYANIMELIST_API,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/myanimelist/, "")
        },
        '/backend': {
          target: env.VITE_BACKEND_URI,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/backend/, "")
        },
        '/telegram': {
          target: env.VITE_TELEGRAM_API,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/telegram/, "")
        }
      },
    },
    plugins: [react()],
  }
})