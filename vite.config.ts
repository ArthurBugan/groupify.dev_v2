// vite.config.ts
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: false,
        secure: false,
        rewrite: path => path.replace(/^\/api/, '')
      },
    },
    allowedHosts: ['groupify.localhost', 'groupify.dev', 'localhost'],
    port: 3000,
  },
  plugins: [
    // Enables Vite to resolve imports using path aliases.
    tsconfigPaths(),
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart({
      target: 'bun',
      customViteReactPlugin: true,
      tsr: {
        routeToken: 'layout',
        target: 'react',
        // Specifies the directory TanStack Router uses for your routes.
        routesDirectory: 'src/routes', // Defaults to "src/routes"
      },
    }),
    tailwindcss(),
    react(),
  ],
})