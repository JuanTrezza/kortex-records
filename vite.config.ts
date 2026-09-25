import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

// Plugin to ensure preview environment root access works smoothly while maintaining GitHub Pages base path
const devBaseRedirectPlugin = (): Plugin => ({
  name: 'dev-base-redirect',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url === '/' || req.url === '') {
        req.url = '/kortex-records/';
      }
      next();
    });
  },
});

export default defineConfig(() => {
  return {
    base: '/kortex-records/',
    plugins: [react(), devBaseRedirectPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || __dirname, './src'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
