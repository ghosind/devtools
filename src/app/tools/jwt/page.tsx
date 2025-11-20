import JwtContent from './content';
import en from '@/translations/en.json';

export const metadata = {
  title: en.Tools.JWT.Name,
  description: en.Tools.JWT.Description,
  keywords: ['devtools', 'jwt', 'json', 'web', 'token', 'encode', 'decode', 'verify', 'sign'],
  openGraph: {
    title: en.Tools.JWT.Name,
    description: en.Tools.JWT.Description
  },
  twitter: {
    title: en.Tools.JWT.Name,
    description: en.Tools.JWT.Description
  },
};

export default function Page() {
  return <JwtContent />;
}
