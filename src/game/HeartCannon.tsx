import { useEffect, useState } from 'react';

import { HeartShot, HeartShotProps } from './HeartShot';
import { useAppStore } from '../stores/AppStoreProvider';

type HeartCanonProps = {
  shotNum: number;
} & HeartShotProps;

export function HeartCannon({
  shotNum,
  ...heartShotProps
}: HeartCanonProps): JSX.Element {
  const [keys, setKeys] = useState<string[]>([]);
  const beat = useAppStore(state => state.beat);

  useEffect(() => {
    if (beat) {
      const now = new Date().getTime();
      setKeys(prev => [
        ...prev,
        ...Array(shotNum).map((v, i) => `${now}-${i}`),
      ]);
    }
  }, [beat, shotNum]);

  return (
    <>
      {keys.map(key => {
        return <HeartShot key={key} {...heartShotProps} />;
      })}
    </>
  );
}
