import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Custom domain (CNAME) serves from root — no base path needed.
export default defineConfig({
  plugins: [react()],
  server: { port: Number(process.env.PORT) || 5173 },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
