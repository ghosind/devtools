'use client';

import { PropsWithChildren } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';

const createEmotionCache = () => {
  return createCache({
    key: 'mui',
    prepend: true,
  });
}

const clientSideCache = createEmotionCache();

export default function EmotionRegistry({ children }: PropsWithChildren) {
  useServerInsertedHTML(() => {
    const cache = clientSideCache;
    const styles = Object.entries(cache.inserted)
      .map(([key, value]) => (typeof value === 'string' ?
        <style
          key={key}
          data-emotion={`${cache.key} ${key}`}
          dangerouslySetInnerHTML={{ __html: value }}
        />
        : (<></>)));
    return <>{styles}</>;
  });

  return (
    <CacheProvider value={clientSideCache}>
      {children}
    </CacheProvider>
  );
}
