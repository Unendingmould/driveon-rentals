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
        manualChunks: (id) => {
          if (id.includes("src/pages/")) {
            const pageName = id.split("src/pages/")[1].split(".")[0].toLowerCase();
            return `page-${pageName}`;
          }
          if (id.includes("src/components/ui/")) {
            return "ui-components";
          }
          if (id.includes("src/components/")) {
            return "components";
          }
          if (id.includes("node_modules")) {
            if (id.includes("react/") || id.includes("react-dom/") || id.includes("scheduler/") || id.includes("react-is/")) {
              return "vendor-react-core";
            }
            if (id.includes("react-router") || id.includes("react-hook-form") || id.includes("react-day-picker") || id.includes("@tanstack/react") || id.includes("@hookform") || id.includes("@radix-ui") || id.includes("vaul") || id.includes("sonner") || id.includes("cmdk") || id.includes("next-themes") || id.includes("lucide-react")) {
              return "vendor-react-ecosystem";
            }
            if (id.includes("@supabase")) {
              return "vendor-supabase";
            }
            if (id.includes("recharts") || id.includes("d3-") || id.includes("framer-motion")) {
              return "vendor-charts";
            }
            if (id.includes("date-fns") || id.includes("zod") || id.includes("clsx") || id.includes("class-variance-authority") || id.includes("tailwind-merge")) {
              return "vendor-utils";
            }
            return "vendor-libs";
          }
        }
      }
    },
    chunkSizeWarningLimit: 1e3,
    sourcemap: mode === "development"
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxJZmVhbnlpXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcZHJpdmVvbi1yZW50YWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxJZmVhbnlpXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcZHJpdmVvbi1yZW50YWxzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9JZmVhbnlpL0RvY3VtZW50cy9HaXRIdWIvZHJpdmVvbi1yZW50YWxzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogXCI6OlwiLFxuICAgIHBvcnQ6IDgwODAsXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICBdLmZpbHRlcihCb29sZWFuKSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHRhcmdldDogXCJlczIwMTVcIixcbiAgICBtaW5pZnk6ICdlc2J1aWxkJyxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiAoaWQpID0+IHtcbiAgICAgICAgICAvLyBTcGxpdCBhcHAgY29kZSBieSByb3V0ZS9wYWdlIGZvciBsYXp5IGxvYWRpbmdcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3NyYy9wYWdlcy8nKSkge1xuICAgICAgICAgICAgY29uc3QgcGFnZU5hbWUgPSBpZC5zcGxpdCgnc3JjL3BhZ2VzLycpWzFdLnNwbGl0KCcuJylbMF0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHJldHVybiBgcGFnZS0ke3BhZ2VOYW1lfWA7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIC8vIFNwbGl0IFVJIGNvbXBvbmVudHNcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3NyYy9jb21wb25lbnRzL3VpLycpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3VpLWNvbXBvbmVudHMnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3NyYy9jb21wb25lbnRzLycpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NvbXBvbmVudHMnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICAvLyBGb3Igbm9kZV9tb2R1bGVzLCB1c2Ugc2ltcGxlIHN0cmF0ZWd5IHRvIGVuc3VyZSBSZWFjdCBsb2FkcyBmaXJzdFxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcbiAgICAgICAgICAgIC8vIEdyb3VwIDE6IFJlYWN0IGNvcmUgKE1VU1QgbG9hZCBmaXJzdClcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ3JlYWN0LycpIHx8IFxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcygncmVhY3QtZG9tLycpIHx8XG4gICAgICAgICAgICAgIGlkLmluY2x1ZGVzKCdzY2hlZHVsZXIvJykgfHxcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ3JlYWN0LWlzLycpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3ItcmVhY3QtY29yZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEdyb3VwIDI6IFJlYWN0IGVjb3N5c3RlbSAobG9hZHMgYWZ0ZXIgcmVhY3QtY29yZSlcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ3JlYWN0LXJvdXRlcicpIHx8XG4gICAgICAgICAgICAgIGlkLmluY2x1ZGVzKCdyZWFjdC1ob29rLWZvcm0nKSB8fFxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcygncmVhY3QtZGF5LXBpY2tlcicpIHx8XG4gICAgICAgICAgICAgIGlkLmluY2x1ZGVzKCdAdGFuc3RhY2svcmVhY3QnKSB8fFxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcygnQGhvb2tmb3JtJykgfHxcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ0ByYWRpeC11aScpIHx8XG4gICAgICAgICAgICAgIGlkLmluY2x1ZGVzKCd2YXVsJykgfHxcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ3Nvbm5lcicpIHx8XG4gICAgICAgICAgICAgIGlkLmluY2x1ZGVzKCdjbWRrJykgfHxcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ25leHQtdGhlbWVzJykgfHxcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ2x1Y2lkZS1yZWFjdCcpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3ItcmVhY3QtZWNvc3lzdGVtJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gR3JvdXAgMzogU3VwYWJhc2UgKGluZGVwZW5kZW50KVxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdAc3VwYWJhc2UnKSkge1xuICAgICAgICAgICAgICByZXR1cm4gJ3ZlbmRvci1zdXBhYmFzZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEdyb3VwIDQ6IEhlYXZ5IGxpYnJhcmllcyAoYXN5bmMgbG9hZClcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygncmVjaGFydHMnKSB8fCBpZC5pbmNsdWRlcygnZDMtJykgfHwgaWQuaW5jbHVkZXMoJ2ZyYW1lci1tb3Rpb24nKSkge1xuICAgICAgICAgICAgICByZXR1cm4gJ3ZlbmRvci1jaGFydHMnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBHcm91cCA1OiBVdGlsaXRpZXMgKGluZGVwZW5kZW50IG9mIFJlYWN0KVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcygnZGF0ZS1mbnMnKSB8fFxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcygnem9kJykgfHxcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ2Nsc3gnKSB8fFxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcygnY2xhc3MtdmFyaWFuY2UtYXV0aG9yaXR5JykgfHxcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ3RhaWx3aW5kLW1lcmdlJylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gJ3ZlbmRvci11dGlscyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEV2ZXJ5dGhpbmcgZWxzZSBnb2VzIGludG8gdmVuZG9yLWxpYnMgKHNob3VsZCBiZSBzbWFsbCBhbmQgUmVhY3QtaW5kZXBlbmRlbnQpXG4gICAgICAgICAgICByZXR1cm4gJ3ZlbmRvci1saWJzJztcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLFxuICAgIHNvdXJjZW1hcDogbW9kZSA9PT0gJ2RldmVsb3BtZW50JyxcbiAgfSxcbn0pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVYsU0FBUyxvQkFBb0I7QUFDOVcsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUZqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsRUFDUixFQUFFLE9BQU8sT0FBTztBQUFBLEVBQ2hCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWMsQ0FBQyxPQUFPO0FBRXBCLGNBQUksR0FBRyxTQUFTLFlBQVksR0FBRztBQUM3QixrQkFBTSxXQUFXLEdBQUcsTUFBTSxZQUFZLEVBQUUsQ0FBQyxFQUFFLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxZQUFZO0FBQ3JFLG1CQUFPLFFBQVEsUUFBUTtBQUFBLFVBQ3pCO0FBR0EsY0FBSSxHQUFHLFNBQVMsb0JBQW9CLEdBQUc7QUFDckMsbUJBQU87QUFBQSxVQUNUO0FBQ0EsY0FBSSxHQUFHLFNBQVMsaUJBQWlCLEdBQUc7QUFDbEMsbUJBQU87QUFBQSxVQUNUO0FBR0EsY0FBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBRS9CLGdCQUNFLEdBQUcsU0FBUyxRQUFRLEtBQ3BCLEdBQUcsU0FBUyxZQUFZLEtBQ3hCLEdBQUcsU0FBUyxZQUFZLEtBQ3hCLEdBQUcsU0FBUyxXQUFXLEdBQ3ZCO0FBQ0EscUJBQU87QUFBQSxZQUNUO0FBR0EsZ0JBQ0UsR0FBRyxTQUFTLGNBQWMsS0FDMUIsR0FBRyxTQUFTLGlCQUFpQixLQUM3QixHQUFHLFNBQVMsa0JBQWtCLEtBQzlCLEdBQUcsU0FBUyxpQkFBaUIsS0FDN0IsR0FBRyxTQUFTLFdBQVcsS0FDdkIsR0FBRyxTQUFTLFdBQVcsS0FDdkIsR0FBRyxTQUFTLE1BQU0sS0FDbEIsR0FBRyxTQUFTLFFBQVEsS0FDcEIsR0FBRyxTQUFTLE1BQU0sS0FDbEIsR0FBRyxTQUFTLGFBQWEsS0FDekIsR0FBRyxTQUFTLGNBQWMsR0FDMUI7QUFDQSxxQkFBTztBQUFBLFlBQ1Q7QUFHQSxnQkFBSSxHQUFHLFNBQVMsV0FBVyxHQUFHO0FBQzVCLHFCQUFPO0FBQUEsWUFDVDtBQUdBLGdCQUFJLEdBQUcsU0FBUyxVQUFVLEtBQUssR0FBRyxTQUFTLEtBQUssS0FBSyxHQUFHLFNBQVMsZUFBZSxHQUFHO0FBQ2pGLHFCQUFPO0FBQUEsWUFDVDtBQUdBLGdCQUNFLEdBQUcsU0FBUyxVQUFVLEtBQ3RCLEdBQUcsU0FBUyxLQUFLLEtBQ2pCLEdBQUcsU0FBUyxNQUFNLEtBQ2xCLEdBQUcsU0FBUywwQkFBMEIsS0FDdEMsR0FBRyxTQUFTLGdCQUFnQixHQUM1QjtBQUNBLHFCQUFPO0FBQUEsWUFDVDtBQUdBLG1CQUFPO0FBQUEsVUFDVDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsdUJBQXVCO0FBQUEsSUFDdkIsV0FBVyxTQUFTO0FBQUEsRUFDdEI7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
