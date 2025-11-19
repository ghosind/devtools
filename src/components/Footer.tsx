"use client";

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLang } from './LanguageProvider';
import { Link } from '@mui/material';

export const FOOTER_HEIGHT = 56;

export default function Footer() {
  const { t } = useLang();
  const raw = t('Footer');
  const text = raw.replace('{year}', String(new Date().getFullYear()));

  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        height: FOOTER_HEIGHT,
        py: 1,
        textAlign: 'center',
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        zIndex: (theme) => theme.zIndex.appBar - 1,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
}
