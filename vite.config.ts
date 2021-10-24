import path from 'path'
import { defineConfig } from 'vite'
import tsConfigpaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
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
    dts({
      include: ['lib/main.tsx'],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace(/(\/|\\)lib/, '').replace('main', 'rds'),
        content,
      }),
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/main.tsx'),
      name: 'ReactDynamicStar',
      fileName: (format) => `rds.${format}.js`,
    },
    rollupOptions: {
      external: ['react'],
    },
  },
}))
