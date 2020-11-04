import React, { useMemo, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { FFT_SIZE } from '../consts';
import { useAudio } from '../lib/audio';

const PARTICLES_COUNT = FFT_SIZE / 2;

const Visualizer = () => {
  const data = useAudio((state) => state.data);

  const meshRef = useRef();

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!data.length) return;

    data.forEach((frequencyVol, i) => {
      const x = -64 + i / 2;
      const y = frequencyVol / 10;
      const z = 40;
      dummy.position.set(x, y, z);

      // dummy.scale.set()

      // todo: pass opacity to the shader?
      dummy.updateMatrix();

      // @ts-ignore
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    // @ts-ignore
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        //@ts-ignore
        args={[null, null, PARTICLES_COUNT]}>
        <dodecahedronBufferGeometry attach='geometry' args={[0.2, 0]} />
        <meshStandardMaterial attach='material' color='hotpink' />
      </instancedMesh>
    </group>
  );
};

export default Visualizer;
