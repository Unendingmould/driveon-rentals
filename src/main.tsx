import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SupabaseProvider } from "./providers/SupabaseProvider";
import ErrorBoundary from "./components/ErrorBoundary";

// Global error handlers for debugging (especially on mobile)
window.addEventListener('error', (event) => {
  console.error('[Global Error Handler]', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error,
  });
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('[Unhandled Promise Rejection]', {
    reason: event.reason,
    promise: event.promise,
  });
});

// Remove initial loader when React is ready
const removeInitialLoader = () => {
  const loader = document.getElementById('initial-loader');
  if (loader) {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.3s ease-out';
    setTimeout(() => {
      loader.style.display = 'none';
      loader.remove();
    }, 300);
  }
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <SupabaseProvider>
        <App />
      </SupabaseProvider>
    </ErrorBoundary>
  </StrictMode>
);

// Remove loader after React mounts
setTimeout(removeInitialLoader, 100);
