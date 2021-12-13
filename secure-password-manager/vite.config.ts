// @ts-ignore
import { dependencies } from './package.json';
import {defineConfig} from "vite";
import react from '@vitejs/plugin-react'
function renderChunks(deps: Record<string, string>) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['react','wouter','react-dom'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react','wouter','react-dom'],
          ...renderChunks(dependencies),
        },
      },
    },
  },
})
