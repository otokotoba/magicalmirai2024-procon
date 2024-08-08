'use client';

import {
  Box,
  LinearProgress,
  Stack,
  ThemeProvider,
  Typography,
  useTheme,
} from '@mui/material';
import { PropsWithChildren, useEffect, useState } from 'react';

import { theme } from './theme';
import { Description } from '../game/Description';
import { Player } from '../text-alive/Player';

export default function Home(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    setLoading(false);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="main"
        sx={{
          margin: 0,
          alignItems: 'center',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {loading ? (
          <Container>
            <Stack spacing={1} sx={{ width: '100%', maxWidth: '800px' }}>
              <Typography variant="caption" alignSelf="center">
                読み込み中
              </Typography>
              <LinearProgress />
            </Stack>
          </Container>
        ) : isMobile ? (
          <Container>
            <Description isMobile={isMobile} />
          </Container>
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

function Container(props: PropsWithChildren): JSX.Element {
  const theme = useTheme();

  return (
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
      {props.children}
    </Box>
  );
}
