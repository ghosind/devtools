'use client';

import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { useLang } from '@/components/LanguageProvider';
import DaysBetweenTab from './days';
import TimestampTab from './timestamp';
import CalculateTab from './calculate';
import TimezoneTab from './timezone';

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
        <Tab label={t('Tools.Time.Tabs.Calculate')} />
        <Tab label={t('Tools.Time.Tabs.Timezone')} />
      </Tabs>

      {tab === 0 && <TimestampTab />}
      {tab === 1 && <DaysBetweenTab />}
      {tab === 2 && <CalculateTab />}
      {tab === 3 && <TimezoneTab />}
    </Box>
  );
}
