'use client';

import { useEffect, useState } from 'react';
import {
  Player,
  PlayerAppListener,
  PlayerEventListener,
} from 'textalive-app-api';

import { TextAlivePlayerControls } from './TextAlivePlayerControls';

const SONG_URL = 'https://piapro.jp/t/xEA7/20240202002556';
const TIME_DELTA = 50;

export function TextAlivePlayer(): JSX.Element {
  const [player, setPlayer] = useState<Player>();
  const [loading, setLoading] = useState<boolean>(true);
  const [text, setText] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const player = new Player({
      app: { token: 'ihuwWjJtf00zXY5a' },
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
        setProgress((now / player.video.duration) * 100);

        const withDelata = now + TIME_DELTA;
        const current = player.video.findWord(withDelata + TIME_DELTA);

        if (current === null) {
          setText('');
        } else if (current.startTime < withDelata) {
          setText(current.text);
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
  }, []);

  return (
    <>
      <p>{text}</p>
      <TextAlivePlayerControls
        {...{ player, loading, progress, setProgress }}
      />
    </>
  );
}
