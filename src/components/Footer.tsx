'use client';

import { Box, Link, Typography } from '@mui/material';
import { FOOTER_HEIGHT } from '@/constants/ui';

export default function Footer() {
  return (
    <Box
      component='footer'
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        height: FOOTER_HEIGHT,
        py: 1,
        textAlign: 'center',
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        zIndex: (theme) => theme.zIndex.appBar - 1,
      }}
    >
      <Typography variant='body2' color='text.secondary'>
        © {
          new Date().getFullYear()
        } <Link href='https://ghosind.com'>ghosind.com</Link>. All rights reserved.{' '}
      </Typography>
    </Box>
  );
}
