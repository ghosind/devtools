"use client";

import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useThemeMode } from './Providers';
import { useLang } from './LanguageProvider';

export default function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();
  const { t } = useLang();

  return (
    <Tooltip title={mode === 'dark' ? t('Theme.SwitchToLight') : t('Theme.SwitchToDark')}>
      <IconButton color="inherit" onClick={toggleMode} aria-label="Toggle theme">
        {mode === 'dark' ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Tooltip>
  );
}
