'use client';

import { Box } from '@mui/material';

import { Player } from '@/components/text-alive/Player';

export default function Home(): JSX.Element {
  return (
    <Box
      component="main"
      sx={{
        margin: 0,
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Player />
      <Box id="media" sx={{ display: 'none' }} />
    </Box>
  );
}
