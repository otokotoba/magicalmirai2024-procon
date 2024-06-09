'use client';

import { Box } from '@mui/material';

import { TextAlivePlayer } from '@/components/TextAlivePlayer';

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
      <TextAlivePlayer />
      <Box id="media" sx={{ display: 'none' }} />
    </Box>
  );
}
