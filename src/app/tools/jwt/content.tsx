"use client";

import React, { useState } from 'react';
import { Box, Typography, TextField, Alert } from '@mui/material';
import { useLang } from '@/components/LanguageProvider';
import { parseJwt, verifyHs256, verifyRs256 } from '@/utils/jwt';
import { Check } from '@mui/icons-material';

const supportedAlgorithms = new Map([
  ['HS256', verifyHs256],
  ['RS256', verifyRs256],
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
    if (!jwt || !jwt.trim()) {
      setHeader(''); setPayload('');
      return;
    }

    let parsed;
    try {
      parsed = parseJwt(jwt);
      setHeader(JSON.stringify(parsed.header, null, 2));
      setPayload(JSON.stringify(parsed.payload, null, 2));
    } catch (e: any) {
      setHeader(''); setPayload('');
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

      const res = await verifier(key, signingInput, sig);
      if (!res || !res.ok) {
        setVerifyResult(t('Tools.JWT.Verify.Failure'));
      } else {
        setVerifyResult(t('Tools.JWT.Verify.Success'));
      }
    } catch (e: any) {
      setError(String(e?.message ?? e));
    }
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>{t('Tools.JWT.Name')}</Typography>

      <Box sx={{ display: 'grid', gap: 2 }}>
        <TextField
          label={t('Tools.JWT.Input')}
          value={jwt}
          onChange={(e) => { setJwt(e.target.value); }}
          multiline
          minRows={2}
          onBlur={handleParseAndVerify}
        />

        {error && <Alert severity="error">{error}</Alert>}

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
          <Alert
            severity={verifyResult === t('Tools.JWT.Verify.Success') ? 'success' : 'warning'}>
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
