import { CloneProps, Gltf } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

type GltfProps = Omit<JSX.IntrinsicElements['group'], 'children'> &
  Omit<CloneProps, 'object'>;

export function World(props: GltfProps): JSX.Element {
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <Gltf {...props} src="/world-transformed.glb" castShadow receiveShadow />
    </RigidBody>
  );
}
