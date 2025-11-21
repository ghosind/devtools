'use client';

import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/components/LanguageProvider';
import { formatDate } from '@/utils/time';
import { parseObjectIdToDate } from '@/utils/mongodb';

export default function ObjectIDExtractTab() {
  const { t } = useLang();
  const [oidInput, setOidInput] = useState('');
  const [oidUtc, setOidUtc] = useState('');
  const [oidLocal, setOidLocal] = useState('');
  const [oidTs, setOidTs] = useState('');

  const handleRun = () => {
    try {
      const d = parseObjectIdToDate(oidInput.trim());
      const tz = d.getTimezoneOffset() / -60;

      setOidUtc(formatDate(d, true));
      setOidLocal(`${formatDate(d, false)} (GMT${tz >= 0 ? '+' : ''}${tz})`);
      setOidTs(String(Math.floor(d.getTime() / 1000)));
    } catch (err: any) {
      let msg = String(err?.message ?? err);
      if (err && typeof err === 'object' && 'code' in err && err.code === 'INVALID_OBJECTID') {
        msg = t('Tools.MongoDB.Errors.InvalidObjectID');
      }
      setOidUtc(msg);
      setOidLocal(msg);
      setOidTs(msg);
    }
  }

  return (
    <Box>
      <TextField
        label={t('Tools.MongoDB.Extract.Input')}
        value={oidInput}
        onChange={(e) => setOidInput(e.target.value)}
        fullWidth
        sx={{ my: 1 }}
      />
      <Button variant='contained' onClick={handleRun}>{t('Run')}</Button>

      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <TextField
          label={t('Tools.MongoDB.Extract.OutputUTC')}
          value={oidUtc}
          fullWidth
          slotProps={{ input: { readOnly: true } }}
        />
        <CopyButton text={oidUtc} />
      </Box>
      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
        <TextField
          label={t('Tools.MongoDB.Extract.OutputLocal')}
          value={oidLocal}
          fullWidth
          slotProps={{ input: { readOnly: true } }}
        />
        <CopyButton text={oidLocal} />
      </Box>
      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
        <TextField
          label={t('Tools.MongoDB.Extract.OutputTimestamp')}
          value={oidTs}
          fullWidth
          slotProps={{ input: { readOnly: true } }}
        />
        <CopyButton text={oidTs} />
      </Box>
    </Box>
  );
}
