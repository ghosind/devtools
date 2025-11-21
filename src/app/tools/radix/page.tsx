import en from '@/translations/en.json';
import RadixContent from './content';

export const metadata = {
  title: en.Tools.Radix.Name,
  description: en.Tools.Radix.Description,
  keywords: [
    'devtools',
    'radix',
    'base',
    'convert',
    'number',
    'parsing',
    'validation',
    'hexadecimal',
    'decimal',
    'binary',
    'octal',
  ],
  openGraph: {
    title: en.Tools.Radix.Name,
    description: en.Tools.Radix.Description,
  },
  twitter: {
    title: en.Tools.Radix.Name,
    description: en.Tools.Radix.Description,
  }
};

export default function RadixPage() {
  return <RadixContent />;
}
