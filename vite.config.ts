/// <reference types="vite-plugin-svgr/client" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./setupTest.ts']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@mod-catalogue': path.resolve(__dirname, './src/modules/catalogue'),
      '@mod-reading': path.resolve(__dirname, './src/modules/reading'),
      '@sections': path.resolve(__dirname, './src/sections'),
      '@sec-catalogue': path.resolve(__dirname, './src/sections/catalogue')
    }
  }
})
