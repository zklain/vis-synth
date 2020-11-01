import { Box } from '@react-three/drei';
import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import THREE from 'three';

const SkyBox = () => {
  const ref = useRef();

  useFrame((state, delta) => {
    //@ts-ignore
    ref.current.material.time += delta;
  });

  return (
    <>
      {/* @ts-ignore */}
      <Box ref={ref} position={[0, 10, 0]} args={[200, 100, 150]}>
        {/* @ts-ignore */}
        <psychedelicMaterial
          side={THREE.BackSide}
          attach='material'
          color='hotpink'
        />
      </Box>
    </>
  );
};

export default SkyBox;
