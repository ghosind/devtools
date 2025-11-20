"use client";

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import FieldRow from './row';
import { useLang } from '@/components/LanguageProvider';

export default function RadixContent() {
  const { t } = useLang();
  const [bin, setBin] = useState('');
  const [oct, setOct] = useState('');
  const [dec, setDec] = useState('');
  const [hex, setHex] = useState('');
  const [errors, setErrors] = useState<{ bin?: string; oct?: string; dec?: string; hex?: string }>({});

  function parseBigInt(input: string, base: number): bigint {
    const digits = '0123456789abcdefghijklmnopqrstuvwxyz';
    let s = String(input).trim().toLowerCase();
    if (!s) throw { code: 'EMPTY' };
    let sign = 1;
    if (s.startsWith('-')) {
      sign = -1;
      s = s.slice(1);
    }
    s = s.replace(/[_\s]/g, '');
    if (s === '') throw { code: 'EMPTY' };
    let acc = BigInt(0);
    for (const ch of s) {
      const val = digits.indexOf(ch);
      if (val === -1) {
        // unsupported character at all (not 0-9a-z)
        throw { code: 'INVALID_CHAR', char: ch, base };
      }
      if (val >= base) {
        // digit not allowed in this base
        throw { code: 'INVALID_DIGIT', digit: ch, base };
      }
      acc = acc * BigInt(base) + BigInt(val);
    }
    return sign === -1 ? -acc : acc;
  }

  function sanitizeForBase(input: string, base: number) {
    if (!input) return '';
    let s = String(input).trim();
    // remove common grouping separators
    s = s.replace(/[_,\s']/g, '');
    // strip common prefixes
    if (base === 16) {
      if (s.toLowerCase().startsWith('0x')) s = s.slice(2);
    } else if (base === 2) {
      if (s.toLowerCase().startsWith('0b')) s = s.slice(2);
    } else if (base === 8) {
      if (s.toLowerCase().startsWith('0o')) s = s.slice(2);
    }
    return s;
  }


  const convertFrom = (from: 'bin' | 'oct' | 'dec' | 'hex', value: string) => {
    // clear previous errors
    setErrors({});
    try {
      if (!value.trim()) {
        setBin(''); setOct(''); setDec(''); setHex('');
        return;
      }

      let sanitized: string;
      let n: bigint;
      switch (from) {
        case 'bin':
          sanitized = sanitizeForBase(value, 2);
          n = parseBigInt(sanitized, 2);
          setBin(sanitized);
          break;
        case 'oct':
          sanitized = sanitizeForBase(value, 8);
          n = parseBigInt(sanitized, 8);
          setOct(sanitized);
          break;
        case 'dec':
          sanitized = sanitizeForBase(value, 10);
          // remove plus sign if present
          sanitized = sanitized.replace(/^\+/, '');
          n = parseBigInt(sanitized, 10);
          setDec(sanitized);
          break;
        case 'hex':
          sanitized = sanitizeForBase(value, 16);
          n = parseBigInt(sanitized, 16);
          setHex(sanitized.toLowerCase());
          break;
      }

      const isNegative = n < 0n;
      const abs = isNegative ? -n : n;
      const b = (isNegative ? '-' : '') + abs.toString(2);
      const o = (isNegative ? '-' : '') + abs.toString(8);
      const d = (isNegative ? '-' : '') + abs.toString(10);
      const h = (isNegative ? '-' : '') + abs.toString(16);

      setBin(b);
      setOct(o);
      setDec(d);
      setHex(h);
    } catch (err: any) {
      // support structured errors thrown from parseBigInt
      if (err && typeof err === 'object' && 'code' in err) {
        const e = err as { code: string; char?: string; digit?: string; base?: number };
        let msg = '';
        switch (e.code) {
          case 'INVALID_CHAR':
            msg = t('Tools.Radix.Errors.InvalidChar', { char: e.char ?? '', base: e.base ?? 0 });
            break;
          case 'INVALID_DIGIT':
            msg = t('Tools.Radix.Errors.InvalidDigit', { digit: e.digit ?? '', base: e.base ?? 0 });
            break;
          default:
            msg = String(err?.message ?? err);
        }
        setErrors({ [from]: msg });
      } else {
        const msg = String(err?.message ?? err);
        setErrors({ [from]: msg });
      }
      // clear outputs
      if (from !== 'bin') setBin('');
      if (from !== 'oct') setOct('');
      if (from !== 'dec') setDec('');
      if (from !== 'hex') setHex('');
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>{t('Tools.Radix.Name')}</Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
        {[{
          key: 'bin',
          label: t('Tools.Radix.Binary'),
          value: bin,
          onChange: (v: string) => convertFrom('bin', v),
          error: errors.bin,
        }, {
          key: 'oct',
          label: t('Tools.Radix.Octal'),
          value: oct,
          onChange: (v: string) => convertFrom('oct', v),
          error: errors.oct
        }, {
          key: 'dec',
          label: t('Tools.Radix.Decimal'),
          value: dec,
          onChange: (v: string) => convertFrom('dec', v),
          error: errors.dec
        }, {
          key: 'hex',
          label: t('Tools.Radix.Hex'),
          value: hex,
          onChange: (v: string) => convertFrom('hex', v),
          error: errors.hex
        }].map((f) => (
          <FieldRow
            key={f.key}
            label={f.label}
            value={f.value}
            onChange={f.onChange}
            error={f.error}
          />
        ))}
      </Box>
    </Box>
  );
}
