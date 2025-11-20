import TimeContent from "./content";
import en from '@/translations/en.json';

export const metadata = {
  title: en.Tools.Time.Name,
  description: en.Tools.Time.Description,
  keywords: ['devtools', 'date', 'time', 'timestamp'],
  openGraph: {
    title: en.Tools.Time.Name,
    description: en.Tools.Time.Description
  },
  twitter: {
    card: 'summary_large_image',
    title: en.Tools.Time.Name,
    description: en.Tools.Time.Description
  },
};

export default function TimePage() {
  return (
    <TimeContent />
  );
}
