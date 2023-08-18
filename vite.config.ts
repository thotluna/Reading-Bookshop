/// <reference types="vite-plugin-svgr/client" />
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import svgr from 'vite-plugin-svgr'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    globals: true,
    include: ['**/*.spec.{js,ts,jsx,tsx}'],
    environment: 'happy-dom',
    setupFiles: ['./src/setupTest.ts']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@mod-catalogue': path.resolve(__dirname, './src/modules/catalogue'),
      '@mod-reading': path.resolve(__dirname, './src/modules/reading'),
      '@sections': path.resolve(__dirname, './src/sections'),
      '@sec-catalogue': path.resolve(__dirname, './src/sections/catalogue'),
      '@sec-reading': path.resolve(__dirname, './src/sections/reading'),
      '@sec-components': path.resolve(__dirname, './src/sections/components')
    }
  }
})
