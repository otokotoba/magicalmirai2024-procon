import { useLoader } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
// eslint-disable-next-line import/extensions
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader.js';

export function RacingMiku(props: JSX.IntrinsicElements['group']): JSX.Element {
  const mesh = useLoader(MMDLoader, '/mmd/racing-miku.pmx');

  return (
    <RigidBody colliders="cuboid">
      <group {...props}>
        <primitive object={mesh} />
      </group>
    </RigidBody>
  );
}

useLoader.preload(MMDLoader, '/mmd/racing-miku.pmx');
