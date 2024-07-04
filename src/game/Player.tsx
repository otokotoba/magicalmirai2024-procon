import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { RapierRigidBody } from '@react-three/rapier';
import Ecctrl, { EcctrlProps } from 'ecctrl';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Vector3 } from 'three';

import { HeartShot } from './HeartShot';
import { useAppStore } from '../stores/AppStoreProvider';
import { withinRange } from '../utils';

export const BEAT_RANGE = 50;
const SCORE_ON_PERFECT = 100;
const SCORE_ON_GOOD = 50;

export const KEYMAP: KeyboardControlsEntry[] = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'run', keys: ['Shift'] },
];

export const Player = forwardRef<RapierRigidBody, EcctrlProps>(
  // eslint-disable-next-line @typescript-eslint/typedef
  function Player(props, fref): JSX.Element {
    const setAlive = useAppStore(state => state.setAlive);
    const player = useRef<RapierRigidBody>(null);

    useFrame(() => {
      if (!player.current) return;

      if (
        !withinRange(
          player.current.translation(),
          [-40, 40],
          [-50, 0],
          [-60, 60]
        )
      ) {
        setAlive(false);
        setTimeout(() => setAlive(true), 50);
      }
    });

    useImperativeHandle(fref, () => player.current);

    const [keys, setKeys] = useState<string[]>([]);
    const [clickTime, setClickTime] = useState(-1);
    const [
      playing,
      beat,
      setTotalScore,
      setTimeDiff,
      increasePerfectCount,
      increaseGoodCount,
      increaseBadCount,
    ] = useAppStore(state => [
      state.playing,
      state.beat,
      state.setTotalScore,
      state.setTimeDiff,
      state.increasePerfectCount,
      state.increaseGoodCount,
      state.increaseBadCount,
    ]);

    useEffect(() => {
      const handleClick: Parameters<
        (typeof window)['addEventListener']
      >[1] = () => {
        if (!document.pointerLockElement) return;

        setKeys(prev => [...prev, `${new Date().getTime()}`]);

        if (clickTime < 0 && playing) {
          setClickTime(new Date().getTime());
        }
      };

      window.addEventListener('click', handleClick);

      return () => {
        window.removeEventListener('click', handleClick);
      };
    });

    useFrame(() => {
      if (beat.startTime < 0 || clickTime < 0) return;

      const timeDiff = clickTime - beat.startTime;

      if (Math.abs(timeDiff) <= BEAT_RANGE) {
        setTotalScore(SCORE_ON_PERFECT);
        increasePerfectCount();
      } else if (Math.abs(timeDiff) <= BEAT_RANGE * 2) {
        setTotalScore(SCORE_ON_GOOD);
        increaseGoodCount();
      } else {
        increaseBadCount();
      }

      setTimeDiff(timeDiff);
      setClickTime(-1);
    });

    const camera = useThree(state => state.camera);
    const direction = useMemo(() => new Vector3(), []);
    camera.getWorldDirection(direction);

    return (
      <>
        <KeyboardControls map={KEYMAP}>
          <Ecctrl
            ref={player}
            {...props}
            maxVelLimit={6}
            jumpVel={5}
            springK={0}
            autoBalance={false}
            // First-person view
            camInitDis={-2}
            camMinDis={-0.01}
            camFollowMult={100}
            turnVelMultiplier={1}
            turnSpeed={100}
            mode="CameraBasedMovement"
          />
        </KeyboardControls>

        {keys.map(key => (
          <HeartShot
            key={key}
            root={player}
            offset={[direction.x, direction.y, direction.z]}
          />
        ))}
      </>
    );
  }
);
