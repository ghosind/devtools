'use client';

import { IconButton, Tooltip } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useLang } from './LanguageProvider';
import { useThemeMode } from './Providers';

export default function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();
  const { t } = useLang();

  return (
    <Tooltip title={mode === 'dark' ? t('Theme.SwitchToLight') : t('Theme.SwitchToDark')}>
      <IconButton color='inherit' onClick={toggleMode} aria-label='Toggle theme'>
        {mode === 'dark' ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Tooltip>
  );
}
