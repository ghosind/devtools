'use client';

import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import CopyButton from '@/components/CopyButton';
import DateTimeInput from '@/components/DateTimeInput';
import { useLang } from '@/components/LanguageProvider';
import { humanDatetimeToTimestamp, timestampToHumanDatetime } from '@/utils/time';

export default function TimestampTab() {
  const { t } = useLang();
  const [tsInput, setTsInput] = useState('');
  const [readableOutput, setReadableOutput] = useState('');
  const [readableLocalOutput, setReadableLocalOutput] = useState('');
  const [readableInput, setReadableInput] = useState<Date | null>(null);
  const [tsOutput, setTsOutput] = useState('');

  const handleTimestampToHumanDatetime = () => {
    try {
      const { utc, local } = timestampToHumanDatetime(tsInput);
      setReadableOutput(utc);
      setReadableLocalOutput(local);
    } catch (err) {
      const msg = String((err as any)?.message ?? err);
      const localized = t('Tools.Time.Timestamp.Errors.InvalidTimestamp', { msg });
      setReadableOutput(localized);
      setReadableLocalOutput(localized);
    }
  }

  const handleHumanDatetimeToTimestamp = () => {
    try {
      const timestamp = humanDatetimeToTimestamp(readableInput);
      setTsOutput(timestamp);
    } catch (err) {
      const localized = t('Tools.Time.Timestamp.Errors.InvalidDate');
      setTsOutput(localized);
    }
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ mt: 1 }}>
        <Typography variant='subtitle2'>
          {t('Tools.Time.Timestamp.TimestampToHuman')}
        </Typography>
        <TextField
          label={t('Tools.Time.Timestamp.TimestampInput')}
          value={tsInput}
          onChange={(e) => setTsInput(e.target.value)}
          fullWidth
          sx={{ my: 1 }}
        />
        <Button variant='contained' onClick={handleTimestampToHumanDatetime}>{t('Run')}</Button>
        <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
          <TextField
            label={t('Tools.Time.Timestamp.TimeOutputUTC')}
            value={readableOutput}
            fullWidth
            slotProps={{ input: { readOnly: true } }}
          />
          <CopyButton text={readableOutput} />
        </Box>

        <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
          <TextField
            label={t('Tools.Time.Timestamp.TimeOutputLocal')}
            value={readableLocalOutput}
            fullWidth
            slotProps={{ input: { readOnly: true } }}
          />
          <CopyButton text={readableLocalOutput} />
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant='subtitle2'>
          {t('Tools.Time.Timestamp.HumanToTimestamp')}
        </Typography>
        <DateTimeInput
          label={t('Tools.Time.Timestamp.ReadableInput')}
          value={readableInput}
          onChange={(v) => setReadableInput(v)}
          sx={{ my: 1 }}
        />
        <Button variant='contained' onClick={handleHumanDatetimeToTimestamp}> {t('Run')}</Button>
        <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
          <TextField
            label={t('Output')}
            value={tsOutput}
            fullWidth
            slotProps={{ input: { readOnly: true } }}
          />
          <CopyButton text={tsOutput} />
        </Box>
      </Box>
    </Box>
  )
}