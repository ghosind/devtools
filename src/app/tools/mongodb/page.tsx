import MongoDBContent from "./content";
import en from '@/translations/en.json';

export const metadata = {
  title: en.Tools.MongoDB.Name,
  description: 'Inspect and generate MongoDB ObjectIDs — extract timestamps, convert to human-readable dates, and generate ObjectIDs from a date.',
  keywords: [
    'devtools',
    'mongodb objectid',
    'objectid to timestamp',
    'mongodb objectid generator',
    'extract objectid date',
    'objectid conversion',
    'mongo objectid',
    'generate objectid',
    'objectid from date',
    'mongodb tools',
    'objectid inspector',
    'objectid decoder',
    'objectid viewer',
    'objectid online',
    'mongodb object id',
    'object id generator',
    'object id to date',
    'object id converter',
    'mongo object id',
  ],
  openGraph: {
    title: en.Tools.MongoDB.Name,
    description: 'Inspect and generate MongoDB ObjectIDs — extract timestamps, convert to human-readable dates, and generate ObjectIDs from a date.'
  },
  twitter: {
    title: en.Tools.MongoDB.Name,
    description: 'Inspect and generate MongoDB ObjectIDs — extract timestamps, convert to human-readable dates, and generate ObjectIDs from a date.'
  },
};

export default function MongoDBPage() {
  return (
    <MongoDBContent />
  );
}
