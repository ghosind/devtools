import { useState } from "react";
import CopyButton from "@/components/CopyButton";
import { useLang } from "@/components/LanguageProvider";
import { Box, Button, TextField, Typography } from "@mui/material";
import { formatDate } from '@/utils/time';

export default function ObjectIDExtractTab() {
  const { t } = useLang();
  const [oidInput, setOidInput] = useState('');
  const [oidUtc, setOidUtc] = useState('');
  const [oidLocal, setOidLocal] = useState('');
  const [oidTs, setOidTs] = useState('');

  function isValidObjectId(id: string) {
    return /^(ObjectId\("\")?[0-9a-fA-F]{24}("\)\))?$/.test(id);
  }

  function parseObjectIdToDate(id: string) {
    if (!isValidObjectId(id)) {
      throw { code: 'INVALID_OBJECTID' };
    }
    if (id.startsWith('ObjectId("') && id.endsWith('")')) {
      id = id.slice(10, -2);
    }
    const tsHex = id.slice(0, 8);
    const ts = parseInt(tsHex, 16) * 1000;
    return new Date(ts);
  }

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>{t('Tools.MongoDBObjectID.Extract.Title')}</Typography>
      <TextField
        label={t('Tools.MongoDBObjectID.Extract.Input')}
        value={oidInput}
        onChange={(e) => setOidInput(e.target.value)}
        fullWidth
        sx={{ my: 1 }}
      />
      <Button variant="contained" onClick={() => {
        try {
            const d = parseObjectIdToDate(oidInput.trim());
            setOidUtc(formatDate(d, true));
            const tz = d.getTimezoneOffset() / -60;
            setOidLocal(`${formatDate(d, false)} (GMT${tz >= 0 ? '+' : ''}${tz})`);
            setOidTs(String(Math.floor(d.getTime() / 1000)));
          } catch (err: any) {
            if (err && typeof err === 'object' && 'code' in err && err.code === 'INVALID_OBJECTID') {
              const msg = t('Tools.MongoDBObjectID.Errors.InvalidObjectID');
              setOidUtc(msg);
              setOidLocal(msg);
              setOidTs(msg);
            } else {
              const msg = String(err?.message ?? err);
              setOidUtc(msg);
              setOidLocal(msg);
              setOidTs(msg);
            }
          }
      }}>{t('Run')}</Button>

      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <TextField label={t('Tools.MongoDBObjectID.Extract.OutputUTC')} value={oidUtc} fullWidth slotProps={{ input: { readOnly: true } }} />
        <CopyButton text={oidUtc} />
      </Box>
      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
        <TextField label={t('Tools.MongoDBObjectID.Extract.OutputLocal')} value={oidLocal} fullWidth slotProps={{ input: { readOnly: true } }} />
        <CopyButton text={oidLocal} />
      </Box>
      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
        <TextField label={t('Tools.MongoDBObjectID.Extract.OutputTimestamp')} value={oidTs} fullWidth slotProps={{ input: { readOnly: true } }} />
        <CopyButton text={oidTs} />
      </Box>
    </Box>
  );
}
