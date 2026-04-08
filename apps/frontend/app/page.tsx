'use client';

import { useState, useCallback } from 'react';
import { Box, Container, useMediaQuery, useTheme as useMuiTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { Header } from '@/components/Header';
import { CodeEditor } from '@/components/CodeEditor';
import { ReviewResults } from '@/components/ReviewResults';
import { LoadingState, EmptyState, ErrorState } from '@/components/StateComponents';
import { reviewAPI, type ReviewResult, type ReviewCodeRequest } from '@/lib/api';
import { AnimatedBackground } from '@/components/AnimatedBackground';

export default function Home() {
  const { mode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('typescript');
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (code.length < 10) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const request: ReviewCodeRequest = {
      code,
      language,
    };

    const response = await reviewAPI.reviewCode(request);

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      setError(response.message || response.error || 'Failed to analyze code');
    }

    setLoading(false);
  }, [code, language]);

  const handleExport = useCallback(
    async (format: 'json' | 'pdf') => {
      if (!result) return;

      setExporting(true);

      try {
        if (format === 'json') {
          const dataStr = JSON.stringify(result, null, 2);
          const dataBlob = new Blob([dataStr], { type: 'application/json' });
          const url = URL.createObjectURL(dataBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `code-review-${new Date().toISOString().split('T')[0]}.json`;
          link.click();
          URL.revokeObjectURL(url);
        } else if (format === 'pdf') {
          alert('PDF export coming soon! You can export as JSON for now.');
        }
      } catch (err) {
        console.error('Export failed:', err);
      }

      setExporting(false);
    },
    [result],
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: mode === 'dark' ? '#0a0e27' : '#f8fafb',
        transition: 'background-color 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AnimatedBackground mode={mode} />
      <Header />
      <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 4 }, position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
            mt: 2,
          }}
        >
          {/* Left Column: Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <CodeEditor
              code={code}
              language={language}
              onCodeChange={setCode}
              onLanguageChange={setLanguage}
              onSubmit={handleSubmit}
              isLoading={loading}
            />
          </motion.div>

          {/* Right Column: Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {loading && <LoadingState />}
            {error && <ErrorState message={error} />}
            {!loading && !error && !result && <EmptyState />}
            {result && !loading && (
              <ReviewResults result={result} onExport={handleExport} isExporting={exporting} />
            )}
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
