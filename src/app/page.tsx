'use client';

import { Box } from '@mui/material';

import { TextAlivePlayer } from '@/components/TextAlivePlayer';

export default function Home(): JSX.Element {
  return (
    <Box
      component="main"
      sx={{
        margin: 0,
        display: 'flex',
        flexDirection: ' column',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <h1>Hello, World</h1>
      <TextAlivePlayer />
      <Box id="media" sx={{ display: 'none' }} />
    </Box>
  );
}
