'use client';

import { useState, useEffect, createContext, useContext, PropsWithChildren, FC, createElement } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const initialValue: ThemeContextType = {
  mode: 'light',
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(initialValue);

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    const storedMode = localStorage.getItem('theme-mode') as ThemeMode | null;
    if (storedMode) {
      setMode(storedMode);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', newMode);
      return newMode;
    });
  };

  const value = { mode, toggleTheme };

  return createElement(ThemeContext.Provider, { value }, children);
};

export function useTheme(): ThemeContextType {
  return useContext(ThemeContext);
}
