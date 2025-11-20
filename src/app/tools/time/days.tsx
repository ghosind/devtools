"use client";

import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import DateTimeInput from '@/components/DateTimeInput';
import { useLang } from '@/components/LanguageProvider';

export default function DaysBetweenTab() {
  const { t } = useLang();
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [result, setResult] = useState<number | null>(null);

  function compute() {
    setResult(null);
    try {
      if (!start || !end) return setResult(null);
      const s = start;
      const e = end;
      const diffMs = Math.abs(e.getTime() - s.getTime());
      const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));
      setResult(days);
    } catch (e) {
      setResult(null);
    }
  }

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Typography variant="h6">{t('Tools.Time.DaysBetween.Title')}</Typography>

      <DateTimeInput
        label={t('Tools.Time.DaysBetween.Start')}
        value={start}
        onChange={setStart}
        mode='date'
      />

      <DateTimeInput
        label={t('Tools.Time.DaysBetween.End')}
        value={end}
        onChange={setEnd}
        mode="date"
      />

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="contained" onClick={compute}>
          {t('Run')}
        </Button>
        <Button
          variant="outlined"
          onClick={() => { setStart(null); setEnd(null); setResult(null); }}
        >
          {t('Tools.Time.DaysBetween.Clear')}
        </Button>
      </Box>

      {result !== null && (
        <Box>
          <Typography variant="body1">
            {t('Tools.Time.DaysBetween.Result')}: {result} {t('Tools.Time.DaysBetween.Days')}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
