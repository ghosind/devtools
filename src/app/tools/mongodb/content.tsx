"use client";

import { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { useLang } from '@/components/LanguageProvider';
import ObjectGenerateTab from './generate';
import ObjectIDExtractTab from './extract';

export default function MongoDBObjectIdContent() {
  const { t } = useLang();
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>{t('Tools.MongoDBObjectID.Name')}</Typography>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label={t('Tools.MongoDBObjectID.Tabs.Extract')} />
        <Tab label={t('Tools.MongoDBObjectID.Tabs.Generate')} />
      </Tabs>

      {tab === 0 && (
        <ObjectIDExtractTab />
      )}

      {tab === 1 && (
        <ObjectGenerateTab />
      )}
    </Box>
  );
}
