"use client";

import React from 'react';
import { Box, List, ListItemButton, ListItemText, Typography, Paper } from '@mui/material';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';
import { tools } from '@/constants/tools';

export default function Home() {
  const { t } = useLang();

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
      <Paper>
        <List>
          {tools.map((tool) => (
            <ListItemButton key={tool.key} component={Link} href={tool.href}>
              <ListItemText primary={t(tool.title)} secondary={t(tool.description)} />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
