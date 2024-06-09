'use client';

import {
  PlayArrowRounded,
  StopRounded,
  Subtitles,
  SubtitlesOff,
} from '@mui/icons-material';
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
import { useCallback, useState } from 'react';

import { useAppStore } from './AppStoreProvider';

export function TextAlivePlayerControls(): JSX.Element {
  const player = useAppStore(state => state.player);
  const loading = useAppStore(state => state.loading);
  const [progress, setProgress] = useAppStore(state => [
    state.progress,
    state.setProgress,
  ]);
  const [showLyrics, setShowLyrics] = useAppStore(state => [
    state.showLyrics,
    state.setShowLyrics,
  ]);

  const [playing, setPlaying] = useState<boolean>(false);

  const handlePlay = useCallback(() => {
    if (!player) return;

    if (player.isPlaying) {
      player.requestPause();
      setPlaying(false);
    } else {
      player.requestPlay();
      setPlaying(true);
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

  const handleShowLirycs = useCallback(() => {
    if (showLyrics) setShowLyrics(false);
    else setShowLyrics(true);
  }, [setShowLyrics, showLyrics]);

  return (
    <AppBar color="info" sx={{ position: 'static' }}>
      <Toolbar sx={{ py: 1 }} variant="dense">
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <Slider
              disabled={loading}
              value={progress}
              sx={{
                color: '#fff',
                ml: 1,
                width: 'calc(100% - 16px)',
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
                onClick={handlePlay}
              >
                {!playing || progress === 100 ? (
                  <PlayArrowRounded />
                ) : (
                  <StopRounded />
                )}
              </IconButton>
            </Box>
          </Grid>

          <Grid item>
            <IconButton
              disabled={loading}
              color="inherit"
              onClick={handleShowLirycs}
            >
              {showLyrics ? <SubtitlesOff /> : <Subtitles />}
            </IconButton>
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
