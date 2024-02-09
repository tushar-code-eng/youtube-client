import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api': 'https://youtube-server-rust.vercel.app/'
    }
  },
  plugins: [react()],
})
