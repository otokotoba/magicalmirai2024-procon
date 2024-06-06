'use client';

import { PlayArrowRounded, StopRounded } from '@mui/icons-material';
import {
  AppBar,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Slider,
  SliderValueLabelProps,
  Toolbar,
  Tooltip,
  Typography,
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

  const formatSliderValue = useCallback(
    (value: number) => {
      if (!player) return;

      const ms = player.video.duration * (value / 100);
      const s = Math.trunc((ms / 1000) % 60);
      const m = Math.trunc(ms / 1000 / 60);

      const pad = (i: number): string => {
        if (i < 10) return `0${i}`;
        else return `${i}`;
      };

      return `${pad(m)}:${pad(s)}`;
    },
    [player]
  );

  return (
    <Box>
      <AppBar position="fixed" color="info" sx={{ top: 'auto', buttom: 0 }}>
        <Toolbar sx={{ py: 1 }} variant="dense">
          <Grid container alignItems="center">
            <Grid item xs={12}>
              <Slider
                disabled={loading}
                value={progress}
                sx={{
                  color: '#fff',
                  ml: 1,
                  '& .MuiSlider-rail': {
                    width: 'calc(100% - 8px)',
                  },
                }}
                size="small"
                onChange={handleChangeProgress}
                slots={{
                  valueLabel: SliderValueLabel,
                }}
                valueLabelDisplay="auto"
                valueLabelFormat={formatSliderValue}
              />
            </Grid>

            <Grid item>
              <Box sx={{ position: 'relative' }}>
                {loading && (
                  <CircularProgress
                    color="inherit"
                    sx={{ position: 'absolute' }}
                  />
                )}
                <IconButton
                  disabled={loading}
                  color="inherit"
                  onClick={handleClick}
                >
                  {!playing || progress === 100 ? (
                    <PlayArrowRounded />
                  ) : (
                    <StopRounded />
                  )}
                </IconButton>
              </Box>
            </Grid>

            <Grid item mx={1}>
              {!loading && (
                <Typography variant="caption">
                  {`${formatSliderValue(progress)} / ${formatSliderValue(100)}`}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function SliderValueLabel({
  children,
  value,
}: SliderValueLabelProps): JSX.Element {
  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}
