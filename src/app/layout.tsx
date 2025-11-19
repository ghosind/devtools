import '@/styles/globals.css';
import Providers from '@/components/Providers';
import Layout from '@/components/Layout';
import { FOOTER_HEIGHT } from '@/constants/ui';

export const metadata = {
  title: 'DevTools',
  description: 'A collection of small developer utilities.',
  keywords: ['devtools', 'base64'],
  openGraph: {
    title: 'DevTools',
    description: 'A collection of small developer utilities.'
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
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
