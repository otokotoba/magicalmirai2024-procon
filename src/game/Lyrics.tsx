import { Center, Float, Text3D, useFont } from '@react-three/drei';
import { useEffect, useState } from 'react';

import { useAppStore } from '../stores/AppStoreProvider';

const FONT_PATH = '/NotoSerifJP_Regular.json';

useFont.preload(FONT_PATH);

export function Lyrics(): JSX.Element {
  const lyrics = useAppStore(state => state.lyrics);
  const [words, setWords] = useState<string[]>([]);
  const font = useFont(FONT_PATH);

  useEffect(() => {
    setWords([]);
  }, [lyrics.phrase]);

  useEffect(() => {
    if (lyrics.word !== '') {
      setWords(prev => [...prev, lyrics.word]);
    }
  }, [lyrics.word]);

  return (
    <Center
      // pass a new callback so that centering is done on every rendering
      onCentered={() => {}}
    >
      <Float>
        <Text3D font={font.data} rotation={[0, -Math.PI / 2, 0]}>
          {words}
          <meshNormalMaterial />
        </Text3D>
      </Float>
    </Center>
  );
}
