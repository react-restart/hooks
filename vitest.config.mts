/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    setupFiles: ['./test/setup.js'],
    environment: 'jsdom',
    coverage: {
      include: ['src'],
    },
  },
})
