'use client';

import { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { useLang } from '@/components/LanguageProvider';
import ObjectIDExtractTab from './extract';
import ObjectIDGenerateTab from './generate';

export default function MongoDBContent() {
  const { t } = useLang();
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 2 }}>{t('Tools.MongoDB.Name')}</Typography>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label={t('Tools.MongoDB.Tabs.Extract')} />
        <Tab label={t('Tools.MongoDB.Tabs.Generate')} />
      </Tabs>

      {tab === 0 && (<ObjectIDExtractTab />)}
      {tab === 1 && (<ObjectIDGenerateTab />)}
    </Box>
  );
}
