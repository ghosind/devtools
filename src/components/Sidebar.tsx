"use client";

import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import NextLink from 'next/link';
import { tools } from '@/constants/tools';
import { useLang } from './LanguageProvider';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: Props) {
  const { t } = useLang();

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Box sx={{ width: 260 }} role="presentation" onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}>
        <List>
          <ListItemButton component={NextLink} href="/" onClick={onClose}>
            <ListItemText primary={t('Home')} />
          </ListItemButton>
          <Divider />
          {tools.map((tool) => (
            <ListItemButton
              key={tool.key}
              component={NextLink}
              href={tool.href}
              onClick={onClose}
            >
              <ListItemText primary={t(tool.title)} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
