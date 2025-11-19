"use client";

import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useLang } from './LanguageProvider';
import { langs } from '@/constants/lang';

export default function LocaleSelector() {
  const { locale, setLocale } = useLang();

  return (
    <Select
      value={locale}
      onChange={(e) => setLocale(String(e.target.value))}
      variant="standard"
      sx={{ color: 'white' }}
    >
      {langs.map((lang) => (
        <MenuItem key={lang.code} value={lang.code}>
          {lang.name}
        </MenuItem>
      ))}
    </Select>
  );
}
