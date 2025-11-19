"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import LanguageProvider from './LanguageProvider';
import GoogleAnalytics from './GoogleAnalytics';

type Mode = 'light' | 'dark';

type ThemeContextType = {
  mode: Mode;
  setMode: (m: Mode) => void;
  toggleMode: () => void;
};

const ThemeModeContext = createContext<ThemeContextType>({
  mode: 'light',
  setMode: () => {},
  toggleMode: () => {}
});

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>('light');

  // initialize from localStorage or system preference
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored === 'light' || stored === 'dark') {
      setMode(stored as Mode);
      return;
    }

    const mql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    if (mql && mql.matches) setMode('dark');

    const listener = (e: MediaQueryListEvent) => {
      // only change when user hasn't set explicit preference
      const explicit = localStorage.getItem('theme');
      if (explicit !== 'light' && explicit !== 'dark') {
        setMode(e.matches ? 'dark' : 'light');
      }
    };

    try {
      mql && mql.addEventListener && mql.addEventListener('change', listener);
    } catch (e) {
      // Safari fallback
      mql && mql.addListener && mql.addListener(listener as any);
    }

    return () => {
      try {
        mql && mql.removeEventListener && mql.removeEventListener('change', listener);
      } catch (e) {
        mql && mql.removeListener && mql.removeListener(listener as any);
      }
    };
  }, []);

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('theme', next);
      } catch (e) {}
      return next;
    });
  };

  const value = useMemo(() => ({ mode, setMode, toggleMode }), [mode]);

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <LanguageProvider>
      <ThemeModeContext.Provider value={value}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GoogleAnalytics />
          {children}
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </LanguageProvider>
  );
}
