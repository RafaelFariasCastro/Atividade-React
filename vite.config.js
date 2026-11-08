import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// host: true expõe o servidor na rede, necessário para o GitHub Codespaces
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173 },
});
