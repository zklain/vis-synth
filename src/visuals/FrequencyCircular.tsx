import React, { useMemo, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { useAudio } from '../lib/audio';
import * as THREE from 'three';
import { FFT_SIZE } from '../consts';

const INSTANCES_COUNT = FFT_SIZE / 2;
const perCircle = Math.floor(INSTANCES_COUNT / 3);
const radius = 25;

const FrequencyCircular = () => {
  const data = useAudio((state) => state.data);

  console.log(data.length);

  console.log(perCircle);

  const meshRef = useRef();

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // todo: spiral
  // const positions = useMemo(
  //   () => [
  //     ...new Array(INSTANCES_COUNT).map((_, i) => {
  //       return [x, y, z];
  //     }),
  //   ],
  //   []
  // );

  useFrame(() => {
    if (!data.length) return;
    // todo: separate low/mid/high fq
    // todo: circular position
    // todo: scale y on fq volume
    const low = data.slice(0, perCircle);
    const mid = data.slice(perCircle, perCircle * 2);
    const high = data.slice(perCircle * 2, perCircle * 3);

    data.forEach((fqVol, i) => {
      // const position = positions[i];
      // const norm = i / FFT_SIZE;
      // var theta = norm * Math.PI;
      let radius;
      if (i < perCircle) {
        radius = 7;
      } else if (i >= perCircle && i < perCircle * 2) {
        radius = 12;
      } else {
        radius = 16;
      }
      const distance = Math.PI * radius;
      const offset = (i / perCircle) * Math.PI * 4;
      const x = distance * Math.sin(Math.PI + offset);
      const z = distance * Math.cos(Math.PI + offset);
      // const z = distance * Math.cos(theta);
      // todo: move to use effect
      dummy.position.set(x, 0, z);

      dummy.scale.set(1, fqVol > 0 ? fqVol / 10 : 1, 1);
      dummy.updateMatrix();
      //@ts-ignore
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    //@ts-ignore
    meshRef.current.instanceMatrix.needsUpdate = true;
    //@ts-ignore
    meshRef.current.rotation.y += 0.001;
  });

  return (
    <group>
      <instancedMesh
        position={[0, 0, 0]}
        ref={meshRef}
        //@ts-ignore
        args={[null, null, INSTANCES_COUNT]}>
        <boxBufferGeometry attach='geometry' args={[3, 1, 3]} />
        <meshStandardMaterial attach='material' color='hotpink' />
      </instancedMesh>
    </group>
  );
};

// todo: material reacting to height
// todo: rotation speed should be set by tempo
// todo: three circles

export default FrequencyCircular;
