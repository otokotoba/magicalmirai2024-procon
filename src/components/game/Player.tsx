import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei';
import Ecctrl from 'ecctrl';

export const KEYMAP: KeyboardControlsEntry[] = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'run', keys: ['Shift'] },
];

export function Player(): JSX.Element {
  return (
    <KeyboardControls map={KEYMAP}>
      <Ecctrl
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
