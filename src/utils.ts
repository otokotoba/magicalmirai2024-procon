import { Vector } from '@dimforge/rapier3d-compat';

type Range = [min: number, max: number];

export const withinRange = (
  v: Vector,
  xRange: Range,
  yRange: Range,
  zRange: Range
): boolean => {
  return (
    xRange[0] <= v.x &&
    v.x <= xRange[1] &&
    yRange[0] <= v.y &&
    v.y <= yRange[1] &&
    zRange[0] <= v.z &&
    v.z <= zRange[1]
  );
};

export const toTuple = (v: Vector): [x: number, y: number, z: number] => [
  v.x,
  v.y,
  v.z,
];
