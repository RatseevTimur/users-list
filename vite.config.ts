import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import terser from '@rollup/plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';
import pluginPurgeCss from '@mojojoejo/vite-plugin-purgecss';

export default defineConfig({
  plugins: [
    react(),
    terser({
      mangle: true,
      compress: true,
    }),
    pluginPurgeCss({
      content: ['./src/**/*.{tsx,ts,scss}'],
      safelist: ['html', 'body'],
    }),
    visualizer({
      open: true,
      filename: 'stats.html',
    }),
  ],
  build: {
    minify: 'terser',
    sourcemap: false,
  },
});