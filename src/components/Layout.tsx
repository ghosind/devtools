"use client";

import React from 'react';
import { AppBar, Toolbar, Typography, Select, MenuItem, Container, Link } from '@mui/material';
import { useLang } from './LanguageProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { locale, setLocale, t } = useLang();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
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
      <Container className="container" sx={{ paddingTop: 4 }}>{children}</Container>
    </div>
  );
}
