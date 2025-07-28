import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: ['src/index.esm.ts'],
      formats: ['es']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    },
    target: 'node20',
    minify: false,
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
}) 