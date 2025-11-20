import UserAgentContent from './content';
import en from '@/translations/en.json';

export const metadata = {
  title: en.Tools?.UserAgent?.Name,
  description: en.Tools?.UserAgent?.Description,
};

export default function Page() {
  return <UserAgentContent />;
}
