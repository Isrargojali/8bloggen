import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5001', // Your backend
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://localhost:5001', // Proxy uploads to backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
