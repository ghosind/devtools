'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Divider, TextField } from '@mui/material';
import { useLang } from '@/components/LanguageProvider';
import { parseUserAgent, UAResult } from '@/utils/browser';

export default function UserAgentContent() {
  const { t } = useLang();
  const [ua, setUa] = useState('');
  const [info, setInfo] = useState<UAResult | null>(null);
  const [currentUA, setCurrentUA] = useState('');

  useEffect(() => {
    if (typeof navigator !== 'undefined' && currentUA !== navigator.userAgent) {
      setCurrentUA(navigator.userAgent);
    }
    if (!ua) {
      setInfo(parseUserAgent(navigator.userAgent));
    }
  }, [currentUA]);

  const handleChange = (value: string) => {
    setUa(value);
    try {
      setInfo(parseUserAgent(value));
    } catch (e) {
      setInfo(null);
    }
  }

  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 2 }}>{t('Tools.UserAgent.Name')}</Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        <TextField
          fullWidth
          value={ua}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={currentUA}
        />
      </Box>

      {info && (
        <Paper variant='outlined' sx={{ p: 2 }}>
          <Typography variant='h6'>{t('Tools.UserAgent.Browser')}</Typography>
          <Typography>
            {t(info.browser.name)}{info.browser.version ? ` — ${info.browser.version}` : ''}
          </Typography>
          <Divider sx={{ my: 1 }} />

          <Typography variant='h6'>{t('Tools.UserAgent.OS')}</Typography>
          <Typography>
            {t(info.os.name)}{info.os.version ? ` — ${info.os.version}` : ''}
          </Typography>
          <Divider sx={{ my: 1 }} />

          <Typography variant='h6'>{t('Tools.UserAgent.Device')}</Typography>
          <Typography>
            {t(info.device.type)}{info.device.model ? ` — ${info.device.model}` : ''}
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
