'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  mode: 'light' | 'dark';
}

export function AnimatedBackground({ mode }: AnimatedBackgroundProps) {
  const isDark = mode === 'dark';
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', e.clientX.toString());
      document.documentElement.style.setProperty('--mouse-y', e.clientY.toString());
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: 'hidden' }}>
      {/* Animated gradient background */}
      <motion.div
        key={`bg-${isDark}`}
        animate={{
          background: isDark
            ? 'linear-gradient(45deg, #0a0e27 0%, #1a1a3e 25%, #0f1f3f 50%, #0a0e27 75%, #1a1a3e 100%)'
            : 'linear-gradient(45deg, #f8fafb 0%, #e3f2fd 25%, #f3e5f5 50%, #f8fafb 75%, #e3f2fd 100%)',
          backgroundSize: ['200% 200%', '200% 200%'],
        }}
        transition={{ 
          background: { duration: 0.5, ease: 'easeInOut' as const },
          backgroundSize: { duration: 15, repeat: Infinity, ease: 'linear' as const },
        }}
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
        }}
      />

      {/* Floating orbs - Light mode */}
      <motion.div
        key={`orbs-light-${isDark}`}
        animate={{ opacity: isDark ? 0 : 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' as const }}
        style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        {!isDark && (
          <>
            <motion.div
              animate={{
                x: [0, 30, 0],
                y: [0, 50, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' as const }}
              style={{
                position: 'absolute',
                width: 300,
                height: 300,
                background: 'radial-gradient(circle, rgba(25, 118, 210, 0.15), transparent)',
                borderRadius: '50%',
                top: '-100px',
                right: '-100px',
                zIndex: 1,
              }}
            />
            <motion.div
              animate={{
                x: [0, -40, 0],
                y: [0, -60, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' as const }}
              style={{
                position: 'absolute',
                width: 250,
                height: 250,
                background: 'radial-gradient(circle, rgba(0, 188, 212, 0.15), transparent)',
                borderRadius: '50%',
                bottom: '-50px',
                left: '10%',
                zIndex: 1,
              }}
            />
          </>
        )}
      </motion.div>

      {/* Floating orbs - Dark mode */}
      <motion.div
        key={`orbs-dark-${isDark}`}
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' as const }}
        style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        {isDark && (
          <>
            <motion.div
              animate={{
                x: [0, 50, 0],
                y: [0, 80, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' as const }}
              style={{
                position: 'absolute',
                width: 400,
                height: 400,
                background: 'radial-gradient(circle, rgba(0, 188, 212, 0.2), transparent)',
                borderRadius: '50%',
                top: '-150px',
                right: '-150px',
                zIndex: 1,
              }}
            />
            <motion.div
              animate={{
                x: [0, -60, 0],
                y: [0, -100, 0],
                opacity: [0.15, 0.4, 0.15],
              }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' as const }}
              style={{
                position: 'absolute',
                width: 350,
                height: 350,
                background: 'radial-gradient(circle, rgba(25, 118, 210, 0.15), transparent)',
                borderRadius: '50%',
                bottom: '-100px',
                left: '-50px',
                zIndex: 1,
              }}
            />
            <motion.div
              animate={{
                x: [0, 40, 0],
                y: [0, -70, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' as const }}
              style={{
                position: 'absolute',
                width: 300,
                height: 300,
                background: 'radial-gradient(circle, rgba(255, 64, 129, 0.1), transparent)',
                borderRadius: '50%',
                bottom: '20%',
                right: '15%',
                zIndex: 1,
              }}
            />
          </>
        )}
      </motion.div>

      {/* Clean pulsating grid with integrated waterfall effect + animated mouse glow */}
      <div ref={gridRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', cursor: isDark ? 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI0IiBmaWxsPSJyZ2JhKDAsIDE4OCwgMjEyLCAxKSIvPjwvc3ZnPg==") 12 12, auto' : 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI0IiBmaWxsPSJyZ2JhKDI1LCAxMTgsIDIxMCwgMSkiLz48L3N2Zz4=") 12 12, auto' }}>

        {/* Single pulsating grid with waterfall effect using background position */}
        <motion.div
          animate={{
            opacity: [0.35, 0.65, 0.35],
            backgroundPosition: ['0px 0px', '0px 50px'],
          }}
          transition={{ 
            opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const },
            backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' as const }
          }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: isDark
              ? 'linear-gradient(rgba(100, 200, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 200, 255, 0.15) 1px, transparent 1px)'
              : 'linear-gradient(rgba(25, 118, 210, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(25, 118, 210, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            zIndex: 2,
          }}
        />

        {/* Primary mouse glow - Fixed positioning for accurate cursor tracking */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
          style={{
            position: 'fixed',
            width: 500,
            height: 500,
            left: `calc(var(--mouse-x, 0) * 1px - 250px)`,
            top: `calc(var(--mouse-y, 0) * 1px - 250px)`,
            background: isDark
              ? 'radial-gradient(circle, rgba(0, 188, 212, 0.35) 0%, rgba(0, 188, 212, 0.15) 30%, transparent 70%)'
              : 'radial-gradient(circle, rgba(25, 118, 210, 0.25) 0%, rgba(25, 118, 210, 0.1) 30%, transparent 70%)',
            zIndex: 3,
            pointerEvents: 'none',
            filter: isDark ? 'blur(1px)' : 'blur(0.5px)',
            willChange: 'left, top',
          }}
        />

        {/* Secondary mouse glow - Outer pulsing ring */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.08, 0.2, 0.08],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.2 }}
          style={{
            position: 'fixed',
            width: 700,
            height: 700,
            left: `calc(var(--mouse-x, 0) * 1px - 350px)`,
            top: `calc(var(--mouse-y, 0) * 1px - 350px)`,
            background: isDark
              ? 'radial-gradient(circle, rgba(0, 188, 212, 0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(25, 118, 210, 0.1) 0%, transparent 70%)',
            zIndex: 2,
            pointerEvents: 'none',
            filter: isDark ? 'blur(2px)' : 'blur(1.5px)',
            willChange: 'left, top',
          }}
        />
      </div>
    </Box>
  );
}
