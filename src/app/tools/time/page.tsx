"use client";

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Tabs,
  Tab
} from '@mui/material';
import { useLang } from '@/components/LanguageProvider';
import CopyButton from '@/components/CopyButton';
import TimestampTab from './timestamp';

export default function TimePage() {
  const { t } = useLang();

  const [tab, setTab] = useState(0);
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setTab(newValue);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>{t('Tools.Time.Name')}</Typography>

      <Tabs value={tab} onChange={handleTabChange} aria-label="Time tool tabs" sx={{ mb: 2 }}>
        <Tab label={t('Tools.Time.Tabs.Timestamp')} />
      </Tabs>

      {tab === 0 && (
        <TimestampTab />
      )}
    </Box>
  );
}
