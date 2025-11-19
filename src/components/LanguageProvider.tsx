"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import en from '@/translations/en.json';
import zh from '@/translations/zh.json';
import fr from '@/translations/fr.json';

interface Messages {
  [key: string]: string | Messages;
}

const langs: Record<string, Messages> = {
  en: en as unknown as Messages,
  zh: zh as unknown as Messages,
  fr: fr as unknown as Messages,
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
    // support dot-separated nested keys, e.g. "home.title"
    const lookup = (obj: Messages | undefined, path: string): string | undefined => {
      if (!obj) return undefined;
      const parts = path.split('.');
      let cur: any = obj;
      for (const p of parts) {
        if (cur && typeof cur === 'object' && p in cur) cur = cur[p];
        else return undefined;
      }
      return typeof cur === 'string' ? cur : undefined;
    };

    return lookup(langs[locale], key) ?? key;
  };

  return <LangContext.Provider value={{ locale, setLocale, t }}>{children}</LangContext.Provider>;
}
