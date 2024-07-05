'use client';

import { Box, ThemeProvider } from '@mui/material';

import { theme } from './theme';
import { Player } from '../text-alive/Player';

export default function Home(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
