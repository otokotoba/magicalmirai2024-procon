import { Gltf } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export function Stage(): JSX.Element {
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <Gltf src="/stage-transformed.glb" />
    </RigidBody>
  );
}
