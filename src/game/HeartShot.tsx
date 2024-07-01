import { useGLTF } from '@react-three/drei';
import { useFrame, Vector3 as Vector3Like } from '@react-three/fiber';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Group, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { GLTF } from 'three-stdlib';

import { useAppStore } from '@/stores/AppStoreProvider';

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
  target?: RefObject<RapierRigidBody>;
};

const PATH = '/heart.gltf';

useGLTF.preload(PATH);

export const HeartShot = function HeartShot({
  root,
  target,
}: HeartShotProps): JSX.Element {
  const { nodes, materials } = useGLTF(PATH) as GLTFResult;

  const objRef = useRef<Group>(null);
  const [cameraPos, objPos] = [new Vector3(), new Vector3()];

  useFrame(state => {
    if (!objRef.current) return;

    state.camera.getWorldPosition(cameraPos);
    objRef.current.getWorldPosition(objPos);

    objRef.current.lookAt(cameraPos.x, objPos.y, cameraPos.z);
  });

  const ref = useRef<RapierRigidBody>(null);
  const [fired, setFired] = useState(false);
  const beat = useAppStore(state => state.beat);

  useEffect(() => {
    if (!ref.current || !beat || fired) return;

    if (target?.current) {
      const pos = target.current.translation();
      const impulse = new Vector3(pos.x, pos.y, pos.z).normalize();
      impulse.set(impulse.x, 0.15, impulse.z).multiplyScalar(20);

      ref.current.applyImpulse(impulse, true);
    }

    setTimeout(() => setFired(true), 5000);
  }, [beat, fired, target]);

  const position = useMemo<Vector3Like>(() => {
    if (!root.current) return [0, 0, 0];

    const pos = root.current.translation();
    const offset = [-2, 2, 0];

    return [pos.x + offset[0], pos.y + offset[1], pos.z + offset[2]];
  }, [root]);

  return (
    !fired && (
      <RigidBody colliders="ball" density={0.5} position={position} ref={ref}>
        <group ref={objRef}>
          <mesh
            geometry={nodes.heart_teamRed.geometry}
            material={materials['Red.015']}
            rotation={[Math.PI / 2, 0, 0]}
          />
        </group>
      </RigidBody>
    )
  );
};
