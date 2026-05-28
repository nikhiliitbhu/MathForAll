import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLoading } from '@/context/LoadingContext';

export function AppInitializer() {
  const { startLoading, stopLoading } = useLoading();
  const [location] = useLocation();

  useEffect(() => {
    const isFirstLoad = !sessionStorage.getItem('appInitialized');

    if (!isFirstLoad) return;

    sessionStorage.setItem('appInitialized', 'true');

    if (location === '/learn') {
      startLoading();

      const timer = setTimeout(() => {
        stopLoading();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [location, startLoading, stopLoading]);

  return null;
}
