'use client';

import { Box, Stack } from '@mui/material';
import { useEffect, useRef } from 'react';
import {
  PlayerAppListener,
  PlayerEventListener,
  Player as TextAlivePlayer,
} from 'textalive-app-api';

import { PlayerControls } from './PlayerControls';
import { PlayerScreen } from './PlayerScreen';
import { useAppStore } from '../stores/AppStoreProvider';

const SONG_URL = 'https://piapro.jp/t/xEA7/20240202002556';
const TIME_DELTA = 50;

export function Player(): JSX.Element {
  const [
    setPlayer,
    setLoading,
    setPlaying,
    setLyrics,
    setBeat,
    setProgress,
    showControls,
  ] = useAppStore(state => [
    state.setPlayer,
    state.setLoading,
    state.setPlaying,
    state.setLyrics,
    state.setBeat,
    state.setProgress,
    state.showControls,
  ]);

  useEffect(() => {
    const player = new TextAlivePlayer({
      app: { token: 'ihuwWjJtf00zXY5a' },
      mediaElement: document.getElementById('media'),
    });

    const playerAppListener: PlayerAppListener = {
      onAppReady: async app => {
        if (!app.managed) {
          // The Marks / 2ouDNS
          await player.createFromSongUrl(SONG_URL, {
            video: {
              // 音楽地図訂正履歴
              beatId: 4592300,
              chordId: 2727640,
              repetitiveSegmentId: 2824331,
              // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FxEA7%2F20240202002556
              lyricId: 59420,
              lyricDiffId: 13967,
            },
          });
        }
      },
    };

    const playerEventListener: PlayerEventListener = {
      onTimerReady: () => {
        setPlayer(player);
        setLoading(false);
      },
      onTimeUpdate: now => {
        const progress = (now / player.video.duration) * 100;
        setProgress(progress);

        if (progress === 100) {
          setPlaying(false);
        }

        const withDelata = now + TIME_DELTA;
        const currentPhrase = player.video.findPhrase(withDelata + TIME_DELTA);
        const currentWord = player.video.findWord(withDelata + TIME_DELTA);

        if (currentPhrase === null) {
          setLyrics({ phrase: '', word: '' });
        } else if (
          currentPhrase.startTime < withDelata ||
          currentWord.startTime < withDelata
        ) {
          setLyrics({ phrase: currentPhrase.text, word: currentWord.text });
        }

        const beat = player.findBeat(withDelata + TIME_DELTA);

        if (
          beat.startTime < withDelata &&
          withDelata - beat.startTime < TIME_DELTA * 4
        ) {
          setBeat({
            startTime: Math.floor(
              new Date().getTime() - (withDelata - beat.startTime)
            ),
            globalIndex: beat.index,
            localIndex: beat.position,
          });
        } else {
          setBeat({ startTime: -1, globalIndex: -1, localIndex: -1 });
        }
      },
    };

    const listener = {
      ...playerAppListener,
      ...playerEventListener,
    };

    player.addListener(listener);

    return () => {
      player.removeListener(listener);
    };
  }, [setBeat, setLoading, setLyrics, setPlayer, setPlaying, setProgress]);

  const stackRef = useRef<HTMLDivElement | null>(null);
  const screenRef = useRef<HTMLDivElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);
  const setCanvasHeight = useAppStore(state => state.setCanvasHeight);

  useEffect(() => {
    if (!stackRef.current || !screenRef.current || !controlsRef.current) return;

    const stackHeight = stackRef.current.clientHeight;
    const screenHeight = screenRef.current.clientHeight;
    const controlsHeight = controlsRef.current.clientHeight;

    if (showControls && stackHeight === screenHeight) {
      setCanvasHeight(stackHeight - controlsHeight);
    }
  }, [setCanvasHeight, showControls]);

  return (
    <Stack ref={stackRef} sx={{ height: '100%' }}>
      <Box ref={screenRef} sx={{ flexGrow: 1 }}>
        <PlayerScreen />
      </Box>
      <Box ref={controlsRef}>{showControls && <PlayerControls />}</Box>
    </Stack>
  );
}
