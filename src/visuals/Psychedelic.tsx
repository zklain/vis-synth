import { Plane } from '@react-three/drei';
import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Euler } from 'three/src/math/Euler';
import '../materials/Psychedelic';

const PsychedelicPlane = ({
  position,
  args = [50, 50],
  rotation = [0, 0, 0],
}: {
  args?:
    | [
        (number | undefined)?,
        (number | undefined)?,
        (number | undefined)?,
        (number | undefined)?
      ]
    | undefined;
  position?: THREE.Vector3 | [x: number, y: number, y: number];
  rotation?:
    | THREE.Vector3
    | Euler
    | [x: number, y: number, z: number, order?: string | undefined];
}) => {
  const ref = useRef();
  useFrame((state, delta) => {
    //@ts-ignore
    ref.current.material.time += delta;
  });

  return (
    <Plane
      ref={ref}
      position={position}
      // @ts-ignore
      rotation={rotation}
      args={args}>
      {/* @ts-ignore */}
      <psychedelicMaterial metalness={10} />
    </Plane>
  );
};

export default PsychedelicPlane;
