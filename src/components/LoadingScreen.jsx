import { useCallback, useEffect, useRef } from 'react';
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

  const finish = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    stopLoading();
    if (nextRoute) setLocation(nextRoute);
  }, [nextRoute, stopLoading, setLocation]);

  useEffect(() => {
    if (!isLoading || !videoRef.current) return;

    videoRef.current.currentTime = 0;
    videoRef.current.play().catch((err) => console.log('Autoplay prevented:', err));

    // The intro ends when the clip ends — see the onEnded handler below. A fixed
    // timer used to cut it off partway through, so this one only exists to make
    // sure a video that never plays (autoplay blocked, file missing) cannot leave
    // the reader stuck on a black screen.
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(finish, 8000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isLoading, finish]);

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
          {/* Fades in but never scales — scaling it up from 0.95 left a sliver of
              background showing round the edges for the first frames. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-10 w-full h-full overflow-hidden"
          >
            <video
              ref={videoRef}
              src="/LODING LOGO.mp4"
              autoPlay
              muted
              playsInline
              onEnded={finish}
              onError={finish}
              // cover, so the clip fills any screen edge to edge — phone, laptop
              // or smart board — with no letterboxing down the sides.
              className="absolute inset-0 w-full h-full object-cover"
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
