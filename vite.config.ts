// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Express-js/', // Asegúrate que coincida exactamente con el nombre de tu repositorio
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Desactivar sourcemaps para producción
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  }
})