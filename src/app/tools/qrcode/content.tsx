'use client';

import { useState } from 'react';
import {
  Box, TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import { useLang } from '@/components/LanguageProvider';
import CopyButton from '@/components/CopyButton';
import QRCode from 'qrcode';

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
type QRCodeFormat = 'png' | 'svg';

export default function QRCodeContent() {
  const { t } = useLang();
  const [input, setInput] = useState('');
  const [dataUrl, setDataUrl] = useState('');
  const [error, setError] = useState('');
  const [size, setSize] = useState(256);
  const [ec, setEc] = useState<ErrorCorrectionLevel>('M');
  const [format, setFormat] = useState<QRCodeFormat>('png');

  const handleGenerate = async () => {
    setError('');
    setDataUrl('');
    try {
      if (!input) {
        setError(t('Tools.QRCode.Description'));
        return;
      }

      let dataUrl = '';
      switch (format) {
        case 'png':
          dataUrl = await QRCode.toDataURL(
            input,
            { errorCorrectionLevel: ec, width: size },
          );
          break;
        case 'svg':
          const svg = await QRCode.toString(
            input,
            { type: 'svg', errorCorrectionLevel: ec, width: size },
          );
          dataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
          break;
      }
      setDataUrl(dataUrl);
    } catch (e) {
      setError(String((e as any)?.message ?? e));
    }
  };

  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 2 }}>{t('Tools.QRCode.Name')}</Typography>

      <Box sx={{ mb: 2 }}>
        <FormControl size='small' sx={{ minWidth: 140, mr: 2 }}>
          <InputLabel>{t('Tools.QRCode.ErrorCorrection')}</InputLabel>
          <Select
            value={ec}
            label={t('Tools.QRCode.ErrorCorrection')}
            onChange={(e) => setEc(e.target.value as any)}
          >
            <MenuItem value='L'>{t('Tools.QRCode.ErrorCorrections.Low')}</MenuItem>
            <MenuItem value='M'>{t('Tools.QRCode.ErrorCorrections.Medium')}</MenuItem>
            <MenuItem value='Q'>{t('Tools.QRCode.ErrorCorrections.Quartile')}</MenuItem>
            <MenuItem value='H'>{t('Tools.QRCode.ErrorCorrections.High')}</MenuItem>
          </Select>
        </FormControl>

        <FormControl size='small' sx={{ minWidth: 140, mr: 2 }}>
          <InputLabel>{t('Tools.QRCode.Format')}</InputLabel>
          <Select
            value={format}
            label={t('Tools.QRCode.Format')}
            onChange={(e) => setFormat(e.target.value as any)}
          >
            <MenuItem value='png'>PNG</MenuItem>
            <MenuItem value='svg'>SVG</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label={t('Tools.QRCode.Size')}
          type='number'
          size='small'
          value={size}
          onChange={(e) => setSize(Number(e.target.value || 0))}
          sx={{ width: 140 }}
        />
      </Box>

      <TextField
        label={t('Input')}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />

      <Button
        variant='contained'
        onClick={handleGenerate}
        sx={{ mb: 2 }}
      >
        {t('Generate')}
      </Button>

      {error && <Typography color='error' sx={{ mb: 2 }}>{error}</Typography>}

      {dataUrl && (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <img src={dataUrl} alt='qrcode' style={{ maxWidth: '100%', height: 'auto' }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <CopyButton text={dataUrl} variant='outlined' sx={{ whiteSpace: 'nowrap' }} />
            <Button
              component='a'
              href={dataUrl}
              download={`qrcode.${format}`}
              variant='outlined'
            >
              {t('Download')}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
