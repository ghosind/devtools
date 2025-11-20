import { useState } from "react";
import CopyButton from "@/components/CopyButton";
import DateTimeInput from "@/components/DateTimeInput";
import { useLang } from "@/components/LanguageProvider";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function ObjectGenerateTab() {
  const { t } = useLang();
  const [genDate, setGenDate] = useState<Date | null>(null);
  const [genOid, setGenOid] = useState('');
  const [genObjId, setGenObjId] = useState('');

  const generateObjectIdFromDate = (d: Date) => {
    // timestamp (4 bytes) + 16 hex padding chars = 24 chars
    const seconds = Math.floor(Date.UTC(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate(),
      d.getUTCHours(),
      d.getUTCMinutes(),
      d.getUTCSeconds(),
      d.getUTCMilliseconds()
    ) / 1000);
    const tsHex = seconds.toString(16).padStart(8, '0');
    return (tsHex + '0000000000000000').toLowerCase();
  }

  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>{t('Tools.MongoDBObjectID.Generate.Title')}</Typography>
      <DateTimeInput label={t('Tools.MongoDBObjectID.Generate.Input')} value={genDate} onChange={(v) => setGenDate(v)} sx={{ my: 1 }} />
      <Button variant="contained" onClick={() => {
        if (!genDate) {
          setGenOid(t('Tools.MongoDBObjectID.Errors.InvalidDate'));
          return;
        }
        const oid = generateObjectIdFromDate(genDate);
        setGenOid(oid);
        setGenObjId(`ObjectId("${oid}")`);
      }}>{t('Run')}</Button>

      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
        <TextField label={t('Output')} value={genOid} fullWidth slotProps={{ input: { readOnly: true } }} />
        <CopyButton text={genOid} />
      </Box>
      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
        <TextField label={t('Tools.MongoDBObjectID.Generate.Output')} value={genObjId} fullWidth slotProps={{ input: { readOnly: true } }} />
        <CopyButton text={genObjId} />
      </Box>
    </Box>
  );
}
