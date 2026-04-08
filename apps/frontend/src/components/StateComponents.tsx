'use client';

import { Box, CircularProgress, Typography, Skeleton, Stack, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

export function LoadingState() {
  const { mode } = useTheme();

  const pulseVariants = {
    initial: { scale: 0.95, opacity: 0.8 },
    animate: {
      scale: [0.95, 1.05, 0.95],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <MotionPaper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      elevation={0}
      sx={{
        width: '100%',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        borderRadius: 2,
        minHeight: '400px',
        background:
          mode === 'dark'
            ? 'linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(0, 188, 212, 0.05) 0%, rgba(25, 118, 210, 0.02) 100%)',
        border: '2px solid',
        borderColor: mode === 'dark' ? 'rgba(0, 188, 212, 0.2)' : 'rgba(25, 118, 210, 0.1)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <MotionBox
        animate={{ rotate: 360 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
      >
        <CircularProgress
          size={70}
          sx={{
            color: '#00BCD4',
          }}
        />
      </MotionBox>

      <MotionBox
        variants={pulseVariants}
        initial="initial"
        animate="animate"
        sx={{ textAlign: 'center' }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '1.4rem', mb: 1 }}>
          ⏳ Analyzing your code...
        </Typography>
        <Typography sx={{ fontSize: '1rem', color: 'text.secondary' }}>
          This usually takes 5-10 seconds. Please wait!
        </Typography>
      </MotionBox>

      {/* Animated dots */}
      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [-8, 0, -8] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1,
            }}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#00BCD4',
            }}
          />
        ))}
      </Stack>
    </MotionPaper>
  );
}

export function EmptyState() {
  const { mode } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <MotionPaper
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      elevation={0}
      sx={{
        width: '100%',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        borderRadius: 2,
        minHeight: '400px',
        textAlign: 'center',
        background:
          mode === 'dark'
            ? 'linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(0, 188, 212, 0.05) 0%, rgba(25, 118, 210, 0.02) 100%)',
        border: '2px solid',
        borderColor: mode === 'dark' ? 'rgba(0, 188, 212, 0.2)' : 'rgba(25, 118, 210, 0.1)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <motion.div variants={itemVariants} style={{ fontSize: '3.5rem' }}>
        🚀
      </motion.div>
      <motion.div variants={itemVariants}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, fontSize: '1.8rem', color: '#00BCD4' }}>
          Ready to Review Code
        </Typography>
      </motion.div>
      <motion.div variants={itemVariants} style={{ width: '100%' }}>
        <Typography
          sx={{
            maxWidth: '450px',
            lineHeight: 1.7,
            fontSize: '1.05rem',
            color: 'text.secondary',
            mx: 'auto',
          }}
        >
          Paste your code or upload a file in the editor. We&apos;ll analyze it for security, performance,
          maintainability, and provide actionable improvements.
        </Typography>
      </motion.div>

      {/* Animated background elements */}
      <Box sx={{ position: 'absolute', top: 20, right: 30, opacity: 0.1 }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Box sx={{ fontSize: '5rem' }}>⚙️</Box>
        </motion.div>
      </Box>
    </MotionPaper>
  );
}

export function ErrorState({ message }: { message: string }) {
  const { mode } = useTheme();

  return (
    <MotionPaper
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
      elevation={0}
      sx={{
        width: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        border: '2px solid #F44336',
      }}
    >
      <Box
        sx={{
          p: 3,
          bgcolor: mode === 'dark' ? 'rgba(244, 67, 54, 0.15)' : 'rgba(244, 67, 54, 0.08)',
          borderLeft: '5px solid #F44336',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          background:
            mode === 'dark'
              ? 'linear-gradient(135deg, rgba(244, 67, 54, 0.15) 0%, rgba(244, 67, 54, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(244, 67, 54, 0.08) 0%, rgba(244, 67, 54, 0.02) 100%)',
        }}
      >
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Typography variant="h5" sx={{ color: '#F44336', fontWeight: 700, fontSize: '1.3rem' }}>
            ⚠️ Analysis Failed
          </Typography>
        </motion.div>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Typography
            sx={{
              color: mode === 'dark' ? '#FF8787' : '#D32F2F',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontSize: '1rem',
              fontFamily: 'Fira Code, monospace',
              backgroundColor: mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.5)',
              p: 1.5,
              borderRadius: 1,
            }}
          >
            {message}
          </Typography>
        </motion.div>
      </Box>
    </MotionPaper>
  );
}

export function ResultsSkeleton() {
  const skeletonVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  return (
    <MotionPaper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      elevation={0}
      sx={{ width: '100%', borderRadius: 2, overflow: 'hidden' }}
    >
      <Stack spacing={2} sx={{ p: 3 }}>
        {[0, 1, 2, 3].map((i) => (
          <motion.div key={i} custom={i} variants={skeletonVariants} initial="hidden" animate="visible">
            <Skeleton variant="rectangular" height={i === 0 ? 60 : 100} />
          </motion.div>
        ))}
      </Stack>
    </MotionPaper>
  );
}
