/* eslint-disable import/extensions */
import { useFrame, useLoader } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useEffect, useState } from 'react';
import { AnimationClip } from 'three';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader.js';
import { AmmoPhysics } from 'three/examples/jsm/physics/AmmoPhysics.js';
import { MMDAnimationHelper } from 'three-stdlib';

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

    loader.loadAnimation('/mmd/dance.vmd', mesh, a => {
      a.name = 'dance';
      if (!mesh.animations.some(a => a.name === 'dance')) {
        mesh.animations.push(a as AnimationClip);
      }

      helper.add(mesh, { animation: a as AnimationClip });
      setAnimationHelper(helper);
    });
  }, [mesh]);

  useFrame((state, delta) => {
    if (!animationHelper) return;

    animationHelper.update(delta);
  });

  return (
    animationHelper && (
      <RigidBody colliders="cuboid" density={2}>
        <group {...props}>
          <primitive object={mesh} />
        </group>
      </RigidBody>
    )
  );
}

useLoader.preload(MMDLoader, '/mmd/racing-miku.pmx');
