import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import {
  RapierRigidBody,
  RigidBody,
  RigidBodyProps,
} from '@react-three/rapier';
import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { GLTF } from 'three-stdlib';

import { CameraFollower } from './CameraFollower';
import { toTuple } from '../utils';

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

  const camera = useThree(state => state.camera);
  const direction = useMemo(() => new Vector3(), []);

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
    } else {
      camera.getWorldDirection(direction);

      const vel = new Vector3(...toTuple(root.current.linvel()));
      const extra = vel.length() >= 1 ? Math.log(vel.length()) ** 2 : 0;

      direction
        .normalize()
        .multiplyScalar(40 + extra)
        .add({ x: 0, y: 20, z: 0 });

      ref.current.setLinvel(direction, true);
    }

    setFired(true);
    setTimeout(() => setVisible(false), 5000);
  }, [camera, direction, fired, root, target, visible]);

  const handleCollisionEnter: RigidBodyProps['onCollisionEnter'] =
    useCallback(() => {
      setTimeout(() => setVisible(false), 20);
    }, []);

  return (
    visible && (
      <RigidBody
        colliders="ball"
        density={1}
        ref={ref}
        onCollisionEnter={handleCollisionEnter}
      >
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
