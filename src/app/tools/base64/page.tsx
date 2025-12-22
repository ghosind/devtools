import en from '@/translations/en.json';
import Base64Content from './content';

export const metadata = {
  title: en.Tools.Base64.Name,
  description: 'Free online Base64 encoder and decoder — quickly encode or decode text. No signup, copy results, supports UTF-8.',
  keywords: [
    'devtools',
    'base64 encoder',
    'base64 decoder',
    'base64 encode online',
    'base64 decode online',
    'text to base64',
    'encode string',
    'decode string',
    'online tool',
    'base64 converter',
    'utf8 base64',
    'base64 utility',
    'base64 encode decode',
    'base64 text encoder',
    'base64 text decoder',
    'base64 tool',
    'base64 online',
    'free base64',
    'base64 encode decode tool',
    'base64 translator',
    'base64 string converter',
    'base64 text converter',
    'base64 encoding decoding',
    'base64 quick tool',
    'base64 fast encoder decoder',
    'base64 no signup',
    'base64 copy results',
    'base64 utf-8 support',
    'base64 ascii',
    'base64 binary',
    'base64 data encoding',
    'base64 data decoding',
    'base64 text processing',
    'base64 encode decode text',
    'base64 online utility',
    'base64 free tool',
    'base64 text transformer',
    'base64 string encoder',
    'base64 string decoder',
    'base64 text manipulator',
    'base64 encoding tool',
    'base64 decoding tool',
    'base64 text encoder decoder',
  ],
  openGraph: {
    title: en.Tools.Base64.Name,
    description: 'Free online Base64 encoder and decoder — quickly encode or decode text. No signup, copy results, supports UTF-8.'
  },
  twitter: {
    title: en.Tools.Base64.Name,
    description: 'Free online Base64 encoder and decoder — quickly encode or decode text. No signup, copy results, supports UTF-8.'
  },
};

export default function Base64Page() {
  return (
    <Base64Content />
  );
}
