import { Ray } from '@dimforge/rapier3d-compat';
import { KeyboardControlsEntry, useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {
  CapsuleArgs,
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
  useRapier,
} from '@react-three/rapier';
import { useRef } from 'react';
import { Vector3 } from 'three';

enum Commands {
  forward = 'forward',
  backward = 'backward',
  left = 'left',
  right = 'right',
  jump = 'jump',
}

export const KEYMAP: KeyboardControlsEntry<Commands>[] = [
  { name: Commands.forward, keys: ['ArrowUp', 'KeyW'] },
  { name: Commands.backward, keys: ['ArrowDown', 'KeyS'] },
  { name: Commands.left, keys: ['ArrowLeft', 'KeyA'] },
  { name: Commands.right, keys: ['ArrowRight', 'KeyD'] },
  { name: Commands.jump, keys: ['Space'] },
];

const SPEED = 5;
const direction = new Vector3();
const frontVector = new Vector3();
const sideVector = new Vector3();
const capsuleArgs: CapsuleArgs = [0.5, 0.25];

export function Player(): JSX.Element {
  const ref = useRef<RapierRigidBody | null>(null);
  const { world } = useRapier();
  const [, get] = useKeyboardControls<Commands>();

  useFrame(state => {
    if (!ref.current) return;
    const { forward, backward, left, right, jump } = get();
    const vel = ref.current.linvel();

    state.camera.position.copy(ref.current.translation());

    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(state.camera.rotation);
    ref.current.setLinvel({ x: direction.x, y: vel.y, z: direction.z }, true);

    // eslint-disable-next-line @react-three/no-new-in-loop
    const ray = new Ray(ref.current.translation(), { x: 0, y: -1, z: 0 });
    const hit = world.castRay(ray, 1, false);
    const grounded =
      hit && hit.collider && hit.toi < capsuleArgs[0] + capsuleArgs[1];
    if (jump && grounded) ref.current.setLinvel({ x: 0, y: 7.5, z: 0 }, true);
  });

  return (
    <RigidBody
      ref={ref}
      colliders={false}
      mass={1}
      type="dynamic"
      position={[0, 10, 0]}
      enabledRotations={[false, false, false]}
    >
      <CapsuleCollider args={capsuleArgs} />
    </RigidBody>
  );
}
