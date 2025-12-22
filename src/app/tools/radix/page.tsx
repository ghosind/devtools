import en from '@/translations/en.json';
import RadixContent from './content';

export const metadata = {
  title: en.Tools.Radix.Name,
  description: 'Convert numbers between binary, octal, decimal and hexadecimal. Fast base conversion with validation and examples.',
  keywords: [
    'devtools',
    'radix converter',
    'base converter',
    'binary to decimal',
    'decimal to hexadecimal',
    'number base conversion',
    'convert base',
    'binary octal hex decimal',
    'base conversion online',
    'number radix converter',
    'base converter tool',
    'radix conversion utility',
    'binary converter',
    'octal converter',
    'decimal converter',
    'hexadecimal converter',
    'base conversion calculator',
    'number base tool',
    'radix calculator',
    'base conversion examples',
    'convert between bases',
    'fast base conversion',
    'number system converter',
    'base conversion with validation',
  ],
  openGraph: {
    title: en.Tools.Radix.Name,
    description: 'Convert numbers between binary, octal, decimal and hexadecimal. Fast base conversion with validation and examples.',
  },
  twitter: {
    title: en.Tools.Radix.Name,
    description: 'Convert numbers between binary, octal, decimal and hexadecimal. Fast base conversion with validation and examples.',
  }
};

export default function RadixPage() {
  return <RadixContent />;
}
