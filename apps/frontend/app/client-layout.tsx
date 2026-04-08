'use client';

import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '@/lib/theme';
import { ThemeProvider, useTheme } from '@/hooks/useTheme';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AppContent>{children}</AppContent>
    </ThemeProvider>
  );
}

function AppContent({ children }: { children: React.ReactNode }) {
  const { mode } = useTheme();
  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
          backgroundImage:
            mode === 'dark'
              ? 'radial-gradient(circle at 20% 80%, rgba(25, 118, 210, 0.1) 0%, transparent 50%)'
              : 'radial-gradient(circle at 20% 80%, rgba(25, 118, 210, 0.05) 0%, transparent 50%)',
        }}
      >
        <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </Box>
      </Box>
    </MuiThemeProvider>
  );
}
