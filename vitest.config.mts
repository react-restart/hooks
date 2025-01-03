/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    setupFiles: ['./test/setup.js'],
    // ... Specify options here.
  },
})
