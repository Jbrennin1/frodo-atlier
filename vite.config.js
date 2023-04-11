import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import http from 'https'
import path from 'path'

dotenv.config()

export default defineConfig({
  plugins: [react(), viteCompression()],
  body: '/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './spec/setup.js'
  },
  server: {
    host: true,
    proxy: {
      "/api" : {
        target: 'http://ec2-18-191-138-245.us-east-2.compute.amazonaws.com:3000',
        changeOrigin: true,
        secure: false,
        rewrite: ( path ) => path.replace(/^\/api/, '')
      }
    }
  }
})

