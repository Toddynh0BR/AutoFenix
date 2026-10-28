import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Habilita o runtime JSX do React e o Fast Refresh durante o desenvolvimento.
export default defineConfig({
  plugins: [react()],
});
