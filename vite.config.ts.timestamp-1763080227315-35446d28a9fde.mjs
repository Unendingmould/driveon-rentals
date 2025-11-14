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
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production"
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router")) {
              return "react-vendor";
            }
            if (id.includes("@radix-ui/react-dialog") || id.includes("@radix-ui/react-alert-dialog")) {
              return "radix-dialog";
            }
            if (id.includes("@radix-ui/react-select") || id.includes("@radix-ui/react-dropdown")) {
              return "radix-select";
            }
            if (id.includes("@radix-ui/react-accordion") || id.includes("@radix-ui/react-collapsible")) {
              return "radix-accordion";
            }
            if (id.includes("@radix-ui/react-tabs") || id.includes("@radix-ui/react-navigation")) {
              return "radix-tabs";
            }
            if (id.includes("@radix-ui")) {
              return "radix-other";
            }
            if (id.includes("@supabase")) {
              return "supabase";
            }
            if (id.includes("@tanstack/react-query")) {
              return "react-query";
            }
            if (id.includes("react-hook-form") || id.includes("@hookform")) {
              return "form-libs";
            }
            if (id.includes("date-fns")) {
              return "date-utils";
            }
            if (id.includes("zod")) {
              return "zod";
            }
            if (id.includes("lucide-react")) {
              return "icons";
            }
            if (id.includes("framer-motion")) {
              return "framer-motion";
            }
            if (id.includes("recharts") || id.includes("d3-")) {
              return "charts";
            }
            if (id.includes("react-day-picker") || id.includes("date-picker")) {
              return "date-picker";
            }
            const moduleName = id.split("node_modules/")[1]?.split("/")[0];
            if (moduleName) {
              const firstChar = moduleName[0].toLowerCase();
              if (firstChar >= "a" && firstChar <= "f") {
                return "vendor-a-f";
              } else if (firstChar >= "g" && firstChar <= "m") {
                return "vendor-g-m";
              } else if (firstChar >= "n" && firstChar <= "s") {
                return "vendor-n-s";
              } else {
                return "vendor-t-z";
              }
            }
            return "vendor-other";
          }
          if (id.includes("src/pages/")) {
            const pageName = id.split("src/pages/")[1].split(".")[0].toLowerCase();
            return `page-${pageName}`;
          }
          if (id.includes("src/components/")) {
            if (id.includes("src/components/ui/")) {
              return "ui-components";
            }
            return "components";
          }
        }
      }
    },
    chunkSizeWarningLimit: 600,
    sourcemap: mode === "development"
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxJZmVhbnlpXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcZHJpdmVvbi1yZW50YWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxJZmVhbnlpXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcZHJpdmVvbi1yZW50YWxzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9JZmVhbnlpL0RvY3VtZW50cy9HaXRIdWIvZHJpdmVvbi1yZW50YWxzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiBcIjo6XCIsXHJcbiAgICBwb3J0OiA4MDgwLFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICBdLmZpbHRlcihCb29sZWFuKSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgdGFyZ2V0OiBcImVzMjAxNVwiLFxyXG4gICAgbWluaWZ5OiAndGVyc2VyJyxcclxuICAgIHRlcnNlck9wdGlvbnM6IHtcclxuICAgICAgY29tcHJlc3M6IHtcclxuICAgICAgICBkcm9wX2NvbnNvbGU6IG1vZGUgPT09ICdwcm9kdWN0aW9uJyxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIG1hbnVhbENodW5rczogKGlkKSA9PiB7XHJcbiAgICAgICAgICAvLyBTZXBhcmF0ZSB2ZW5kb3IgY29kZSBmb3IgYmV0dGVyIGNhY2hpbmdcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcclxuICAgICAgICAgICAgLy8gUmVhY3QgZWNvc3lzdGVtXHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygncmVhY3QnKSB8fCBpZC5pbmNsdWRlcygncmVhY3QtZG9tJykgfHwgaWQuaW5jbHVkZXMoJ3JlYWN0LXJvdXRlcicpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICdyZWFjdC12ZW5kb3InO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBSYWRpeCBVSSBjb21wb25lbnRzIC0gc3BsaXQgaW50byBzbWFsbGVyIGNodW5rc1xyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ0ByYWRpeC11aS9yZWFjdC1kaWFsb2cnKSB8fCBpZC5pbmNsdWRlcygnQHJhZGl4LXVpL3JlYWN0LWFsZXJ0LWRpYWxvZycpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICdyYWRpeC1kaWFsb2cnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnQHJhZGl4LXVpL3JlYWN0LXNlbGVjdCcpIHx8IGlkLmluY2x1ZGVzKCdAcmFkaXgtdWkvcmVhY3QtZHJvcGRvd24nKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiAncmFkaXgtc2VsZWN0JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ0ByYWRpeC11aS9yZWFjdC1hY2NvcmRpb24nKSB8fCBpZC5pbmNsdWRlcygnQHJhZGl4LXVpL3JlYWN0LWNvbGxhcHNpYmxlJykpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gJ3JhZGl4LWFjY29yZGlvbic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdAcmFkaXgtdWkvcmVhY3QtdGFicycpIHx8IGlkLmluY2x1ZGVzKCdAcmFkaXgtdWkvcmVhY3QtbmF2aWdhdGlvbicpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICdyYWRpeC10YWJzJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ0ByYWRpeC11aScpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICdyYWRpeC1vdGhlcic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFN1cGFiYXNlXHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnQHN1cGFiYXNlJykpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gJ3N1cGFiYXNlJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gUmVhY3QgUXVlcnlcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdAdGFuc3RhY2svcmVhY3QtcXVlcnknKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiAncmVhY3QtcXVlcnknO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBGb3JtIGxpYnJhcmllc1xyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3JlYWN0LWhvb2stZm9ybScpIHx8IGlkLmluY2x1ZGVzKCdAaG9va2Zvcm0nKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiAnZm9ybS1saWJzJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gVXRpbGl0aWVzXHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnZGF0ZS1mbnMnKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiAnZGF0ZS11dGlscyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCd6b2QnKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiAnem9kJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ2x1Y2lkZS1yZWFjdCcpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICdpY29ucyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFNwbGl0IHJlbWFpbmluZyBsYXJnZSB2ZW5kb3JzXHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnZnJhbWVyLW1vdGlvbicpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICdmcmFtZXItbW90aW9uJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3JlY2hhcnRzJykgfHwgaWQuaW5jbHVkZXMoJ2QzLScpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICdjaGFydHMnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygncmVhY3QtZGF5LXBpY2tlcicpIHx8IGlkLmluY2x1ZGVzKCdkYXRlLXBpY2tlcicpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICdkYXRlLXBpY2tlcic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIE90aGVyIG5vZGVfbW9kdWxlcyAtIHNwbGl0IGFscGhhYmV0aWNhbGx5IGZvciBiZXR0ZXIgY2FjaGluZ1xyXG4gICAgICAgICAgICBjb25zdCBtb2R1bGVOYW1lID0gaWQuc3BsaXQoJ25vZGVfbW9kdWxlcy8nKVsxXT8uc3BsaXQoJy8nKVswXTtcclxuICAgICAgICAgICAgaWYgKG1vZHVsZU5hbWUpIHtcclxuICAgICAgICAgICAgICBjb25zdCBmaXJzdENoYXIgPSBtb2R1bGVOYW1lWzBdLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgaWYgKGZpcnN0Q2hhciA+PSAnYScgJiYgZmlyc3RDaGFyIDw9ICdmJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3ItYS1mJztcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpcnN0Q2hhciA+PSAnZycgJiYgZmlyc3RDaGFyIDw9ICdtJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3ItZy1tJztcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpcnN0Q2hhciA+PSAnbicgJiYgZmlyc3RDaGFyIDw9ICdzJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3Itbi1zJztcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3ItdC16JztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiAndmVuZG9yLW90aGVyJztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gU3BsaXQgYXBwIGNvZGUgYnkgcm91dGUvcGFnZVxyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdzcmMvcGFnZXMvJykpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFnZU5hbWUgPSBpZC5zcGxpdCgnc3JjL3BhZ2VzLycpWzFdLnNwbGl0KCcuJylbMF0udG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGBwYWdlLSR7cGFnZU5hbWV9YDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gU3BsaXQgY29tcG9uZW50c1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdzcmMvY29tcG9uZW50cy8nKSkge1xyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3NyYy9jb21wb25lbnRzL3VpLycpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICd1aS1jb21wb25lbnRzJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gJ2NvbXBvbmVudHMnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA2MDAsXHJcbiAgICBzb3VyY2VtYXA6IG1vZGUgPT09ICdkZXZlbG9wbWVudCcsXHJcbiAgfSxcclxufSkpO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlWLFNBQVMsb0JBQW9CO0FBQzlXLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFGakIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLEVBQ1IsRUFBRSxPQUFPLE9BQU87QUFBQSxFQUNoQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUixjQUFjLFNBQVM7QUFBQSxNQUN6QjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNB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
