'use client';

import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import CopyButton from '@/components/CopyButton';
import DateTimeInput from '@/components/DateTimeInput';
import { useLang } from '@/components/LanguageProvider';
import { generateObjectIdFromDate } from '@/utils/mongodb';

export default function ObjectIDGenerateTab() {
  const { t } = useLang();
  const [genDate, setGenDate] = useState<Date | null>(null);
  const [genOid, setGenOid] = useState('');
  const [genObjId, setGenObjId] = useState('');

  const handleRun = () => {
    if (!genDate) {
      setGenOid(t('Tools.MongoDB.Errors.InvalidDate'));
      return;
    }
    const oid = generateObjectIdFromDate(genDate);
    setGenOid(oid);
    setGenObjId(`ObjectId("${oid}")`);
  }

  return (
    <Box sx={{ mt: 1 }}>
      <DateTimeInput
        label={t('Tools.MongoDB.Generate.Input')}
        value={genDate}
        onChange={(v) => setGenDate(v)}
        sx={{ my: 1 }}
      />
      <Button variant='contained' onClick={handleRun}>{t('Run')}</Button>

      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
        <TextField
          label={t('Output')}
          value={genOid}
          fullWidth
          slotProps={{ input: { readOnly: true } }}
        />
        <CopyButton text={genOid} />
      </Box>
      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
        <TextField
          label={t('Tools.MongoDB.Generate.Output')}
          value={genObjId}
          fullWidth
          slotProps={{ input: { readOnly: true } }}
        />
        <CopyButton text={genObjId} />
      </Box>
    </Box>
  );
}
