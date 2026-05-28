import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '@/context/LoadingContext';
import { useLocation } from 'wouter';
import { useBodyLock } from '@/hooks/use-body-lock';

export function LoadingScreen() {
  const { isLoading, nextRoute, stopLoading } = useLoading();
  const [, setLocation] = useLocation();
  const videoRef = useRef(null);
  const timeoutRef = useRef(null);

  // Lock body scroll when loading
  useBodyLock(isLoading);

  useEffect(() => {
    if (isLoading && videoRef.current) {
      // Reset video to start
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => console.log('Autoplay prevented:', err));

      // Clear any existing timeout
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Set timeout for 2 seconds
      timeoutRef.current = setTimeout(() => {
        stopLoading();

        // Navigate to next route if specified
        if (nextRoute) {
          setLocation(nextRoute);
        }
      }, 2000);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isLoading, nextRoute, stopLoading, setLocation]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          {/* Background overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black" />

          {/* Video container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
            className="relative z-10 w-full h-full flex items-center justify-center"
          >
            <video
              ref={videoRef}
              src="/LODING LOGO.mp4"
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{
                filter: 'drop-shadow(0 0 40px rgba(168, 85, 247, 0.3))',
              }}
            />
          </motion.div>

          {/* Optional: Loading indicator with dots */}
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                animate={{ y: [0, -8, 0] }}
                transition={{ delay: i * 0.15, duration: 0.8, repeat: Infinity }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
