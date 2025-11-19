import '@/styles/globals.css';
import Providers from '@/components/Providers';
import Layout from '@/components/Layout';

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
      <body>
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
