import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base: './'` keeps every asset URL relative, so the built `dist/` folder
// works from any sub-path or static host without reconfiguration.
export default defineConfig({
  base: './',
  plugins: [react()],
});
