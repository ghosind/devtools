"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";
import { useLang } from "@/components/LanguageProvider";
import { Box, Button, TextField, Typography } from "@mui/material";
import DateTimeInput from '@/components/DateTimeInput';
import { formatDate } from "@/utils/time";

export default function TimestampTab() {
  const { t } = useLang();
  const [tsInput, setTsInput] = useState('');
  const [readableOutput, setReadableOutput] = useState('');
  const [readableLocalOutput, setReadableLocalOutput] = useState('');
  const [readableInput, setReadableInput] = useState<Date | null>(null);
  const [tsOutput, setTsOutput] = useState('');

  const timestampToReadable = (ts: string) => {
    try {
      const n = Number(ts);
      if (Number.isNaN(n)) throw new Error('Invalid timestamp');
      const date = new Date(n >= 1e12 ? n : n * 1000);
      return { utc: formatDate(date, true), local: formatDate(date, false) };
    } catch (e) {
      const msg = String(e);
      return { utc: msg, local: msg };
    }
  };

  const readableToTimestamp = (d: Date | null) => {
    try {
      if (!d) throw new Error('Invalid date');
      // Interpret the selected date as UTC (take its components and build a UTC timestamp)
      const ms = Date.UTC(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds(),
        d.getMilliseconds()
      );
      return String(Math.floor(ms / 1000));
    } catch (e) {
      return String(e);
    }
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ mt: 1 }}>
        <Typography variant="subtitle2">
          {t('Tools.Time.Timestamp.TimestampToHuman')}
        </Typography>
        <TextField
          label={t('Tools.Time.Timestamp.TimestampInput')}
          value={tsInput}
          onChange={(e) => setTsInput(e.target.value)}
          fullWidth
          sx={{ my: 1 }}
        />
        <Button
          variant="contained"
          onClick={() => {
            const res = timestampToReadable(tsInput);
            setReadableOutput(res.utc);
            setReadableLocalOutput(res.local);
          }}
        >
          {t('Run')}
        </Button>
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
        <Typography variant="subtitle2">
          {t('Tools.Time.Timestamp.HumanToTimestamp')}
        </Typography>
        <DateTimeInput
          label={t('Tools.Time.Timestamp.ReadableInput')}
          value={readableInput}
          onChange={(v) => setReadableInput(v)}
          sx={{ my: 1 }}
        />
        <Button
          variant="contained"
          onClick={() => { setTsOutput(readableToTimestamp(readableInput)) }}
        >
          {t('Run')}
        </Button>
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