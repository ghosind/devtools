'use client';

import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import DateTimeInput from '@/components/DateTimeInput';
import { useLang } from '@/components/LanguageProvider';

export default function DaysBetweenTab() {
  const { t } = useLang();
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [result, setResult] = useState<number | null>(null);

  const handleRun = () => {
    setResult(null);
    if (!start || !end) {
      return;
    }
    const s = start;
    const e = end;
    const diffMs = Math.abs(e.getTime() - s.getTime());
    const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));
    setResult(days);
  }

  const handleReset = () => {
    setStart(null);
    setEnd(null);
    setResult(null);
  }

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Typography variant='h6'>{t('Tools.Time.DaysBetween.Title')}</Typography>

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
        mode='date'
      />

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant='contained' onClick={handleRun}>{t('Run')}</Button>
        <Button variant='outlined' onClick={handleReset}>{t('Reset')}</Button>
      </Box>

      {result !== null && (
        <Box>
          <Typography variant='body1'>
            {t('Tools.Time.DaysBetween.Result')}: {result} {t('Tools.Time.DaysBetween.Days')}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
