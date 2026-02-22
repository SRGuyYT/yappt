"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black"
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)"
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative flex flex-col items-center">
            {/* Ambient Background Glow */}
            <motion.div
              className="absolute h-64 w-64 rounded-full bg-red-600/20 blur-[100px]"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0, filter: "brightness(0)" }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                filter: "brightness(1.2)"
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <img 
                src="/YT.png" 
                alt="Logo" 
                className="h-24 w-auto object-contain drop-shadow-[0_0_30px_rgba(255,0,0,0.5)]"
              />
              
              {/* Scanline Effect */}
              <motion.div
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            <div className="mt-12 overflow-hidden h-1 w-48 rounded-full bg-white/5 border border-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 to-rose-400 shadow-[0_0_15px_rgba(255,0,0,0.8)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
              />
            </div>
            
            <motion.p
              className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-red-500/60"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Initializing StreamFlow
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
