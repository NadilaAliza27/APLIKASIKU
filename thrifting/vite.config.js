import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Path relatif agar kompatibel jika dibuka dari subfolder atau static preview
  server: {
    port: 5173,
    open: true // Otomatis membuka browser saat npm run dev dijalankan
  }
});
