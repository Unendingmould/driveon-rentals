import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SupabaseProvider } from "./providers/SupabaseProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import { logFrontEndError } from "./services/errorLogger";

// Global error handlers for debugging (especially on mobile)
window.addEventListener("error", (event) => {
  console.error("[Global Error Handler]", {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error,
  });

  void logFrontEndError({
    context: "window.error",
    error: event.error ?? event.message,
    extra: {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    },
  });
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("[Unhandled Promise Rejection]", {
    reason: event.reason,
    promise: event.promise,
  });

  void logFrontEndError({
    context: "window.unhandledrejection",
    error: event.reason,
    extra: {},
  });
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary>
      <SupabaseProvider>
        <App />
      </SupabaseProvider>
    </ErrorBoundary>
  </StrictMode>
);
