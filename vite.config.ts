import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Custom domain (CNAME) serves from root — no base path needed.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
