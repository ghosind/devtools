import '@/styles/globals.css';
import Providers from '@/components/Providers';
import Layout from '@/components/Layout';
import { FOOTER_HEIGHT } from '@/constants/ui';
import en from '@/translations/en.json';

export const metadata = {
  title: {
    default: en.Name,
    template: `%s - ${en.Name}`
  },
  description: en.Description,
  keywords: ['devtools'],
  openGraph: {
    title: {
      default: en.Name,
      template: `%s - ${en.Name}`
    },
    description: en.Description
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: en.Name,
      template: `%s - ${en.Name}`
    },
    description: en.Description,
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
