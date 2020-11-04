import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { FFT_SIZE } from '../consts';
import { setupAudioContext } from '../lib/audio';

const PARTICLES_COUNT = FFT_SIZE / 2;

const Visualizer = () => {
  const analyser = useRef<AnalyserNode>();

  const meshRef = useRef();

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    (async () => {
      const { ctx, analyzer } = await setupAudioContext();
      analyser.current = analyzer;
    })();
  }, []);

  useFrame(() => {
    if (!analyser.current) {
      return;
    }

    // should data be in the components state?
    let data = new Uint8Array(analyser.current.frequencyBinCount);
    // todo: only set new position if playing
    // todo: find the lowest and highest note in the whole song and create particles accordingly
    analyser.current.getByteFrequencyData(data);

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
