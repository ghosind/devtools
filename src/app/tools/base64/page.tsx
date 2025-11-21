import en from '@/translations/en.json';
import Base64Content from './content';

export const metadata = {
  title: en.Tools.Base64.Name,
  description: en.Tools.Base64.Description,
  keywords: ['devtools', 'base64', 'base64 encode', 'base64 decode'],
  openGraph: {
    title: en.Tools.Base64.Name,
    description: en.Tools.Base64.Description
  },
  twitter: {
    title: en.Tools.Base64.Name,
    description: en.Tools.Base64.Description
  },
};

export default function Base64Page() {
  return (
    <Base64Content />
  );
}
