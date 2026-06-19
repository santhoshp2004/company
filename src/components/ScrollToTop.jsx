import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Prevent the browser from automatically restoring scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Scroll immediately on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    // Scroll again after Framer Motion page exit transition (0.35s) completes
    // to ensure the new page starts exactly at the top without being interrupted by DOM changes.
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 350);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
