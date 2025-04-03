import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  build: {
    // For extension build
    ...(command === 'build' && {
      rollupOptions: {
        input: 'src/content/index.tsx',
        output: {
          entryFileNames: 'content.js',
          assetFileNames: 'styles.css'
        }
      }
    })
  }
})); 