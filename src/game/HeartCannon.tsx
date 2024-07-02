import { useGLTF } from '@react-three/drei';
import { Object3DProps } from '@react-three/fiber';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { useEffect, useRef, useState } from 'react';
import { Mesh, MeshStandardMaterial } from 'three';
import { GLTF } from 'three-stdlib';

import { CameraFollower } from './CameraFollower';
import { HeartShot, HeartShotProps } from './HeartShot';
import { useAppStore } from '../stores/AppStoreProvider';

type HeartCanonProps = {
  shotNum: number;
} & Omit<HeartShotProps, 'root'> &
  Omit<Object3DProps, 'ref' | 'type'>;

type GLTFResult = GLTF & {
  nodes: {
    Subwoofer: Mesh;
  };
  materials: {
    ['AC.004']: MeshStandardMaterial;
  };
};

const PATH = '/speaker.glb';

useGLTF.preload(PATH);

export function HeartCannon({
  shotNum,
  target,
  ...props
}: HeartCanonProps): JSX.Element {
  const { nodes, materials } = useGLTF(PATH) as GLTFResult;

  const root = useRef<RapierRigidBody>(null);
  const playing = useAppStore(state => state.playing);

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
      <RigidBody colliders={false} density={1} ref={root} {...props}>
        <CameraFollower condition={playing}>
          <mesh
            geometry={nodes.Subwoofer.geometry}
            material={materials['AC.004']}
          />
        </CameraFollower>
      </RigidBody>
      {keys.map(key => {
        return (
          <HeartShot
            key={key}
            root={root}
            offset={[0, 0.5, 0]}
            target={target}
          />
        );
      })}
    </>
  );
}
