'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import {
  Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel, Button,
} from '@mui/material';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/components/LanguageProvider';
import { TOTP, Algorithm } from '@antmind/otp';

export default function TotpContent() {
  const { t } = useLang();
  const totp = useMemo(() => new TOTP(), []);

  const [secret, setSecret] = useState('');
  const [algo, setAlgo] = useState<Algorithm>('SHA1');
  const [digits, setDigits] = useState<number>(6);
  const [period, setPeriod] = useState<number>(30);
  const [code, setCode] = useState<string>('');
  const [remaining, setRemaining] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  const compute = async () => {
    try {
      totp.algorithm = algo;
      totp.digits = digits;
      totp.period = period;
      const otp = await totp.generate(secret);
      setCode(otp);

      const now = Math.floor(Date.now() / 1000);
      setRemaining(period - (now % period));
    } catch (e) {
      setCode('');
    }
  }

  useEffect(() => {
    compute();
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }
    timerRef.current = window.setInterval(() => {
      compute();
    }, 500);
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    }
  }, [secret, algo, digits, period]);

  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 2 }}>{t('Tools.TOTP.Name')}</Typography>

      <Box sx={{ display: 'grid', gap: 2 }}>
        <TextField
          label={t('Tools.TOTP.Secret')}
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          helperText={t('Tools.TOTP.SecretHelper')}
        />

        <FormControl>
          <InputLabel id='algo-label'>{t('Tools.TOTP.Algorithm')}</InputLabel>
          <Select
            labelId='algo-label'
            value={algo}
            label={t('Tools.TOTP.Algorithm')}
            onChange={(e) => setAlgo(e.target.value as Algorithm)}
            size='small'
          >
            <MenuItem value='SHA1'>SHA1</MenuItem>
            <MenuItem value='SHA256'>SHA256</MenuItem>
            <MenuItem value='SHA512'>SHA512</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id='digits-label'>{t('Tools.TOTP.Digits')}</InputLabel>
          <Select
            labelId='digits-label'
            value={digits}
            label={t('Tools.TOTP.Digits')}
            onChange={(e) => setDigits(Number(e.target.value))}
            size='small'
          >
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label={t('Tools.TOTP.Period')}
          type='number'
          value={period}
          onChange={(e) => setPeriod(Number(e.target.value) || 30)}
          helperText={t('Tools.TOTP.PeriodHelper')}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant='h3' sx={{ letterSpacing: 4 }}>{code || '—'}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>{t('Tools.TOTP.Remaining')}: {remaining}s</Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <CopyButton text={code} />
              <Button
                variant='outlined'
                onClick={() => compute()}
              >
                {t('Tools.TOTP.Refresh')}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
