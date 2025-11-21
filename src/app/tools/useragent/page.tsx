import en from '@/translations/en.json';
import UserAgentContent from './content';

export const metadata = {
  title: en.Tools?.UserAgent?.Name,
  description: en.Tools?.UserAgent?.Description,
  keywords: ['user agent', 'browser', 'device'],
  openGraph: {
    title: en.Tools?.UserAgent?.Name,
    description: en.Tools?.UserAgent?.Description,
  },
  twitter: {
    title: en.Tools?.UserAgent?.Name,
    description: en.Tools?.UserAgent?.Description,
  },
};

export default function Page() {
  return <UserAgentContent />;
}
