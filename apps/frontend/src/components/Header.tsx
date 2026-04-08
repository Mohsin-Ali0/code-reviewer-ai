'use client';

import { AppBar, Toolbar, Box, IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7, GitHub } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

export function Header() {
  const { mode, toggleTheme } = useTheme();

  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          mode === 'light'
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 245, 245, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 14, 39, 0.98) 100%)',
        boxShadow:
          mode === 'light'
            ? '0 4px 20px rgba(25, 118, 210, 0.08)'
            : '0 4px 20px rgba(0, 188, 212, 0.06)',
        borderBottom:
          mode === 'light'
            ? '1px solid rgba(25, 118, 210, 0.1)'
            : '1px solid rgba(0, 188, 212, 0.1)',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
          }}
        >
          <motion.div
            whileHover={{
              scale: 1.1,
              rotateZ: 10,
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 40,
              height: 40,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #1976D2 0%, #00BCD4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              color: 'white',
              fontSize: '1.3rem',
              boxShadow: '0 4px 15px rgba(0, 188, 212, 0.3)',
            }}
          >
            ✔
          </motion.div>
          <Box>
            <Box
              sx={{
                fontSize: '1.4rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #1976D2 0%, #00BCD4 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px',
              }}
            >
              CodeReview AI
            </Box>
            <Box
              sx={{
                fontSize: '0.8rem',
                color: mode === 'dark' ? 'rgba(100, 200, 255, 0.7)' : 'rgba(25, 118, 210, 0.6)',
                fontWeight: 500,
                letterSpacing: '0.5px',
              }}
            >
              Smart Analyzer
            </Box>
          </Box>
        </motion.div>

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconButton
                onClick={toggleTheme}
                size="small"
              >
                {mode === 'light' ? (
                  <motion.div
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Brightness4 sx={{ color: '#FF9800' }} />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Brightness7 sx={{ color: '#FFD700' }} />
                  </motion.div>
                )}
              </IconButton>
            </motion.div>
          </Tooltip>

          <Tooltip title="View on GitHub">
            <motion.a
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/Mohsin-Ali0/code-reviewer-ai"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconButton
                size="small"
                component="span"
              >
                <GitHub sx={{ color: mode === 'dark' ? '#00BCD4' : '#1976D2' }} />
              </IconButton>
            </motion.a>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
