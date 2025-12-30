import TotpContent from './content';
import en from '@/translations/en.json';

export const metadata = {
  title: en.Tools.TOTP.Name,
  description: 'Generate Time-based One-Time Passwords (TOTP) for two-factor authentication.',
  keywords: ['totp', 'otp', 'two-factor', '2fa', 'authenticator'],
  openGraph: {
    title: en.Tools.TOTP.Name,
    description: 'Generate Time-based One-Time Passwords (TOTP) for two-factor authentication.'
  },
  twitter: {
    card: 'summary_large_image',
    title: en.Tools.TOTP.Name,
    description: 'Generate Time-based One-Time Passwords (TOTP) for two-factor authentication.'
  },
}

export default function Page() {
  return <TotpContent />
}
