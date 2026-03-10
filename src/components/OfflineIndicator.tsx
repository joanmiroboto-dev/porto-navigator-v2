import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff } from 'lucide-react';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-0 left-0 right-0 z-40 bg-amber-500 text-amber-950 px-4 py-2"
        >
          <div className="mx-auto max-w-lg flex items-center justify-center gap-2 text-sm font-medium">
            <WifiOff className="h-4 w-4" />
            <span>Sin conexión - Los datos se sincronizarán cuando vuelvas online</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
