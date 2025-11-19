"use client";

import React, { useState } from 'react';
import { Box, TextField, Typography, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useLang } from '@/components/LanguageProvider';
import { encodeBase64, decodeBase64 } from '@/utils/base64';
import CopyButton from '@/components/CopyButton';

export default function Base64Page() {
  const { t } = useLang();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  function run() {
    try {
      if (mode === 'encode') setOutput(encodeBase64(input));
      else setOutput(decodeBase64(input));
    } catch (e) {
      setOutput(String(e));
    }
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {t('Tools.Base64.Name')}
      </Typography>
      <Box>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, v) => v && setMode(v)}
          size="small"
          sx={{ marginBottom: 2 }}
        >
          <ToggleButton value="encode">{t('Encode')}</ToggleButton>
          <ToggleButton value="decode">{t('Decode')}</ToggleButton>
        </ToggleButtonGroup>

        <TextField label={t('Input')} value={input} onChange={(e) => setInput(e.target.value)} fullWidth multiline rows={4} sx={{ mb: 2 }} />
        <Button variant="contained" onClick={run} sx={{ mb: 2 }}>{t('Run')}</Button>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', mb: 2 }}>
          <TextField label={t('Output')} value={output} fullWidth multiline rows={4} InputProps={{ readOnly: true }} sx={{ flex: 1 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <CopyButton text={output} variant="outlined" sx={{ whiteSpace: 'nowrap' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
