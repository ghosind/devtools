'use client';

import { useState } from 'react';
import { Box, Button, TextField, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import DateTimeInput from '@/components/DateTimeInput';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/components/LanguageProvider';
import { timestampToHumanDatetime } from '@/utils/time';

type Mode = 'add' | 'subtract';

const applyDelta = (
  base: Date,
  delta: { years: number; months: number; days: number; hours: number; minutes: number; seconds: number; },
  mode: Mode,
) => {
  const sign = mode === 'add' ? 1 : -1;
  const d = new Date(Date.UTC(
    base.getFullYear(),
    base.getMonth(),
    base.getDate(),
    base.getHours(),
    base.getMinutes(),
    base.getSeconds(),
    base.getMilliseconds(),
  ));

  if (delta.years) {
    d.setUTCFullYear(d.getUTCFullYear() + sign * delta.years);
  }
  if (delta.months) {
    // setUTCMonth handles overflow
    d.setUTCMonth(d.getUTCMonth() + sign * delta.months);
  }
  if (delta.days) {
    d.setUTCDate(d.getUTCDate() + sign * delta.days);
  }
  if (delta.hours) {
    d.setUTCHours(d.getUTCHours() + sign * delta.hours);
  }
  if (delta.minutes) {
    d.setUTCMinutes(d.getUTCMinutes() + sign * delta.minutes);
  }
  if (delta.seconds) {
    d.setUTCSeconds(d.getUTCSeconds() + sign * delta.seconds);
  }

  return d;
}

const parseNumber = (v: string) => {
  const n = Number(v);
  return Number.isNaN(n) ? 0 : Math.trunc(n);
}

export default function CalculateTab() {
  const { t } = useLang();
  const [base, setBase] = useState<Date | null>(null);
  const [op, setOp] = useState<Mode>('add');
  const [years, setYears] = useState('0');
  const [months, setMonths] = useState('0');
  const [days, setDays] = useState('0');
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [seconds, setSeconds] = useState('0');
  const [resultUtc, setResultUtc] = useState('');
  const [resultLocal, setResultLocal] = useState('');

  const handleRun = () => {
    setResultUtc('');
    setResultLocal('');
    if (!base) {
      return;
    }

    const delta = {
      years: parseNumber(years),
      months: parseNumber(months),
      days: parseNumber(days),
      hours: parseNumber(hours),
      minutes: parseNumber(minutes),
      seconds: parseNumber(seconds),
    };

    try {
      const res = applyDelta(base, delta, op);
      const output = timestampToHumanDatetime(res.getTime() / 1000);

      setResultUtc(output.utc);
      setResultLocal(output.local);
    } catch (e) {
      const msg = String((e as any)?.message ?? e);
      setResultUtc(t('Tools.Time.Calculate.Errors.InvalidInput', { msg }));
      setResultLocal(t('Tools.Time.Calculate.Errors.InvalidInput', { msg }));
    }
  }

  const handleReset = () => {
    setBase(null);
    setOp('add');
    setYears('0');
    setMonths('0');
    setDays('0');
    setHours('0');
    setMinutes('0');
    setSeconds('0');
    setResultUtc('');
    setResultLocal('');
  }

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Typography variant='h6'>{t('Tools.Time.Calculate.Title')}</Typography>

      <DateTimeInput
        label={t('Tools.Time.Calculate.Input')}
        value={base}
        onChange={setBase}
      />

      <ToggleButtonGroup
        value={op}
        exclusive
        onChange={(_, v) => v && setOp(v)}
        size='small'
      >
        <ToggleButton value='add'>{t('Tools.Time.Calculate.Add')}</ToggleButton>
        <ToggleButton value='subtract'>{t('Tools.Time.Calculate.Subtract')}</ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
        <TextField label={t('Years')} value={years} onChange={(e) => setYears(e.target.value)} />
        <TextField label={t('Months')} value={months} onChange={(e) => setMonths(e.target.value)} />
        <TextField label={t('Days')} value={days} onChange={(e) => setDays(e.target.value)} />
        <TextField label={t('Hours')} value={hours} onChange={(e) => setHours(e.target.value)} />
        <TextField label={t('Minutes')} value={minutes} onChange={(e) => setMinutes(e.target.value)} />
        <TextField label={t('Seconds')} value={seconds} onChange={(e) => setSeconds(e.target.value)} />
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant='contained' onClick={handleRun}>{t('Run')}</Button>
        <Button variant='outlined' onClick={handleReset}>{t('Reset')}</Button>
      </Box>

      {resultUtc && (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField
            label={t('Tools.Time.Calculate.OutputUTC')}
            value={resultUtc}
            fullWidth
            slotProps={{ input: { readOnly: true } }}
          />
          <CopyButton text={resultUtc} />
        </Box>
      )}

      {resultLocal && (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField
            label={t('Tools.Time.Calculate.OutputLocal')}
            value={resultLocal}
            fullWidth
            slotProps={{ input: { readOnly: true } }}
          />
          <CopyButton text={resultLocal} />
        </Box>
      )}
    </Box>
  );
}
