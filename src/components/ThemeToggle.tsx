"use client";

import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useThemeMode } from './Providers';

export default function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton color="inherit" onClick={toggleMode} aria-label="Toggle theme">
        {mode === 'dark' ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Tooltip>
  );
}
