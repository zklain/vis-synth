import { usePlane } from '@react-three/cannon';
import { Box, Plane, useGLTF } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import React, { useMemo } from 'react';
import { useFrame, useLoader } from 'react-three-fiber';
import * as THREE from 'three';
import '../materials/GoodtimeMaterial';
import '../materials/Psychedelic';
// @ts-ignore
import { Resizer, KernelSize, SelectiveBloomEffect } from 'postprocessing';
import { ThreeVector3 } from '../@types/three';
import { Vector3 } from 'three';

const Cross = ({
  time,
  position,
}: {
  time: number;
  position: ThreeVector3;
}) => {
  // @ts-ignore
  const { nodes } = useGLTF('./cross.glb', true);

  return (
    <mesh
      rotation={[0, Math.PI / 2, 0]}
      position={position}
      geometry={nodes.Plane.geometry}>
      {/* <meshStandardMaterial color='hotpink' /> */}
      {/* @ts-ignore */}
      <goodtimeMaterial color='#ffffff' time={time} />
    </mesh>
  );
};

const BloomyText = () => {
  // todo: selective bloom for text
  const font = useLoader(THREE.FontLoader, 'Fira Code_Bold.json');
  const config = useMemo(() => ({ font, size: 10, height: 1 }), [font]);

  // const effect = useMemo(() => new SelectiveBloomEffect());

  return (
    <group>
      <mesh scale={[1, 1, 1]} position={[-15, 1, -50]}>
        <textGeometry args={['666', config]} />
        {/* @ts-ignore */}
        <goodtimeMaterial color='#ffffff' time={5} />
      </mesh>
    </group>
  );
};

const GoodtimeGal: React.FC<{ time: number }> = ({ time = 0 }) => {
  const [groundRef] = usePlane(() => ({
    type: 'Dynamic',
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <group>
      <EffectComposer>
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.7}
          luminanceSmoothing={0.2}
          kernelSize={KernelSize.LARGE}
          width={Resizer.AUTO_SIZE}
          height={Resizer.AUTO_SIZE}
        />
        {/* sky box */}
        {/* <Box>
        <meshStandardMaterial />
      </Box> */}
        {/* ground */}

        <Plane ref={groundRef} args={[30, 100]}>
          <meshStandardMaterial
            color='#010101'
            metalness={0.9}
            roughness={0.3}
          />
        </Plane>
        {/* text / cross */}
        <Cross position={[0, -0.1, -20]} time={time} />
        <spotLight
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 3.0, -25]}
          color='red'
          intensity={Math.cos(time * 5 + 5) + 2.0}
        />
        {/* <BloomyText /> */}
      </EffectComposer>
    </group>
  );
};

// todo: try with text
// todo: add light => change color
// todo: try checkboard shader
// todo: create room
// todo: add cross
// todo: add statues
// todo: shadows
// todo: reflection

export default GoodtimeGal;
