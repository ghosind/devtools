import en from '@/translations/en.json';
import HashContent from './content';

export const metadata = {
  title: en.Tools.Hash.Name,
  description: en.Tools.Hash.Description,
  keywords: ['devtools', 'hash', 'md5', 'sha', 'hmac'],
  openGraph: {
    title: en.Tools.Hash.Name,
    description: en.Tools.Hash.Description
  },
  twitter: {
    title: en.Tools.Hash.Name,
    description: en.Tools.Hash.Description
  },
};

export default function HashPage() {
  return (
    <HashContent />
  );
}
