'use client';

import { ReactNode, useState } from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

function createEmotionCache() {
  return createCache({
    key: 'css',
    prepend: true,
  });
}

export default function EmotionRegistry({ children }: { children: ReactNode }) {
  const [cache] = useState(() => createEmotionCache());

  return (
    <CacheProvider value={cache}>
      {children}
    </CacheProvider>
  );
}
