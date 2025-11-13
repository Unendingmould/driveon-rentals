import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Only log 404s in development to avoid console spam
    if (import.meta.env.DEV) {
      console.warn("404 - Page not found:", location.pathname);
    }
    // In production, send to analytics/error tracking service
    // Example: analytics.track('404_error', { path: location.pathname });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow flex items-center justify-center bg-background">
        <div className="text-center px-4">
          <h1 className="text-8xl md:text-9xl font-extrabold text-yellow-400 tracking-wider">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">Page Not Found</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
          <Link to="/">
            <Button className="btn-cta text-lg px-8 py-6">
              Return to Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
