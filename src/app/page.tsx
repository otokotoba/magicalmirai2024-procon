'use client';

import { Box, ThemeProvider } from '@mui/material';

import { theme } from './theme';
import { Description } from '../game/Description';
import { Player } from '../text-alive/Player';

export default function Home(): JSX.Element {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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
        {isMobile ? (
          <Box
            sx={{
              height: '100%',
              p: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: `linear-gradient(to right bottom, ${theme.subPalette.primary} 0%, ${theme.subPalette.secondary} 100%)`,
            }}
          >
            <Description isMobile={isMobile} />
          </Box>
        ) : (
          <>
            <Player />
            <Box id="media" sx={{ display: 'none' }} />
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}
