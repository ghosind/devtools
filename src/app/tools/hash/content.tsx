'use client';

import { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { useLang } from '@/components/LanguageProvider';
import CopyButton from '@/components/CopyButton';
import { hmac, hash, Encoding, HashAlgorithm } from '@/utils/crypto';

export default function HashContent() {
  const { t } = useLang();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('md5');
  const [isHmac, setIsHmac] = useState(false);
  const [key, setKey] = useState('');
  const [encoding, setEncoding] = useState<Encoding>('hex');
  const [error, setError] = useState('');

  const handleRun = async () => {
    setOutput('');
    setError('');
    try {
      if (isHmac && algorithm === 'md5') {
        setError(t('Tools.Hash.Errors.UnsupportedHMAC'));
        return;
      }

      let result: string;
      if (isHmac) {
        result = hmac(algorithm.toLowerCase() as any, key, input, encoding);
      } else {
        result = hash(algorithm as any, input, encoding);
      }
      setOutput(result);
    } catch (e) {
      setError(String((e as any)?.message ?? e));
    }
  };

  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 2 }}>{t('Tools.Hash.Name')}</Typography>

      <Box sx={{ mb: 2 }}>
        <FormControl size='small' sx={{ minWidth: 200, mr: 2 }}>
          <InputLabel>{t('Tools.Hash.Algorithm')}</InputLabel>
          <Select
            value={algorithm}
            label={t('Tools.Hash.Algorithm')}
            onChange={(e) => setAlgorithm(e.target.value as HashAlgorithm)}
          >
            <MenuItem value='md5'>MD5</MenuItem>
            <MenuItem value='sha1'>SHA-1</MenuItem>
            <MenuItem value='sha256'>SHA-256</MenuItem>
            <MenuItem value='sha384'>SHA-384</MenuItem>
            <MenuItem value='sha512'>SHA-512</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={<Switch checked={isHmac} onChange={(_, v) => setIsHmac(v)} />}
          label={t('Tools.Hash.HMAC')}
        />

        <ToggleButtonGroup
          value={encoding}
          exclusive
          onChange={(_, v) => v && setEncoding(v)}
          size='small'
          sx={{ ml: 2 }}
        >
          <ToggleButton value='hex'>HEX</ToggleButton>
          <ToggleButton value='base64'>Base64</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {isHmac && (
        <TextField
          label={t('Tools.Hash.Key')}
          value={key}
          onChange={(e) => setKey(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
      )}

      <TextField
        label={t('Input')}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />

      <Button variant='contained' onClick={handleRun} sx={{ mb: 2 }}>{t('Run')}</Button>

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', mb: 2 }}>
        <TextField
          label={t('Output')}
          value={output}
          fullWidth
          multiline
          rows={4}
          slotProps={{ input: { readOnly: true } }}
          sx={{ flex: 1 }}
          error={!!error}
          helperText={error}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <CopyButton text={output} variant='outlined' sx={{ whiteSpace: 'nowrap' }} />
        </Box>
      </Box>
    </Box>
  );
}
