import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Tailwind v4 entra como plugin do Vite (a configuração fica no próprio CSS, em src/index.css).
// O alias @ aponta para src, para importar com '@/components/...'.
// A aula usa __dirname; o Vite 8 pede import.meta.dirname, que faz o mesmo.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
})
