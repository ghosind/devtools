'use client';

import { useMemo, useState } from 'react';
import { Box, Autocomplete, Button, TextField, Typography } from '@mui/material';
import DateTimeInput from '@/components/DateTimeInput';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/components/LanguageProvider';
import { findEpochForZonedWallClock, formatEpochInTimeZone } from '@/utils/time';

const FALLBACK_TIMEZONES = [
  'UTC',
  'Asia/Shanghai',
  'Asia/Tokyo',
  'Europe/London',
  'America/New_York',
  'America/Los_Angeles',
];

export default function TimezoneTab() {
  const { t } = useLang();
  const [input, setInput] = useState<Date | null>(new Date());
  const [sourceTz, setSourceTz] = useState<string>('Local');
  const [targetTz, setTargetTz] = useState<string>('UTC');
  const [output, setOutput] = useState('');

  const timezones = useMemo(() => {
    try {
      const sup = Intl.supportedValuesOf?.('timeZone');
      if (Array.isArray(sup) && sup.length > 0) return ['Local', ...sup];
    } catch (e) {
      console.error('Failed to get supported timezones:', e);
    }
    return ['Local', ...FALLBACK_TIMEZONES];
  }, []);

  const handleConvert = () => {
    setOutput('');
    if (!input) return;

    try {
      let epochMs: number;

      if (sourceTz === 'Local') {
        epochMs = input.getTime();
      } else {
        const y = input.getFullYear();
        const m = input.getMonth() + 1;
        const d = input.getDate();
        const hh = input.getHours();
        const mm = input.getMinutes();
        const ss = input.getSeconds();

        epochMs = findEpochForZonedWallClock(y, m, d, hh, mm, ss, sourceTz);
      }

      const formatted = formatEpochInTimeZone(epochMs, targetTz);
      setOutput(formatted);
    } catch (e) {
      setOutput(String((e as any)?.message ?? e));
    }
  };

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Typography variant='h6'>{t('Tools.Time.Timezone.Title')}</Typography>

      <DateTimeInput label={t('Tools.Time.Timezone.Input')} value={input} onChange={setInput} />

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Box sx={{ minWidth: 240 }}>
          <Typography variant='caption'>{t('Tools.Time.Timezone.Source')}</Typography>
          <Autocomplete
            options={timezones}
            value={sourceTz}
            onChange={(_, v) => v && setSourceTz(v)}
            renderInput={(params) => <TextField {...params} size='small' />}
            freeSolo={false}
            fullWidth
          />
        </Box>

        <Box sx={{ minWidth: 240 }}>
          <Typography variant='caption'>{t('Tools.Time.Timezone.Target')}</Typography>
          <Autocomplete
            options={timezones.filter((z) => z !== 'Local')}
            value={targetTz}
            onChange={(_, v) => v && setTargetTz(v)}
            renderInput={(params) => <TextField {...params} size='small' />}
            freeSolo={false}
            fullWidth
          />
        </Box>

        <Box>
          <Button variant='contained' onClick={handleConvert}>{t('Run')}</Button>
        </Box>
      </Box>

      {output && (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField
            label={t('Tools.Time.Timezone.Output')}
            value={output}
            fullWidth
            slotProps={{ input: { readOnly: true } }}
          />
          <CopyButton text={output} />
        </Box>
      )}
    </Box>
  );
}
