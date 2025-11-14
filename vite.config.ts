import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separate vendor code for better caching
          if (id.includes('node_modules')) {
            // React ecosystem
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            
            // Radix UI components - split into smaller chunks
            if (id.includes('@radix-ui/react-dialog') || id.includes('@radix-ui/react-alert-dialog')) {
              return 'radix-dialog';
            }
            if (id.includes('@radix-ui/react-select') || id.includes('@radix-ui/react-dropdown')) {
              return 'radix-select';
            }
            if (id.includes('@radix-ui/react-accordion') || id.includes('@radix-ui/react-collapsible')) {
              return 'radix-accordion';
            }
            if (id.includes('@radix-ui/react-tabs') || id.includes('@radix-ui/react-navigation')) {
              return 'radix-tabs';
            }
            if (id.includes('@radix-ui')) {
              return 'radix-other';
            }
            
            // Supabase
            if (id.includes('@supabase')) {
              return 'supabase';
            }
            
            // React Query
            if (id.includes('@tanstack/react-query')) {
              return 'react-query';
            }
            
            // Form libraries
            if (id.includes('react-hook-form') || id.includes('@hookform')) {
              return 'form-libs';
            }
            
            // Utilities
            if (id.includes('date-fns')) {
              return 'date-utils';
            }
            if (id.includes('zod')) {
              return 'zod';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            
            // Split remaining large vendors
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('recharts') || id.includes('d3-')) {
              return 'charts';
            }
            if (id.includes('react-day-picker') || id.includes('date-picker')) {
              return 'date-picker';
            }
            
            // Other node_modules - split alphabetically for better caching
            const moduleName = id.split('node_modules/')[1]?.split('/')[0];
            if (moduleName) {
              const firstChar = moduleName[0].toLowerCase();
              if (firstChar >= 'a' && firstChar <= 'f') {
                return 'vendor-a-f';
              } else if (firstChar >= 'g' && firstChar <= 'm') {
                return 'vendor-g-m';
              } else if (firstChar >= 'n' && firstChar <= 's') {
                return 'vendor-n-s';
              } else {
                return 'vendor-t-z';
              }
            }
            
            return 'vendor-other';
          }
          
          // Split app code by route/page
          if (id.includes('src/pages/')) {
            const pageName = id.split('src/pages/')[1].split('.')[0].toLowerCase();
            return `page-${pageName}`;
          }
          
          // Split components
          if (id.includes('src/components/')) {
            if (id.includes('src/components/ui/')) {
              return 'ui-components';
            }
            return 'components';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
    sourcemap: mode === 'development',
  },
}));
