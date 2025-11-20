import CopyButton from "@/components/CopyButton";
import { Box, TextField } from "@mui/material";

export default function FieldRow({
  label, value, onChange, error
}: {
  label: string; value: string; onChange: (v: string) => void; error?: string
}) {
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
