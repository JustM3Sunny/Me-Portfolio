import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const analyzeBundle = process.env.ANALYZE_BUNDLE === 'true';

  const plugins = [react(), tailwindcss()];

  if (analyzeBundle) {
    plugins.push(
      visualizer({
        open: true,
        filename: 'dist/stats.html',
        template: 'treemap',
      })
    );
  }

  return {
    plugins,
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
            return undefined;
          },
          chunkFileNames: (chunkInfo) =>
            isProduction ? `js/[name]-[hash].js` : `js/[name].js`,
          entryFileNames: (chunkInfo) =>
            isProduction ? `js/[name]-[hash].js` : `js/[name].js`,
          assetFileNames: (assetInfo) => {
            if (!assetInfo?.name) {
              return `assets/unknown-[hash][extname]`;
            }

            const extType = assetInfo.name.split('.').pop();

            if (!extType) {
              return `assets/no-extension-[hash]`;
            }

            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              return `images/[name]-[hash][extname]`;
            }

            return `assets/[name]-[hash][extname]`;
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
    server: {
      port: 3000,
      hmr: {
        overlay: true,
      },
    },
    cacheDir: '.vite',
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      // Add a feature flag example
      'process.env.FEATURE_FLAG_EXAMPLE': JSON.stringify(process.env.FEATURE_FLAG_EXAMPLE || 'false'),
    },
    // Add linting and formatting on save during development
    ...(mode === 'development'
      ? {
          plugins: [
            {
              name: 'eslint',
              enforce: 'pre',
              async transform(code, id) {
                if (/\.(js|jsx|ts|tsx)$/.test(id)) {
                  try {
                    const { ESLint } = await import('eslint');
                    const eslint = new ESLint();
                    const results = await eslint.lintText(code, { filePath: id });
                    if (results && results.length > 0) {
                      results.forEach((result) => {
                        if (result.messages && result.messages.length > 0) {
                          result.messages.forEach((message) => {
                            console.warn(`eslint: ${message.message} (${message.ruleId}) in ${id}:${message.line}:${message.column}`);
                          });
                        }
                      });
                    }
                  } catch (error) {
                    console.error('ESLint error:', error);
                  }
                }
                return code;
              },
            },
          ],
        }
      : {}),
  };
});