"use client";

import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useLang } from './LanguageProvider';
import { zhCN, enUS, fr, Locale } from 'date-fns/locale';

type DateTimeInputProps = {
  label?: string;
  value: Date | null;
  onChange: (d: Date | null) => void;
  sx?: any;
};

export default function DateTimeInput({ label, value, onChange, sx }: DateTimeInputProps) {
  const { t, locale } = useLang();
  const localeMap: Record<string, Locale> = {
    en: enUS,
    zh: zhCN,
    fr: fr,
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeMap[locale] || enUS}>
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
    </LocalizationProvider>
  );
}
