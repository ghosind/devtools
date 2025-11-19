"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function isBrowser() {
  return typeof window !== 'undefined';
}

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID || !isBrowser()) return;

    // Inject gtag script if not present
    if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_ID}"]`)) {
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(s);
    }

    // Initialize dataLayer and gtag function
    if (!(window as any).dataLayer) {
      (window as any).dataLayer = [];
    }

    if (!(window as any).gtag) {
      (window as any).gtag = function () { (window as any).dataLayer.push(arguments); };
      (window as any).gtag('js', new Date());
      (window as any).gtag('config', GA_ID, { page_path: pathname });
    }

  // We intentionally want GA_ID to be captured from env at runtime and pathname to trigger page view updates
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!GA_ID || !isBrowser()) return;

    const handleRoute = (path: string) => {
      try {
        if ((window as any).gtag) {
          (window as any).gtag('config', GA_ID, { page_path: path });
        }
      } catch (e) {
        // noop
      }
    };

    // call once for initial load
    handleRoute(pathname);

    // future pathname changes are handled by the other effect because we depend on pathname
    return () => {
      // nothing to cleanup
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
