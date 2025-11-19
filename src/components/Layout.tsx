"use client";

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Select, MenuItem, Container, Link, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLang } from './LanguageProvider';
import Sidebar from './Sidebar';
import Footer, { FOOTER_HEIGHT } from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { locale, setLocale } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setOpen(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flex: 1 }}>
            <Link href="/" color="inherit" underline="none">
              DevTools
            </Link>
          </Typography>
          <Select
            value={locale}
            onChange={(e) => setLocale(String(e.target.value))}
            variant="standard"
            sx={{ color: 'white' }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="zh">中文</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <Container className="container" sx={{ paddingTop: 4, paddingBottom: `${FOOTER_HEIGHT + 24}px` }}>{children}</Container>
      <Footer />
    </div>
  );
}
