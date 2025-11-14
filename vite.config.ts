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
        manualChunks: {
          // Explicitly define chunks with clear dependencies
          'vendor-react': ['react', 'react-dom', 'react/jsx-runtime'],
          'vendor-router': ['react-router-dom'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-select', '@radix-ui/react-dropdown-menu', '@radix-ui/react-accordion', '@radix-ui/react-tabs', '@radix-ui/react-toast', '@radix-ui/react-tooltip'],
        },
      },
    },
    chunkSizeWarningLimit: 2000,
    sourcemap: mode === 'development',
  },
}));
