import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLoading } from '@/context/LoadingContext';

export function AppInitializer() {
  const { startLoading } = useLoading();
  const [location] = useLocation();

  useEffect(() => {
    // Play the intro on every visit to the learning page, not just the first of
    // the browser session. LoadingScreen decides when it is done — it ends with
    // the clip — so there is deliberately no timer here to cut it short.
    if (location === '/learn') startLoading();
  }, [location, startLoading]);

  return null;
}
