import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer'; // Optional: For bundle analysis

// https://vite.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [
      react(),
      tailwindcss(),
      ...(process.env.ANALYZE_BUNDLE === 'true' ? [visualizer({
        open: true,
        filename: 'dist/stats.html',
        template: 'treemap', // or sunburst, network
      })] : []),
    ],
    build: {
      sourcemap: !isProduction, // Enable sourcemaps in development
      minify: isProduction, // Enable minification in production
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'; // Group all node_modules into a single vendor chunk
            }
          },
        },
      },
    },
    optimizeDeps: {
      include: [], // Add dependencies that Vite might not automatically detect
    },
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [], // Remove console.log and debugger statements in production
    },
  };
});