import { useGLTF } from '@react-three/drei';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { RefObject, useEffect, useRef, useState } from 'react';
import { Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { GLTF } from 'three-stdlib';

import { CameraFollower } from './CameraFollower';
import { useAppStore } from '../stores/AppStoreProvider';

type GLTFResult = GLTF & {
  nodes: {
    heart_teamRed: Mesh;
  };
  materials: {
    ['Red.015']: MeshStandardMaterial;
  };
};

export type HeartShotProps = {
  root: RefObject<RapierRigidBody>;
  offset?: [x: number, y: number, z: number];
  target?: RefObject<RapierRigidBody>;
};

const PATH = '/heart.gltf';

useGLTF.preload(PATH);

export function HeartShot({
  root,
  offset = [0, 0, 0],
  target,
}: HeartShotProps): JSX.Element {
  const { nodes, materials } = useGLTF(PATH) as GLTFResult;

  const ref = useRef<RapierRigidBody>(null);
  const [visible, setVisible] = useState(true);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    if (!root.current || !ref.current || fired) return;

    const pos = root.current.translation();

    ref.current.setTranslation(
      { x: pos.x + offset[0], y: pos.y + offset[1], z: pos.z + offset[2] },
      true
    );
  }, [fired, offset, root]);


  useEffect(() => {
    if (!ref.current || fired) return;

    ref.current.setLinearDamping(2);

    if (target?.current) {
      const pos = target.current.translation();
      const vel = new Vector3(pos.x, pos.y, pos.z)
        .normalize()
        .multiplyScalar(40)
        .add({ x: 0, y: 30, z: 0 });

      ref.current.setLinvel(vel, true);
    }

    setFired(true);
    setTimeout(() => setVisible(false), 5000);
  }, [fired, target, visible]);

  return (
    visible && (
      <RigidBody colliders="cuboid" density={0.5} ref={ref}>
        <CameraFollower>
          <mesh
            geometry={nodes.heart_teamRed.geometry}
            material={materials['Red.015']}
            rotation={[Math.PI / 2, 0, 0]}
          />
        </CameraFollower>
      </RigidBody>
    )
  );
}
