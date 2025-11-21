'use client';

import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import GoogleAnalytics from './GoogleAnalytics';
import LanguageProvider from './LanguageProvider';

type ThemeMode = 'light' | 'dark';

type ThemeContextType = {
  mode: ThemeMode;
  toggleMode: () => void;
};

const ThemeModeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleMode: () => {},
});

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export default function Providers({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let initial: ThemeMode = 'light';
    try {
      const stored = localStorage.getItem('theme') as ThemeMode | null;
      if (stored === 'light' || stored === 'dark') {
        initial = stored;
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        initial = 'dark';
      }
    } catch {}
    setMode(initial);
    setMounted(true);
  }, []);

  const toggleMode = () => {
    const next = mode === 'dark' ? 'light' : 'dark';
    setMode(next);
    try {
      localStorage.setItem('theme', next);
    } catch {}
  };

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);
  const value = useMemo(() => ({ mode, toggleMode }), [mode]);

  if (!mounted) {
    return null;
  }

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
