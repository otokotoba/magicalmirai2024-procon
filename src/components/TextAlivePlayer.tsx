'use client';

import { useEffect, useState } from 'react';
import {
  IPlayerApp,
  Player,
  PlayerAppListener,
  PlayerEventListener,
} from 'textalive-app-api';

const SONG_URL = 'https://piapro.jp/t/xEA7/20240202002556';

export function TextAlivePlayer(): JSX.Element {
  const [player, setPlayer] = useState<Player>();
  const [app, setApp] = useState<IPlayerApp>();
  // const [word, setWord] = useState<string>('');

  useEffect(() => {
    const player = new Player({ app: { token: 'ihuwWjJtf00zXY5a' } });

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

          setApp(app);
        }
      },
    };

    const playerEventListener: PlayerEventListener = {
      onVideoReady: video => {
        let w = video.firstWord;
        console.log(w.text);

        // while (w) {
        //   w.animate = (now, unit) => {
        //     if (unit.contains(now)) {
        //       setWord(w.text);
        //     }
        //   };
        //   w = w.next;
        // }
      },
    };

    const listener = {
      ...playerAppListener,
      ...playerEventListener,
    };

    player.addListener(listener);
    setPlayer(player);

    return () => {
      player.removeListener(listener);
    };
  }, []);

  return (
    <>
      {player && app ? (
        <p>{`Ready: ${player.data.song.name}`}</p>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}
