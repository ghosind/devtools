"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import en from '@/translations/en.json';
import zh from '@/translations/zh.json';

type Messages = Record<string, string>;

const langs: Record<string, Messages> = {
  en,
  zh
};

type ContextType = {
  locale: string;
  setLocale: (l: string) => void;
  t: (key: string) => string;
};

const LangContext = createContext<ContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (k) => k
});

export function useLang() {
  return useContext(LangContext);
}

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<string>('en');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('locale') : null;
    if (stored) setLocale(stored);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('locale', locale);
  }, [locale]);

  const t = (key: string) => {
    return langs[locale]?.[key] ?? key;
  };

  return <LangContext.Provider value={{ locale, setLocale, t }}>{children}</LangContext.Provider>;
}
