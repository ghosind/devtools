import EmotionRegistry from '@/components/EmotionRegistry';
import Layout from '@/components/Layout';
import Providers from '@/components/Providers';
import { FOOTER_HEIGHT } from '@/constants/ui';
import '@/styles/globals.css';
import en from '@/translations/en.json';

export const metadata = {
  title: {
    default: en.Name,
    template: `%s - ${en.Name}`
  },
  description: 'DevTools — free online developer utilities: Base64, JWT, Hash, QRCode, MongoDB ObjectID tools, URL and time converters.',
  keywords: [
    'devtools',
    'developer tools',
    'online developer tools',
    'encode decode tools',
    'utility tools',
    'web utilities',
    'developer utilities'
  ],
  openGraph: {
    title: {
      default: en.Name,
      template: `%s - ${en.Name}`
    },
    description: 'DevTools — free online developer utilities: Base64, JWT, Hash, QRCode, MongoDB ObjectID tools, URL and time converters.'
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: en.Name,
      template: `%s - ${en.Name}`
    },
    description: 'DevTools — free online developer utilities: Base64, JWT, Hash, QRCode, MongoDB ObjectID tools, URL and time converters.',
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ paddingBottom: `calc(${FOOTER_HEIGHT}px + env(safe-area-inset-bottom))` }}>
        <EmotionRegistry>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </EmotionRegistry>
      </body>
    </html>
  );
}