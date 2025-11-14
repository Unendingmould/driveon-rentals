import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Automatically scrolls to the top of the page on route change
 * Ensures users always start at the beginning of a new page
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top immediately on route change
    if (typeof window !== 'undefined') {
      try {
        window.scrollTo(0, 0);
      } catch {
        // Ignore any scroll errors on very old browsers
      }
    }
  }, [pathname]);

  return null;
}
