import { Center, Loader, PointerLockControls, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics, RapierRigidBody } from '@react-three/rapier';
import { Suspense, useCallback, useEffect, useRef } from 'react';
import { Color, VSMShadowMap } from 'three';

import { Lyrics } from './Lyrics';
import { Player } from './Player';
import { RacingMiku } from './RacingMiku';
import { Stage } from './Stage';
import { useAppStore } from '../stores/AppStoreProvider';

export function Game(): JSX.Element {
  const [setShowControls, canvasHeight, setCanvasHeight] = useAppStore(
    state => [state.setShowControls, state.canvasHeight, state.setCanvasHeight]
  );

  const handleLock = useCallback(() => {
    setShowControls(false);
  }, [setShowControls]);

  const handleUnLock = useCallback(() => {
    setShowControls(true);
  }, [setShowControls]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  const alive = useAppStore(state => state.alive);

  const player = useRef<RapierRigidBody>(null);

  return (
    <>
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
        <fog attach="fog" args={[0x000000, 0, 100]} />
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
          <Physics gravity={[0, -40, 0]} colliders={false}>
            <Center>
              <Stage />

              <Lyrics />

              <RacingMiku
                position={[0, -8, 0]}
                scale={0.2}
                rotation={[0, -Math.PI / 2, 0]}
              />

              {alive && (
                <Player
                  position={[-25, 0, 0]}
                  camInitDir={{ x: 0, y: Math.PI / 2 }}
                  capsuleHalfHeight={1}
                  capsuleRadius={0.4}
                  ref={player}
                />
              )}
            </Center>
          </Physics>
        </Suspense>

        <PointerLockControls
          selector="#game"
          onLock={handleLock}
          onUnlock={handleUnLock}
        />
      </Canvas>

      <Loader />
    </>
  );
}
