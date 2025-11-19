"use client";

import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import LanguageProvider from './LanguageProvider';

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
        {children}
      </ThemeProvider>
    </LanguageProvider>
  );
}
