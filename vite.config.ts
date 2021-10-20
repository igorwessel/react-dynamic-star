import path from 'path'
import { defineConfig } from 'vite'
import tsConfigpaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import { EsLinter, linterPlugin } from 'vite-plugin-linter'

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    react(),
    tsConfigpaths(),
    linterPlugin({
      include: ['./{lib,src}/**/*.{ts,tsx}'],
      linters: [new EsLinter({ configEnv })],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/main.tsx'),
      name: 'ReactJSON',
      fileName: (format) => `rj.${format}.js`,
    },
    rollupOptions: {
      external: ['react'],
    },
  },
}))
