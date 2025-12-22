import en from '@/translations/en.json';
import UrlContent from './content';

export const metadata = {
  title: en.Tools.URL.Name,
  description: 'Quickly encode and decode URL components and percent-encoding. Useful for building query strings and debugging web requests.',
  keywords: [
    'devtools',
    'url encoder',
    'url decoder',
    'encode url',
    'decode url',
    'percent-encoding',
    'url encode online',
    'encodeURIComponent',
    'decodeURIComponent',
    'url tool',
    'url utility',
    'url converter',
    'url encoding decoding',
    'url text encoder',
    'url text decoder',
    'url online',
    'free url tool',
    'url encode decode tool',
    'url string converter',
    'url text processing',
    'url encode decode text',
    'url online utility',
    'url text transformer',
    'url string encoder',
    'url string decoder',
    'url encoding tool',
    'url decoding tool',
    'url text encoder decoder',
  ],
  openGraph: {
    title: en.Tools.URL.Name,
    description: 'Quickly encode and decode URL components and percent-encoding. Useful for building query strings and debugging web requests.'
  },
  twitter: {
    title: en.Tools.URL.Name,
    description: 'Quickly encode and decode URL components and percent-encoding. Useful for building query strings and debugging web requests.'
  },
};

export default function UrlPage() {
  return (
    <UrlContent />
  );
}
