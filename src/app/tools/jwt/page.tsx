import en from '@/translations/en.json';
import JwtContent from './content';

export const metadata = {
  title: en.Tools.JWT.Name,
  description: 'Inspect, decode and verify JSON Web Tokens (JWT) online — view header and payload, and verify HS256/RS256 signatures quickly.',
  keywords: [
    'devtools',
    'jwt inspector',
    'jwt decoder',
    'jwt verifier',
    'json web token',
    'decode jwt',
    'verify jwt signature',
    'hs256',
    'jwt online',
    'jwt tool',
    'jwt viewer',
    'jwt parser',
    'jwt analyzer',
    'jwt debug',
    'jwt token',
    'jwt generator',
    'jwt validation',
    'jwt header payload',
    'jwt signature check',
    'jwt decode online',
    'jwt verify online',
    'jwt decode verify',
    'jwt hs256',
  ],
  openGraph: {
    title: en.Tools.JWT.Name,
    description: 'Inspect, decode and verify JSON Web Tokens (JWT) online — view header and payload, and verify HS256/RS256 signatures quickly.'
  },
  twitter: {
    title: en.Tools.JWT.Name,
    description: 'Inspect, decode and verify JSON Web Tokens (JWT) online — view header and payload, and verify HS256/RS256 signatures quickly.'
  },
};

export default function Page() {
  return <JwtContent />;
}
