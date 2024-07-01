import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Group, Vector3 } from 'three';

type CameraFollowerProps = {
  condition?: boolean;
} & JSX.IntrinsicElements['group'];

export function CameraFollower({
  children,
  condition = true,
  ...props
}: CameraFollowerProps): JSX.Element {
  const ref = useRef<Group>(null);
  const [cameraPos, selfPos] = [new Vector3(), new Vector3()];

  useFrame(state => {
    if (!ref.current || !condition) return;

    state.camera.getWorldPosition(cameraPos);
    ref.current.getWorldPosition(selfPos);

    ref.current.lookAt(cameraPos.x, selfPos.y, cameraPos.z);
  });

  return (
    <group ref={ref} {...props}>
      {children}
    </group>
  );
}
