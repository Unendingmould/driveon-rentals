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
    target: "es2015",
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split app code by route/page for lazy loading
          if (id.includes('src/pages/')) {
            const pageName = id.split('src/pages/')[1].split('.')[0].toLowerCase();
            return `page-${pageName}`;
          }
          
          // Split UI components
          if (id.includes('src/components/ui/')) {
            return 'ui-components';
          }
          if (id.includes('src/components/')) {
            return 'components';
          }
          
          // For node_modules, use simple strategy to ensure React loads first
          if (id.includes('node_modules')) {
            // Group 1: React core (MUST load first)
            if (
              id.includes('react/') || 
              id.includes('react-dom/') ||
              id.includes('scheduler/') ||
              id.includes('react-is/')
            ) {
              return 'vendor-react-core';
            }
            
            // Group 2: React ecosystem (loads after react-core)
            if (
              id.includes('react-router') ||
              id.includes('react-hook-form') ||
              id.includes('react-day-picker') ||
              id.includes('@tanstack/react') ||
              id.includes('@hookform') ||
              id.includes('@radix-ui') ||
              id.includes('vaul') ||
              id.includes('sonner') ||
              id.includes('cmdk') ||
              id.includes('next-themes') ||
              id.includes('lucide-react')
            ) {
              return 'vendor-react-ecosystem';
            }
            
            // Group 3: Supabase (independent)
            if (id.includes('@supabase')) {
              return 'vendor-supabase';
            }
            
            // Group 4: Heavy libraries (async load)
            if (id.includes('recharts') || id.includes('d3-') || id.includes('framer-motion')) {
              return 'vendor-charts';
            }
            
            // Group 5: Utilities (independent of React)
            if (
              id.includes('date-fns') ||
              id.includes('zod') ||
              id.includes('clsx') ||
              id.includes('class-variance-authority') ||
              id.includes('tailwind-merge')
            ) {
              return 'vendor-utils';
            }
            
            // Everything else goes into vendor-libs (should be small and React-independent)
            return 'vendor-libs';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: mode === 'development',
  },
}));
