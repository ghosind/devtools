import MongoDBContent from "./content";
import en from '@/translations/en.json';

export const metadata = {
  title: en.Tools.MongoDB.Name,
  description: en.Tools.MongoDB.Description,
  keywords: ['devtools', 'MongoDB', 'ObjectId', 'timestamp', 'datetime'],
  openGraph: {
    title: en.Tools.MongoDB.Name,
    description: en.Tools.MongoDB.Description
  },
  twitter: {
    title: en.Tools.MongoDB.Name,
    description: en.Tools.MongoDB.Description
  },
};

export default function MongoDBPage() {
  return (
    <MongoDBContent />
  );
}
