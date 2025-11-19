"use client";

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Link, IconButton } from '@mui/material';
import Icon from '@mui/material/Icon';
import NextLink from 'next/link';
import Sidebar from './Sidebar';
import LocaleSelector from './LocaleSelector';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setOpen(true)} sx={{ mr: 2 }}>
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant="h6" style={{ flex: 1 }}>
            <Link href="/" color="inherit" underline="none" component={NextLink}>
              DevTools
            </Link>
          </Typography>
          <LocaleSelector />
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      <Sidebar open={open} onClose={() => setOpen(false)} />
    </>
  );
}
