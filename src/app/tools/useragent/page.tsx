import en from '@/translations/en.json';
import UserAgentContent from './content';

export const metadata = {
  title: en.Tools?.UserAgent?.Name,
  description: 'Parse User-Agent strings to detect browser, operating system and device type. Useful for debugging and analytics.',
  keywords: [
    'devtools',
    'user agent parser',
    'user agent parser online',
    'browser detection',
    'device detection',
    'ua inspector',
    'detect browser os',
    'user-agent lookup',
    'user-agent analyzer',
    'user-agent decoder',
    'user-agent viewer',
    'user-agent tool',
    'user-agent string parser',
    'user-agent info',
    'user-agent details',
    'user-agent online',
    'user-agent checker',
    'browser ua parser',
    'os detection',
    'device type detection',
    'user-agent analysis',
    'user-agent identification',
    'user-agent debugging',
    'user-agent analytics',
    'user-agent detection tool',
    'user-agent string analysis',
    'user-agent parsing online',
    'user-agent info extractor',
    'user-agent data',
    'user-agent report',
    'user-agent examination',
    'user-agent string decoder',
    'user-agent string viewer',
    'user-agent string tool',
  ],
  openGraph: {
    title: en.Tools?.UserAgent?.Name,
    description: 'Parse User-Agent strings to detect browser, operating system and device type. Useful for debugging and analytics.',
  },
  twitter: {
    title: en.Tools?.UserAgent?.Name,
    description: 'Parse User-Agent strings to detect browser, operating system and device type. Useful for debugging and analytics.',
  },
};

export default function Page() {
  return <UserAgentContent />;
}
