import React from 'react';
import { Plane } from '@react-three/drei';
import '../materials/Wireframe';
import { Vector3 } from 'three';
import { usePlane } from '@react-three/cannon';
import { ThreeArgs, ThreeRotation, ThreeVector3 } from '../@types/three';

const WireframePlane = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  args = [100, 100, 100],
  color = [0, 1, 0],
  density = 10,
}: {
  position?: ThreeVector3;
  args?: ThreeArgs;
  rotation?: ThreeRotation;
  color?: string | number[] | Vector3;
  density?: number;
}) => {
  const [ref] = usePlane(() => ({
    type: 'Dynamic',
    // @ts-ignore
    rotation,
    //@ts-ignore
    position,
  }));

  return (
    <Plane ref={ref} args={args} position={position} rotation={rotation}>
      {/* @ts-ignore */}
      <wireframeMaterial density={density} attach='material' color={color} />
    </Plane>
  );
};

export default WireframePlane;
