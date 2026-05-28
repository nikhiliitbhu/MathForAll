import React, { createContext, useContext, useState, useCallback } from 'react';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [nextRoute, setNextRoute] = useState(null);

  const startLoading = useCallback((route = null) => {
    setIsLoading(true);
    setNextRoute(route);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setNextRoute(null);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, nextRoute, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
}
