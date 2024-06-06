'use client';

import { PlayArrowRounded, StopRounded } from '@mui/icons-material';
import {
  AppBar,
  Box,
  CircularProgress,
  IconButton,
  Slider,
  Toolbar,
} from '@mui/material';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Player } from 'textalive-app-api';

type TextAlivePlayerControlsProps = {
  player?: Player;
  loading: boolean;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
};

export function TextAlivePlayerControls({
  player,
  loading,
  progress,
  setProgress,
}: TextAlivePlayerControlsProps): JSX.Element {
  const [playing, setPlaying] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    if (!player) return;

    if (!player.isPlaying) {
      player.requestPlay();
      setPlaying(true);
    }

    if (player.isPlaying) {
      player.requestPause();
      setPlaying(false);
    }
  }, [player]);

  const handleChangeProgress = useCallback(
    (e: Event, value: number | number[]) => {
      if (!player) return;

      setProgress(value as number);
      player.requestMediaSeek(
        player.video.duration * ((value as number) / 100)
      );
    },
    [player, setProgress]
  );

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
              sx={{ mr: 2 }}
            >
              {!playing || progress === 100 ? (
                <PlayArrowRounded />
              ) : (
                <StopRounded />
              )}
            </IconButton>
          </Box>
          <Slider
            disabled={loading}
            value={progress}
            sx={{ color: '#fff', mr: 1 }}
            onChange={handleChangeProgress}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
