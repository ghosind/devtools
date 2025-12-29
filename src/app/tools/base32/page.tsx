import en from '@/translations/en.json';
import Base32Content from './content';

export const metadata = {
  title: en.Tools.Base32.Name,
  description: en.Tools.Base32.Description,
  keywords: [
    'base32',
    'base32 encode',
    'base32 decode',
    'encode base32',
    'decode base32',
    'free online base32 encoder',
    'free online base32 decoder',
    'base32 converter',
    'base32 encoding',
    'base32 decoding',
    'base32 tool',
  ],
  openGraph: {
    title: en.Tools.Base32.Name,
    description: en.Tools.Base32.Description
  },
  twitter: {
    title: en.Tools.Base32.Name,
    description: en.Tools.Base32.Description
  },
};

export default function Base32Page() {
  return (
    <Base32Content />
  );
}
