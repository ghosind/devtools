import MongoDBObjectIdContent from "./content";
import en from '@/translations/en.json';

export const metadata = {
  title: en.Tools.MongoDBObjectID.Name,
  description: en.Tools.MongoDBObjectID.Description,
  keywords: ['devtools', 'mongodb', 'objectid'],
  openGraph: {
    title: en.Tools.MongoDBObjectID.Name,
    description: en.Tools.MongoDBObjectID.Description
  },
  twitter: {
    title: en.Tools.MongoDBObjectID.Name,
    description: en.Tools.MongoDBObjectID.Description
  },
};

export default function MongoDBObjectIDPage() {
  return (
    <MongoDBObjectIdContent />
  );
}
