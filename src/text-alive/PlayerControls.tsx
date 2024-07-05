'use client';

import {
  HelpRounded,
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
import { useCallback } from 'react';

import { useAppStore } from '../stores/AppStoreProvider';

export function PlayerControls(): JSX.Element {
  const [
    player,
    loading,
    playing,
    setPlaying,
    done,
    progress,
    setProgress,
    showLyrics,
    setShowLyrics,
    toggleShowDescription,
  ] = useAppStore(state => [
    state.player,
    state.loading,
    state.playing,
    state.setPlaying,
    state.done,
    state.progress,
    state.setProgress,
    state.showLyrics,
    state.setShowLyrics,
    state.toggleShowDescription,
  ]);

  const handlePlay = useCallback(() => {
    if (!player) return;

    if (player.isPlaying) {
      player.requestPause();
      setPlaying(false);
    } else {
      player.requestPlay();
      setPlaying(true);
    }
  }, [player, setPlaying]);

  const handleChangeProgress = useCallback(
    (e: Event, value: number | number[]) => {
      if (!player) return;

      setProgress(value as number);

      player.startVideoSeek();
      player.requestMediaSeek(
        player.video.duration * ((value as number) / 100)
      );
      player.endVideoSeek();
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

  const handleShowDescription = useCallback(() => {
    toggleShowDescription();
  }, [toggleShowDescription]);

  return (
    <AppBar color="info" sx={{ position: 'static' }}>
      <Toolbar sx={{ py: 1 }} variant="dense">
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <Slider
              disabled={loading || done}
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
                disabled={loading || done}
                color="inherit"
                onClick={handlePlay}
              >
                {!playing ? <PlayArrowRounded /> : <StopRounded />}
              </IconButton>
            </Box>
          </Grid>

          <Grid item>
            <IconButton
              disabled={loading}
              color="inherit"
              onClick={handleShowLirycs}
            >
              {showLyrics ? <Subtitles /> : <SubtitlesOff />}
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton color="inherit" onClick={handleShowDescription}>
              <HelpRounded />
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
