'use client';

import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { useLang } from '@/components/LanguageProvider';
import DaysBetweenTab from './days';
import TimestampTab from './timestamp';

export default function TimeContent() {
  const { t } = useLang();
  const [tab, setTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  }

  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 2 }}>{t('Tools.Time.Name')}</Typography>

      <Tabs
        value={tab}
        onChange={handleTabChange}
        aria-label='Time tool tabs'
        sx={{ mb: 2 }}
      >
        <Tab label={t('Tools.Time.Tabs.Timestamp')} />
        <Tab label={t('Tools.Time.Tabs.DaysBetween')} />
      </Tabs>

      {tab === 0 && <TimestampTab />}
      {tab === 1 && <DaysBetweenTab />}
    </Box>
  );
}
