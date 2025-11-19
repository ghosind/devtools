import React from 'react';
import Container from '@mui/material/Container';
import Header from './Header';
import Footer, { FOOTER_HEIGHT } from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <Container
        className="container"
        sx={{ paddingTop: 4, paddingBottom: `${FOOTER_HEIGHT + 24}px` }}
      >
        {children}
      </Container>
      <Footer />
    </div>
  );
}
