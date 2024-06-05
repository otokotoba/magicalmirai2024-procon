'use client';

import { PlayArrowRounded, StopRounded } from '@mui/icons-material';
import {
  AppBar,
  Box,
  CircularProgress,
  IconButton,
  Toolbar,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { Player } from 'textalive-app-api';

type TextAlivePlayerControlsProps = {
  player?: Player;
  loading: boolean;
};

export function TextAlivePlayerControls({
  player,
  loading,
}: TextAlivePlayerControlsProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    if (!player) return;

    if (!player.isPlaying) {
      player.requestPlay();
      setIsPlaying(true);
    }

    if (player.isPlaying) {
      player.requestPause();
      setIsPlaying(false);
    }
  }, [player]);

  return (
    <Box>
      <AppBar position="fixed" color="info" sx={{ top: 'auto', buttom: 0 }}>
        <Toolbar>
          <Box sx={{ position: 'relative' }}>
            {loading && (
              <CircularProgress color="inherit" sx={{ position: 'absolute' }} />
            )}
            <IconButton
              disabled={loading}
              color="inherit"
              onClick={handleClick}
              sx={{ mr: 1 }}
            >
              {!isPlaying ? <PlayArrowRounded /> : <StopRounded />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
