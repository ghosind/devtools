'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { DefaultLocale } from '@/constants/global';
import en from '@/translations/en.json';
import zh from '@/translations/zh.json';
import fr from '@/translations/fr.json';
import { isBrowser } from '@/utils/browser';

interface Messages {
  [key: string]: string | Messages;
}

const langs: Record<string, Messages> = {
  en,
  zh,
  fr,
};

type ContextType = {
  locale: string;
  setLocale: (l: string) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
};

const LangContext = createContext<ContextType>({
  locale: DefaultLocale,
  setLocale: () => { },
  t: (k) => k
});

export function useLang() {
  return useContext(LangContext);
}

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<string>(DefaultLocale);

  useEffect(() => {
    const stored = isBrowser() ? localStorage.getItem('locale') : null;
    if (stored) {
      setLocale(stored);
    }
  }, []);

  useEffect(() => {
    if (isBrowser()) {
      localStorage.setItem('locale', locale);
    }
  }, [locale]);

  const t = (key: string, params?: Record<string, string | number>) => {
    // support dot-separated nested keys, e.g. 'home.title'
    const lookup = (obj: Messages | undefined, path: string): string | undefined => {
      if (!obj) {
        return undefined;
      }

      const parts = path.split('.');
      let cur: any = obj;
      for (const p of parts) {
        if (cur && typeof cur === 'object' && p in cur) {
          cur = cur[p];
        } else {
          return undefined;
        }
      }
      return typeof cur === 'string' ? cur : undefined;
    };

    const raw = lookup(langs[locale], key) ?? key;
    if (!params) {
      return raw;
    }
    // simple templating: replace {name} with corresponding param values
    return raw.replace(/\{([^}]+)\}/g, (_, k) => {
      const val = params[k];
      return val === undefined ? `{${k}}` : String(val);
    });
  };

  return (
    <LangContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LangContext.Provider>
  );
}
