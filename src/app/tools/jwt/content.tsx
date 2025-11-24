'use client';

import { useState } from 'react';
import { Box, Typography, TextField, Alert } from '@mui/material';
import { useLang } from '@/components/LanguageProvider';
import { verifyHS256 } from '@/utils/crypto';
import { parseJwt } from '@/utils/jwt';

const supportedAlgorithms = new Map([
  ['HS256', verifyHS256],
])

export default function JwtContent() {
  const { t } = useLang();
  const [jwt, setJwt] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [key, setKey] = useState('');
  const [verifyResult, setVerifyResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleParseAndVerify() {
    setError(null);
    setVerifyResult(null);
    setHeader('');
    setPayload('');
    if (!jwt || !jwt.trim()) {
      return;
    }

    let parsed;
    try {
      parsed = parseJwt(jwt);
      setHeader(JSON.stringify(parsed.header, null, 2));
      setPayload(JSON.stringify(parsed.payload, null, 2));
    } catch (e: any) {
      setError(t('Tools.JWT.Errors.InvalidToken'));
      return;
    }

    if (!key || !key.trim()) {
      return;
    }

    try {
      const sig = parsed.signatureB64 || '';
      if (!sig) {
        setError(t('Tools.JWT.Errors.NoSignature'));
        return;
      }
      const signingInput = parsed.signingInput;
      if (!signingInput) {
        setError(t('Tools.JWT.Errors.InvalidToken'));
        return;
      }

      const verifier = supportedAlgorithms.get((parsed.header?.alg || '').toUpperCase());
      if (!verifier) {
        setError(t('Tools.JWT.Errors.UnsupportedAlg'));
        return;
      }

      const ok = await verifier(key, signingInput, sig);
      if (!ok) {
        setVerifyResult(t('Tools.JWT.Verify.Failure'));
      } else {
        setVerifyResult(t('Tools.JWT.Verify.Success'));
      }
    } catch (e: any) {
      setVerifyResult(t('Tools.JWT.Verify.Failure'));
      setError(String(e?.message ?? e));
    }
  }

  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 2 }}>{t('Tools.JWT.Name')}</Typography>

      <Box sx={{ display: 'grid', gap: 2 }}>
        <TextField
          label={t('Tools.JWT.Input')}
          value={jwt}
          onChange={(e) => { setJwt(e.target.value); }}
          multiline
          minRows={2}
          onBlur={handleParseAndVerify}
        />

        {error && <Alert severity='error'>{error}</Alert>}

        <TextField
          label={t('Tools.JWT.Header')}
          value={header}
          multiline
          minRows={4}
          slotProps={{ input: { readOnly: true } }}
        />
        <TextField
          label={t('Tools.JWT.Payload')}
          value={payload}
          multiline
          minRows={6}
          slotProps={{ input: { readOnly: true } }}
        />

        {verifyResult &&
          <Alert severity={
            verifyResult === t('Tools.JWT.Verify.Success') ? 'success' : 'warning'
          }>
            {verifyResult}
          </Alert>
        }
        <TextField
          label={t('Tools.JWT.Key')}
          value={key}
          onChange={(e) => setKey(e.target.value)}
          onBlur={handleParseAndVerify}
          multiline
          minRows={2}
          helperText={t('Tools.JWT.KeyHelper')}
        />
      </Box>
    </Box>
  );
}
