import en from '@/translations/en.json';
import HashContent from './content';

export const metadata = {
  title: en.Tools.Hash.Name,
  description: 'Generate MD5, SHA-1/256/512 and HMAC hashes online. Create checksums, verify strings, and compare algorithms quickly.',
  keywords: [
    'devtools',
    'hash generator',
    'md5 generator',
    'sha1 generator',
    'sha256 generator',
    'sha512 generator',
    'sha256 sha1 sha512',
    'hmac generator',
    'hash online',
    'generate checksum',
    'password hashing',
    'hash converter',
    'string hash',
    'hash algorithms',
    'hash function',
    'create hash',
    'verify hash',
    'hash comparison',
    'hash tool',
    'hash utility',
    'md5 sha1 sha256 sha512',
    'hmac md5',
    'hmac sha1',
    'hmac sha256',
    'hmac sha512',
    'hashing online',
    'quick hash generator',
    'fast hash tool',
    'secure hash',
    'data integrity',
    'hash value',
    'hash code',
    'hash string online',
    'hash generator free',
    'md5 checksum',
    'sha1 checksum',
    'sha256 checksum',
    'sha512 checksum',
    'hmac checksum',
    'hash creation',
    'hash verification',
    'hash algorithms comparison',
    'hash function online',
    'string to hash',
    'text to hash',
    'hash encoding',
    'hash validation',
    'hash processing',
    'hash generation tool',
    'online hash utility',
    'free hash generator',
  ],
  openGraph: {
    title: en.Tools.Hash.Name,
    description: 'Generate MD5, SHA-1/256/512 and HMAC hashes online. Create checksums, verify strings, and compare algorithms quickly.'
  },
  twitter: {
    title: en.Tools.Hash.Name,
    description: 'Generate MD5, SHA-1/256/512 and HMAC hashes online. Create checksums, verify strings, and compare algorithms quickly.'
  },
};

export default function HashPage() {
  return (
    <HashContent />
  );
}
