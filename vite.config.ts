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
      '@mod-filters': path.resolve(__dirname, './src/modules/filters'),
      '@mod-panel': path.resolve(__dirname, './src/modules/panel'),
      '@mod-reading': path.resolve(__dirname, './src/modules/reading'),
      '@sections': path.resolve(__dirname, './src/sections'),
      '@sec-catalogue': path.resolve(__dirname, './src/sections/catalogue'),
      '@sec-components': path.resolve(__dirname, './src/sections/components'),
      '@sec-dnd': path.resolve(__dirname, './src/sections/drag-and-drop'),
      '@sec-filters': path.resolve(__dirname, './src/sections/Filters'),
      '@sec-header': path.resolve(__dirname, './src/sections/header'),
      '@sec-panel': path.resolve(__dirname, './src/sections/panel'),
      '@sec-reading': path.resolve(__dirname, './src/sections/reading'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@test-mod-catalogue': path.resolve(__dirname, './tests/modules/catalogue'),
      '@test-mod-filters': path.resolve(__dirname, './tests/modules/filters'),
      '@test-sec-catalogue': path.resolve(__dirname, './tests/sections/catalogue'),
      '@test-sec-components': path.resolve(__dirname, './tests/sections/components'),
      '@test-sec-filters': path.resolve(__dirname, './tests/sections/filters')
    }
  }
})
