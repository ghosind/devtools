'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useLang } from '@/components/LanguageProvider';
import CopyButton from '@/components/CopyButton';
import { decodeBase64, encodeBase64 } from '@/utils/base64';

type Mode = 'encode' | 'decode';

export default function Base64Content() {
  const { t } = useLang();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [outputError, setOutputError] = useState('');
  const [mode, setMode] = useState<Mode>('encode');

  const handleRun = () => {
    setOutput('');
    setOutputError('');

    try {
      const res = mode === 'encode' ? encodeBase64(input) : decodeBase64(input);
      setOutput(res);
    } catch (e) {
      const msg = String((e as any)?.message ?? e);
      setOutputError(t('Tools.Base64.Errors.InvalidInput', { msg }));
    }
  }

  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 2 }}>
        {t('Tools.Base64.Name')}
      </Typography>

      <Box>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, v) => v && setMode(v)}
          size='small'
          sx={{ marginBottom: 2 }}
        >
          <ToggleButton value='encode'>{t('Encode')}</ToggleButton>
          <ToggleButton value='decode'>{t('Decode')}</ToggleButton>
        </ToggleButtonGroup>

        <TextField
          label={t('Input')}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        <Button variant='contained' onClick={handleRun} sx={{ mb: 2 }}>
          {t('Run')}
        </Button>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', mb: 2 }}>
          <TextField
            label={t('Output')}
            value={output}
            fullWidth
            multiline
            rows={4}
            slotProps={{ input: { readOnly: true } }}
            sx={{ flex: 1 }}
            error={!!outputError}
            helperText={outputError}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <CopyButton text={output} variant='outlined' sx={{ whiteSpace: 'nowrap' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
