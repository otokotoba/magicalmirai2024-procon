import { CloneProps, Gltf } from '@react-three/drei';

type GltfProps = Omit<JSX.IntrinsicElements['group'], 'children'> &
  Omit<CloneProps, 'object'>;

export function World(props: GltfProps): JSX.Element {
  return (
    <Gltf {...props} src="/world-transformed.glb" castShadow receiveShadow />
  );
}
