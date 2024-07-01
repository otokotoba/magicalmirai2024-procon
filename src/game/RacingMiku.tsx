/* eslint-disable import/extensions */
import { useFrame, useLoader } from '@react-three/fiber';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { AnimationAction, AnimationClip } from 'three';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader.js';
import { AmmoPhysics } from 'three/examples/jsm/physics/AmmoPhysics.js';
import { MMDAnimationHelper } from 'three-stdlib';

import { CameraFollower } from './CameraFollower';
import { useAppStore } from '../stores/AppStoreProvider';

type AnimationName = 'dance' | 'blink';

const PATH = '/mmd/racing-miku.pmx';

useLoader.preload(MMDLoader, PATH);

export const RacingMiku = forwardRef<
  RapierRigidBody,
  JSX.IntrinsicElements['group']
>(
  // eslint-disable-next-line @typescript-eslint/typedef
  function RacingMiku(props, fref): JSX.Element {
    const mesh = useLoader(MMDLoader, PATH);
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

    return (
      animationHelper && (
        <RigidBody colliders="cuboid" density={2} ref={fref}>
          <CameraFollower condition={playing} {...props}>
            <primitive object={mesh} />
          </CameraFollower>
        </RigidBody>
      )
    );
  }
);
