import en from '@/translations/en.json';
import UrlContent from './content';

export const metadata = {
  title: en.Tools.URL.Name,
  description: en.Tools.URL.Description,
  keywords: ['devtools', 'url', 'url encode', 'url decode'],
  openGraph: {
    title: en.Tools.URL.Name,
    description: en.Tools.URL.Description
  },
  twitter: {
    title: en.Tools.URL.Name,
    description: en.Tools.URL.Description
  },
};

export default function UrlPage() {
  return (
    <UrlContent />
  );
}
