"use client";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useLang } from './LanguageProvider';
import { zhCN, enUS, fr, Locale } from 'date-fns/locale';

type DateTimeInputProps = {
  label?: string;
  value: Date | null;
  onChange: (d: Date | null) => void;
  sx?: any;
  /**
   * 'date' for date-only picker, 'datetime' for date+time picker
   */
  mode?: 'date' | 'datetime';
};

export default function DateTimeInput({ label, value, onChange, sx, mode }: DateTimeInputProps) {
  const { t, locale } = useLang();
  const localeMap: Record<string, Locale> = {
    en: enUS,
    zh: zhCN,
    fr: fr,
  };
  const m = mode ?? 'datetime';

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeMap[locale] || enUS}>
      {m === 'date' ? (
        <DatePicker
          localeText={{
            okButtonLabel: t('DateTimePicker.Ok'),
            cancelButtonLabel: t('DateTimePicker.Cancel'),
          }}
          views={['year', 'month', 'day']}
          label={label}
          value={value}
          onChange={onChange}
          slotProps={{ textField: { fullWidth: true, sx } }}
          format='yyyy-MM-dd'
        />
      ) : (
        <DateTimePicker
          localeText={{
            okButtonLabel: t('DateTimePicker.Ok'),
            cancelButtonLabel: t('DateTimePicker.Cancel'),
          }}
          views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
          ampm={false}
          label={label}
          value={value}
          onChange={onChange}
          slotProps={{ textField: { fullWidth: true, sx } }}
          format='yyyy-MM-dd HH:mm:ss'
        />
      )}
    </LocalizationProvider>
  );
}
