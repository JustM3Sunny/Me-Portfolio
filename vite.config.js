import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const analyzeBundle = process.env.ANALYZE_BUNDLE === 'true';

  return {
    plugins: [
      react(),
      tailwindcss(),
      ...(analyzeBundle
        ? [
            visualizer({
              open: true,
              filename: 'dist/stats.html',
              template: 'treemap',
            }),
          ]
        : []),
    ],
    build: {
      sourcemap: !isProduction,
      minify: isProduction,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
            // Consider splitting larger component files into separate chunks
            // Example:
            // if (id.includes('/src/components/') && id.endsWith('.jsx')) {
            //   const componentName = id.split('/').pop().replace('.jsx', '');
            //   return `component-${componentName}`;
            // }
          },
          chunkFileNames: isProduction
            ? 'js/[name]-[hash].js'
            : 'js/[name].js',
          entryFileNames: isProduction
            ? 'js/[name]-[hash].js'
            : 'js/[name].js',
          assetFileNames: (assetInfo) => {
            const extType = assetInfo.name.split('.').pop();
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              return `images/[name]-[hash][extname]`;
            }
            return `[extType]/[name]-[hash][extname]`;
          },
        },
      },
    },
    optimizeDeps: {
      include: [],
    },
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [],
    },
  };
});