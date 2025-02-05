import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias for your `src` directory
    },
  },
  preview: {
    port: 4000,
    strictPort: true,
  },
  server: {
    port: 4000,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:4000",
  },
  build: {
    outDir: "dist"
  }
});
