import { Plane } from '@react-three/drei';
import React from 'react';
import WireframePlane from '../visuals/WireframePlane';

const WireframeGround = () => {
  return (
    <WireframePlane
      args={[100, 100, 100]}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    />
  );
};

export default WireframeGround;
