import { Center, PointerLockControls, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Suspense, useCallback, useEffect, useRef } from 'react';
import { Color, VSMShadowMap } from 'three';

import { useAppStore } from '@/components/AppStoreProvider';
import { Player } from '@/components/game/Player';
import { Stage } from '@/components/game/Stage';

export function TextAlivePlayerGame(): JSX.Element {
  const setshowControls = useAppStore(state => state.setShowControls);
  const handleLock = useCallback(
    () => setshowControls(false),
    [setshowControls]
  );
  const handleUnLock = useCallback(
    () => setshowControls(true),
    [setshowControls]
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasHeight, setCanvasHeight] = useAppStore(state => [
    state.canvasHeight,
    state.setCanvasHeight,
  ]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const observer = new ResizeObserver(entries => {
      for (const e of entries) {
        if (!e.contentBoxSize || !e.borderBoxSize[0]) continue;
        setCanvasHeight(e.contentBoxSize[0].blockSize);
      }
    });
    observer.observe(canvasRef.current);
  }, [setCanvasHeight]);

  useEffect(() => {
    if (
      !canvasRef.current ||
      !canvasHeight ||
      canvasRef.current.clientHeight === canvasHeight
    )
      return;
    canvasRef.current.style.height = `${canvasHeight}px`;
  }, [canvasHeight]);

  return (
    <Canvas
      ref={canvasRef}
      shadows
      scene={{ background: new Color(0x000b1a) }}
      camera={{ fov: 70, near: 0.1, far: 1000 }}
      resize={{ debounce: 50 }}
      onCreated={state => {
        state.gl.shadowMap.type = VSMShadowMap;
        state.gl.setPixelRatio(window?.devicePixelRatio);
      }}
    >
      <Stars radius={400} />
      <ambientLight intensity={0.5} />
      <directionalLight
        color={0xffffff}
        intensity={2}
        position={[0, 50, 0]}
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
        color={0xbdbdbd}
        groundColor={0x000000}
        intensity={1.5}
        position={[0, 0, 0]}
      />
      <Suspense>
        <Physics gravity={[0, -30, 0]} colliders={false}>
          <Center>
            <Stage />
            <Player
              position={[-25, 0, 0]}
              camInitDir={{ x: 0, y: Math.PI / 2 }}
            />
          </Center>
        </Physics>
      </Suspense>

      <PointerLockControls
        selector="#game"
        onLock={handleLock}
        onUnlock={handleUnLock}
      />
    </Canvas>
  );
}
