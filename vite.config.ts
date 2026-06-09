import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  base: '/Portfolio/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        // Inject LESS compile-time variables and mixins globally.
        // Breakpoints are inlined so they don't trigger a file import cycle.
        // Mixins produce no CSS output, so importing them here is safe.
        additionalData: `
          @bp-sm:  640px;
          @bp-md:  768px;
          @bp-lg:  1024px;
          @bp-xl:  1280px;
          @bp-2xl: 1536px;
          @import "@/styles/mixins.less";
        `
      }
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'vue-i18n']
        }
      }
    }
  },
  esbuild: {
    drop: ['console', 'debugger']
  }
})
