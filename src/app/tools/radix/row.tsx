import CopyButton from '@/components/CopyButton';
import { Box, TextField } from '@mui/material';

export interface RadixFieldRowProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}

export default function RadixFieldRow({
  label, value, onChange, error
}: RadixFieldRowProps) {
  return (
    <Box>
      <TextField
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        multiline
        error={!!error}
        helperText={error ?? ''}
      />
      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
        <CopyButton text={value} />
      </Box>
    </Box>
  );
}
