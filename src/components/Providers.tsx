"use client";

import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import LanguageProvider from './LanguageProvider';
import GoogleAnalytics from './GoogleAnalytics';

const theme = createTheme({
  palette: {
    mode: 'light'
  }
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GoogleAnalytics />
        {children}
      </ThemeProvider>
    </LanguageProvider>
  );
}
