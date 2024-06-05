'use client';

import { useEffect, useState } from 'react';
import {
  Player,
  PlayerAppListener,
  PlayerEventListener,
} from 'textalive-app-api';

import { TextAlivePlayerControls } from './TextAlivePlayerControls';

const SONG_URL = 'https://piapro.jp/t/xEA7/20240202002556';

export function TextAlivePlayer(): JSX.Element {
  const [player, setPlayer] = useState<Player>();
  const [loading, setLoading] = useState<boolean>(true);
  const [text, setText] = useState<string>('');

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
        let current = player.video.firstWord;
        let hasNoNext = false;

        current.animate = now => {
          now += 50;
          if (current.startTime < now) {
            setText(current.text);
            current = current.next ?? ((hasNoNext = true), current);
          } else if (
            current.previous.endTime < now ||
            (hasNoNext && current.endTime < now)
          ) {
            setText('');
          }
        };

        setPlayer(player);
        setLoading(false);
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
      <TextAlivePlayerControls {...{ player, loading }} />
    </>
  );
}
