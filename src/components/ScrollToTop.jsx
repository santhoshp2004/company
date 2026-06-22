import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // The CSS 'html { scroll-behavior: smooth; }' ensures this is animated smoothly
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
