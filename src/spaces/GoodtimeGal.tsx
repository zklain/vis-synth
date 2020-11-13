import { usePlane } from '@react-three/cannon';
import { Box, Plane } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import React, { useMemo } from 'react';
import { useFrame, useLoader } from 'react-three-fiber';
import * as THREE from 'three';
import '../materials/GoodtimeMaterial';
import '../materials/Psychedelic';
// @ts-ignore
import { Resizer, KernelSize, SelectiveBloomEffect } from 'postprocessing';

const BloomyText = () => {
  // todo: selective bloom for text
  const font = useLoader(THREE.FontLoader, 'Fira Code_Bold.json');
  const config = useMemo(() => ({ font, size: 10, height: 1 }), [font]);

  // const effect = useMemo(() => new SelectiveBloomEffect());

  return (
    <EffectComposer>
      <Bloom
        intensity={1.0}
        luminanceThreshold={0.5}
        luminanceSmoothing={0.07}
        kernelSize={KernelSize.LARGE}
        width={Resizer.AUTO_SIZE}
        height={Resizer.AUTO_SIZE}
      />
      <group>
        <mesh scale={[1, 1, 1]} position={[-15, 1, -50]}>
          <textGeometry args={['666', config]} />
          {/* @ts-ignore */}
          <goodtimeMaterial color='#ffffff' time={5} />
        </mesh>
      </group>
    </EffectComposer>
  );
};

const GoodtimeGal: React.FC<{ time: number }> = ({ time = 0 }) => {
  const [groundRef] = usePlane(() => ({
    type: 'Dynamic',
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <group>
      {/* sky box */}
      <Box>
        <meshStandardMaterial />
      </Box>
      {/* ground */}
      <Plane ref={groundRef} args={[30, 100]}>
        <meshStandardMaterial color='#010101' metalness={0.9} />
        {/* @ts-ignore */}
        {/* <psychedelicMaterial color='hotpink' time={2.25} /> */}
      </Plane>
      {/* text / cross */}
      <BloomyText />
    </group>
  );
};

// todo: try with text
// todo: add light => change color
// todo: try checkboard shader
// todo: create room
// todo: add cross
// todo: add statues

export default GoodtimeGal;
