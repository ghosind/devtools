import TimeContent from "./content";
import en from '@/translations/en.json';

export const metadata = {
  title: en.Tools.Time.Name,
  description: 'Convert timestamps and perform date calculations — timestamp to human date, date to timestamp, add/subtract time, and calculate ranges.',
  keywords: [
    'devtools',
    'time converter',
    'timestamp converter',
    'unix timestamp',
    'date to timestamp',
    'timestamp to date',
    'date calculator',
    'time zone converter',
    'date range calculator',
    'add subtract time',
    'epoch time converter',
    'human date converter',
    'time conversion tool',
    'timestamp calculator',
    'date difference calculator',
    'convert unix time',
    'time zone tool',
    'date math calculator',
    'timestamp generator',
    'time format converter',
    'date time converter',
    'time calculation tool',
    'convert epoch time',
    'timestamp to human date',
    'human date to timestamp',
  ],
  openGraph: {
    title: en.Tools.Time.Name,
    description: 'Convert timestamps and perform date calculations — timestamp to human date, date to timestamp, add/subtract time, and calculate ranges.'
  },
  twitter: {
    card: 'summary_large_image',
    title: en.Tools.Time.Name,
    description: 'Convert timestamps and perform date calculations — timestamp to human date, date to timestamp, add/subtract time, and calculate ranges.'
  },
};

export default function TimePage() {
  return (
    <TimeContent />
  );
}
