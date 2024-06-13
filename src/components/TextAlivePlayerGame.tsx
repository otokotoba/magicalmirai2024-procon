import { PointerLockControls, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { VSMShadowMap } from 'three';

import { World } from '@/components/game/World';

export function TextAlivePlayerGame(): JSX.Element {
  return (
    <Canvas
      shadows
      camera={{ fov: 70, near: 0.1, far: 1000 }}
      resize={{ debounce: 50 }}
      dpr={window.devicePixelRatio}
      onCreated={state => {
        state.gl.shadowMap.type = VSMShadowMap;
      }}
    >
      <Sky sunPosition={[0, 10, 0]} />
      <ambientLight intensity={0.2} />
      <directionalLight
        color={0xffffff}
        intensity={2}
        position={[0, 20, 0]}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-radius={4}
        shadow-bias={-0.0001}
      >
        <orthographicCamera
          attach={'shadow-camera'}
          left={-30}
          right={30}
          top={30}
          bottom={-30}
        />
      </directionalLight>
      <hemisphereLight
        color={0x8dc1de}
        groundColor={0x00668d}
        intensity={1.5}
        position={[0, 1, 0]}
      />

      <World />

      <PointerLockControls />
    </Canvas>
  );
}
