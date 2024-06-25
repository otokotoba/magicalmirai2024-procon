import { Vector } from '@dimforge/rapier3d-compat';
import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody } from '@react-three/rapier';
import Ecctrl, { EcctrlProps } from 'ecctrl';
import { useRef } from 'react';

import { useAppStore } from '../AppStoreProvider';

export const KEYMAP: KeyboardControlsEntry[] = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'run', keys: ['Shift'] },
];

type Range = [number, number];

const withinRange = (
  v3: Vector,
  xRange: Range,
  yRange: Range,
  zRange: Range
): boolean => {
  return (
    xRange[0] <= v3.x &&
    v3.x <= xRange[1] &&
    yRange[0] <= v3.y &&
    v3.y <= yRange[1] &&
    zRange[0] <= v3.z &&
    v3.z <= zRange[1]
  );
};

export function Player(props: EcctrlProps): JSX.Element {
  const setAlive = useAppStore(state => state.setAlive);
  const playerRef = useRef<RapierRigidBody | null>(null);

  useFrame(() => {
    if (!playerRef.current) return;

    if (
      !withinRange(
        playerRef.current.translation(),
        [-40, 40],
        [-50, 0],
        [-60, 60]
      )
    ) {
      setAlive(false);
      setTimeout(() => setAlive(true), 50);
    }
  });

  return (
    <KeyboardControls map={KEYMAP}>
      <Ecctrl
        ref={playerRef}
        {...props}
        maxVelLimit={6}
        jumpVel={5}
        springK={0}
        // First-person view
        camInitDis={-2}
        camMinDis={-0.01}
        camFollowMult={100}
        turnVelMultiplier={1}
        turnSpeed={100}
        mode="CameraBasedMovement"
      />
    </KeyboardControls>
  );
}
