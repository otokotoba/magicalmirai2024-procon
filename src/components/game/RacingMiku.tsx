/* eslint-disable import/extensions */
import { useFrame, useLoader } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimationAction, AnimationClip, Group, Vector3 } from 'three';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader.js';
import { AmmoPhysics } from 'three/examples/jsm/physics/AmmoPhysics.js';
import { MMDAnimationHelper } from 'three-stdlib';

import { useAppStore } from '../AppStoreProvider';

type AnimationName = 'dance' | 'blink';

export function RacingMiku(props: JSX.IntrinsicElements['group']): JSX.Element {
  const mesh = useLoader(MMDLoader, '/mmd/racing-miku.pmx');
  const [animationHelper, setAnimationHelper] =
    useState<MMDAnimationHelper | null>(null);

  useEffect(() => {
    (async () => {
      // necessary for MMDAnimationHelper
      await AmmoPhysics();
    })();
  }, []);

  useEffect(() => {
    const loader = new MMDLoader();
    const helper = new MMDAnimationHelper();

    const addAnimation = (
      animation: AnimationClip,
      name: AnimationName
    ): void => {
      animation.name = name;

      if (!mesh.animations.some(a => a.name === name)) {
        mesh.animations.push(animation);
      }
    };

    loader.loadAnimation('/mmd/dance.vmd', mesh, animation => {
      addAnimation(animation as AnimationClip, 'dance');

      loader.loadAnimation('/mmd/blink.vmd', mesh, animation => {
        addAnimation(animation as AnimationClip, 'blink');
        helper.add(mesh, { animation: mesh.animations });

        setAnimationHelper(helper);
      });
    });
  }, [mesh]);

  const playing = useAppStore(state => state.playing);

  const mixer = useMemo(
    () => animationHelper?.objects.get(mesh).mixer,
    [animationHelper, mesh]
  );
  const actions = useMemo(
    () =>
      Object.fromEntries(
        mesh.animations.map(a => [a.name, mixer.clipAction(a)])
      ) as { [name in AnimationName]: AnimationAction },
    [mesh.animations, mixer]
  );

  useFrame((state, delta) => {
    if (!animationHelper) return;

    if (!actions.blink.isRunning()) {
      actions.blink.play();
    }

    if (!playing) {
      actions.dance.timeScale = 0;
    } else if (!actions.dance.isRunning()) {
      actions.dance.timeScale = 1;
      actions.dance.play();
    }

    animationHelper.update(delta);
  });

  const ref = useRef<Group | null>(null);
  const [cameraPos, selfPos] = [new Vector3(), new Vector3()];

  useFrame(state => {
    if (!ref.current || !playing) return;

    state.camera.getWorldPosition(cameraPos);
    ref.current.getWorldPosition(selfPos);

    ref.current.lookAt(cameraPos.x, selfPos.y, cameraPos.z);
  });

  return (
    animationHelper && (
      <RigidBody colliders="cuboid" density={2}>
        <group {...props} ref={ref}>
          <primitive object={mesh} />
        </group>
      </RigidBody>
    )
  );
}

useLoader.preload(MMDLoader, '/mmd/racing-miku.pmx');
