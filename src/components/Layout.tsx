import React from 'react';
import Container from '@mui/material/Container';
import Header from './Header';
import Footer from './Footer';
import { FOOTER_HEIGHT } from '@/constants/ui';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <Container
        className="container"
        sx={{
          paddingTop: 4,
          paddingBottom: `calc(${FOOTER_HEIGHT + 24}px + env(safe-area-inset-bottom))`,
        }}
      >
        {children}
      </Container>
      <Footer />
    </div>
  );
}
