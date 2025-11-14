// vite.config.ts
import { defineConfig } from "file:///C:/Users/Ifeanyi/Documents/GitHub/driveon-rentals/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Ifeanyi/Documents/GitHub/driveon-rentals/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\Ifeanyi\\Documents\\GitHub\\driveon-rentals";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    target: "es2015",
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          // Explicitly define chunks with clear dependencies
          "vendor-react": ["react", "react-dom", "react/jsx-runtime"],
          "vendor-router": ["react-router-dom"],
          "vendor-ui": ["@radix-ui/react-dialog", "@radix-ui/react-select", "@radix-ui/react-dropdown-menu", "@radix-ui/react-accordion", "@radix-ui/react-tabs", "@radix-ui/react-toast", "@radix-ui/react-tooltip"]
        }
      }
    },
    chunkSizeWarningLimit: 2e3,
    sourcemap: mode === "development"
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxJZmVhbnlpXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcZHJpdmVvbi1yZW50YWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxJZmVhbnlpXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcZHJpdmVvbi1yZW50YWxzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9JZmVhbnlpL0RvY3VtZW50cy9HaXRIdWIvZHJpdmVvbi1yZW50YWxzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogXCI6OlwiLFxuICAgIHBvcnQ6IDgwODAsXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICBdLmZpbHRlcihCb29sZWFuKSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHRhcmdldDogXCJlczIwMTVcIixcbiAgICBtaW5pZnk6ICdlc2J1aWxkJyxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgLy8gRXhwbGljaXRseSBkZWZpbmUgY2h1bmtzIHdpdGggY2xlYXIgZGVwZW5kZW5jaWVzXG4gICAgICAgICAgJ3ZlbmRvci1yZWFjdCc6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0L2pzeC1ydW50aW1lJ10sXG4gICAgICAgICAgJ3ZlbmRvci1yb3V0ZXInOiBbJ3JlYWN0LXJvdXRlci1kb20nXSxcbiAgICAgICAgICAndmVuZG9yLXVpJzogWydAcmFkaXgtdWkvcmVhY3QtZGlhbG9nJywgJ0ByYWRpeC11aS9yZWFjdC1zZWxlY3QnLCAnQHJhZGl4LXVpL3JlYWN0LWRyb3Bkb3duLW1lbnUnLCAnQHJhZGl4LXVpL3JlYWN0LWFjY29yZGlvbicsICdAcmFkaXgtdWkvcmVhY3QtdGFicycsICdAcmFkaXgtdWkvcmVhY3QtdG9hc3QnLCAnQHJhZGl4LXVpL3JlYWN0LXRvb2x0aXAnXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwMDAsXG4gICAgc291cmNlbWFwOiBtb2RlID09PSAnZGV2ZWxvcG1lbnQnLFxuICB9LFxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpVixTQUFTLG9CQUFvQjtBQUM5VyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBRmpCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxFQUNSLEVBQUUsT0FBTyxPQUFPO0FBQUEsRUFDaEIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBO0FBQUEsVUFFWixnQkFBZ0IsQ0FBQyxTQUFTLGFBQWEsbUJBQW1CO0FBQUEsVUFDMUQsaUJBQWlCLENBQUMsa0JBQWtCO0FBQUEsVUFDcEMsYUFBYSxDQUFDLDBCQUEwQiwwQkFBMEIsaUNBQWlDLDZCQUE2Qix3QkFBd0IseUJBQXlCLHlCQUF5QjtBQUFBLFFBQzVNO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLHVCQUF1QjtBQUFBLElBQ3ZCLFdBQVcsU0FBUztBQUFBLEVBQ3RCO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
