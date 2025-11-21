'use client';

import { Box, Divider, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import NextLink from 'next/link';
import { tools } from '@/constants/tools';
import { useLang } from './LanguageProvider';

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { t } = useLang();

  return (
    <Drawer
      anchor='left'
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
    >
      <Box
        sx={{ width: 260 }}
        role='presentation'
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onClose();
          }
        }}
      >
        <List>
          <ListItemButton component={NextLink} href='/' onClick={onClose}>
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
