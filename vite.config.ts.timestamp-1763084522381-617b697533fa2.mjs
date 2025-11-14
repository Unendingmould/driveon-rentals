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
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router") || id.includes("scheduler") || id.includes("use-sync-external-store") || id.includes("react-is")) {
              return "react-vendor";
            }
            if (id.includes("vaul") || id.includes("sonner") || id.includes("cmdk")) {
              return "react-ui-libs";
            }
            if (id.includes("@radix-ui")) {
              return "radix-ui";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxJZmVhbnlpXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcZHJpdmVvbi1yZW50YWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxJZmVhbnlpXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcZHJpdmVvbi1yZW50YWxzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9JZmVhbnlpL0RvY3VtZW50cy9HaXRIdWIvZHJpdmVvbi1yZW50YWxzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiBcIjo6XCIsXHJcbiAgICBwb3J0OiA4MDgwLFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICBdLmZpbHRlcihCb29sZWFuKSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgdGFyZ2V0OiBcImVzMjAxNVwiLFxyXG4gICAgbWluaWZ5OiAnZXNidWlsZCcsXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIG1hbnVhbENodW5rczogKGlkKSA9PiB7XHJcbiAgICAgICAgICAvLyBTZXBhcmF0ZSB2ZW5kb3IgY29kZSBmb3IgYmV0dGVyIGNhY2hpbmdcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcclxuICAgICAgICAgICAgLy8gUmVhY3QgZWNvc3lzdGVtIC0gaW5jbHVkZSBBTEwgUmVhY3QgYW5kIGNvcmUgUmVhY3QgaG9va3MvbGlicmFyaWVzXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcygncmVhY3QnKSB8fCBcclxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcygncmVhY3QtZG9tJykgfHwgXHJcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ3JlYWN0LXJvdXRlcicpIHx8XHJcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ3NjaGVkdWxlcicpIHx8XHJcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ3VzZS1zeW5jLWV4dGVybmFsLXN0b3JlJykgfHxcclxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcygncmVhY3QtaXMnKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICByZXR1cm4gJ3JlYWN0LXZlbmRvcic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFVJIGxpYnJhcmllcyB0aGF0IGRlcGVuZCBvbiBSZWFjdCAobXVzdCBsb2FkIGFmdGVyIFJlYWN0KVxyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3ZhdWwnKSB8fCBpZC5pbmNsdWRlcygnc29ubmVyJykgfHwgaWQuaW5jbHVkZXMoJ2NtZGsnKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiAncmVhY3QtdWktbGlicyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFJhZGl4IFVJIGNvbXBvbmVudHMgLSBBTEwgZGVwZW5kIG9uIFJlYWN0XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnQHJhZGl4LXVpJykpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gJ3JhZGl4LXVpJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gU3VwYWJhc2VcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdAc3VwYWJhc2UnKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiAnc3VwYWJhc2UnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBSZWFjdCBRdWVyeVxyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ0B0YW5zdGFjay9yZWFjdC1xdWVyeScpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICdyZWFjdC1xdWVyeSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEZvcm0gbGlicmFyaWVzXHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygncmVhY3QtaG9vay1mb3JtJykgfHwgaWQuaW5jbHVkZXMoJ0Bob29rZm9ybScpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICdmb3JtLWxpYnMnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBVdGlsaXRpZXNcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdkYXRlLWZucycpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICdkYXRlLXV0aWxzJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3pvZCcpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICd6b2QnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbHVjaWRlLXJlYWN0JykpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gJ2ljb25zJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gU3BsaXQgcmVtYWluaW5nIGxhcmdlIHZlbmRvcnNcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdmcmFtZXItbW90aW9uJykpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gJ2ZyYW1lci1tb3Rpb24nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygncmVjaGFydHMnKSB8fCBpZC5pbmNsdWRlcygnZDMtJykpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gJ2NoYXJ0cyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdyZWFjdC1kYXktcGlja2VyJykgfHwgaWQuaW5jbHVkZXMoJ2RhdGUtcGlja2VyJykpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gJ2RhdGUtcGlja2VyJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gT3RoZXIgbm9kZV9tb2R1bGVzIC0gc3BsaXQgYWxwaGFiZXRpY2FsbHkgZm9yIGJldHRlciBjYWNoaW5nXHJcbiAgICAgICAgICAgIGNvbnN0IG1vZHVsZU5hbWUgPSBpZC5zcGxpdCgnbm9kZV9tb2R1bGVzLycpWzFdPy5zcGxpdCgnLycpWzBdO1xyXG4gICAgICAgICAgICBpZiAobW9kdWxlTmFtZSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGZpcnN0Q2hhciA9IG1vZHVsZU5hbWVbMF0udG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICBpZiAoZmlyc3RDaGFyID49ICdhJyAmJiBmaXJzdENoYXIgPD0gJ2YnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3ZlbmRvci1hLWYnO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlyc3RDaGFyID49ICdnJyAmJiBmaXJzdENoYXIgPD0gJ20nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3ZlbmRvci1nLW0nO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlyc3RDaGFyID49ICduJyAmJiBmaXJzdENoYXIgPD0gJ3MnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3ZlbmRvci1uLXMnO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3ZlbmRvci10LXonO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3Itb3RoZXInO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBTcGxpdCBhcHAgY29kZSBieSByb3V0ZS9wYWdlXHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3NyYy9wYWdlcy8nKSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYWdlTmFtZSA9IGlkLnNwbGl0KCdzcmMvcGFnZXMvJylbMV0uc3BsaXQoJy4nKVswXS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gYHBhZ2UtJHtwYWdlTmFtZX1gO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBTcGxpdCBjb21wb25lbnRzXHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3NyYy9jb21wb25lbnRzLycpKSB7XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnc3JjL2NvbXBvbmVudHMvdWkvJykpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gJ3VpLWNvbXBvbmVudHMnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAnY29tcG9uZW50cyc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDYwMCxcclxuICAgIHNvdXJjZW1hcDogbW9kZSA9PT0gJ2RldmVsb3BtZW50JyxcclxuICB9LFxyXG59KSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVYsU0FBUyxvQkFBb0I7QUFDOVcsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUZqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsRUFDUixFQUFFLE9BQU8sT0FBTztBQUFBLEVBQ2hCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWMsQ0FBQyxPQUFPO0FBRXBCLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUUvQixnQkFDRSxHQUFHLFNBQVMsT0FBTyxLQUNuQixHQUFHLFNBQVMsV0FBVyxLQUN2QixHQUFHLFNBQVMsY0FBYyxLQUMxQixHQUFHLFNBQVMsV0FBVyxLQUN2QixHQUFHLFNBQVMseUJBQXlCLEtBQ3JDLEdBQUcsU0FBUyxVQUFVLEdBQ3RCO0FBQ0EscUJBQU87QUFBQSxZQUNUO0FBR0EsZ0JBQUksR0FBRyxTQUFTLE1BQU0sS0FBSyxHQUFHLFNBQVMsUUFBUSxLQUFLLEdBQUcsU0FBUyxNQUFNLEdBQUc7QUFDdkUscUJBQU87QUFBQSxZQUNUO0FBR0EsZ0JBQUksR0FBRyxTQUFTLFdBQVcsR0FBRztBQUM1QixxQkFBTztBQUFBLFlBQ1Q7QUFHQSxnQkFBSSxHQUFHLFNBQVMsV0FBVyxHQUFHO0FBQzVCLHFCQUFPO0FBQUEsWUFDVDtBQUdBLGdCQUFJLEdBQUcsU0FBUyx1QkFBdUIsR0FBRztBQUN4QyxxQkFBTztBQUFBLFlBQ1Q7QUFHQSxnQkFBSSxHQUFHLFNBQVMsaUJBQWlCLEtBQUssR0FBRyxTQUFTLFdBQVcsR0FBRztBQUM5RCxxQkFBTztBQUFBLFlBQ1Q7QUFHQSxnQkFBSSxHQUFHLFNBQVMsVUFBVSxHQUFHO0FBQzNCLHFCQUFPO0FBQUEsWUFDVDtBQUNBLGdCQUFJLEdBQUcsU0FBUyxLQUFLLEdBQUc7QUFDdEIscUJBQU87QUFBQSxZQUNUO0FBQ0EsZ0JBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixxQkFBTztBQUFBLFlBQ1Q7QUFHQSxnQkFBSSxHQUFHLFNBQVMsZUFBZSxHQUFHO0FBQ2hDLHFCQUFPO0FBQUEsWUFDVDtBQUNBLGdCQUFJLEdBQUcsU0FBUyxVQUFVLEtBQUssR0FBRyxTQUFTLEtBQUssR0FBRztBQUNqRCxxQkFBTztBQUFBLFlBQ1Q7QUFDQSxnQkFBSSxHQUFHLFNBQVMsa0JBQWtCLEtBQUssR0FBRyxTQUFTLGFBQWEsR0FBRztBQUNqRSxxQkFBTztBQUFBLFlBQ1Q7QUFHQSxrQkFBTSxhQUFhLEdBQUcsTUFBTSxlQUFlLEVBQUUsQ0FBQyxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDN0QsZ0JBQUksWUFBWTtBQUNkLG9CQUFNLFlBQVksV0FBVyxDQUFDLEVBQUUsWUFBWTtBQUM1QyxrQkFBSSxhQUFhLE9BQU8sYUFBYSxLQUFLO0FBQ3hDLHVCQUFPO0FBQUEsY0FDVCxXQUFXLGFBQWEsT0FBTyxhQUFhLEtBQUs7QUFDL0MsdUJBQU87QUFBQSxjQUNULFdBQVcsYUFBYSxPQUFPLGFBQWEsS0FBSztBQUMvQyx1QkFBTztBQUFBLGNBQ1QsT0FBTztBQUNMLHVCQUFPO0FBQUEsY0FDVDtBQUFBLFlBQ0Y7QUFFQSxtQkFBTztBQUFBLFVBQ1Q7QUFHQSxjQUFJLEdBQUcsU0FBUyxZQUFZLEdBQUc7QUFDN0Isa0JBQU0sV0FBVyxHQUFHLE1BQU0sWUFBWSxFQUFFLENBQUMsRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsWUFBWTtBQUNyRSxtQkFBTyxRQUFRLFFBQVE7QUFBQSxVQUN6QjtBQUdBLGNBQUksR0FBRyxTQUFTLGlCQUFpQixHQUFHO0FBQ2xDLGdCQUFJLEdBQUcsU0FBUyxvQkFBb0IsR0FBRztBQUNyQyxxQkFBTztBQUFBLFlBQ1Q7QUFDQSxtQkFBTztBQUFBLFVBQ1Q7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLHVCQUF1QjtBQUFBLElBQ3ZCLFdBQVcsU0FBUztBQUFBLEVBQ3RCO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
