import React, { useMemo, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { useAudio } from '../lib/audio';
import * as THREE from 'three';
import { FFT_SIZE } from '../consts';
import '../materials/HeightMaterial';

const INSTANCES_COUNT = FFT_SIZE / 2;
const perCircle = Math.floor(INSTANCES_COUNT / 3);

const Bar = () => {
  return <group></group>;
};

const FrequencyCircular = () => {
  const data = useAudio((state) => state.data);
  const meshRef = useRef();

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!data.length) return;

    data.forEach((fqVol, i) => {
      let radius;
      let scale = [];
      let shift = 0;
      if (i < perCircle) {
        radius = 7;
        scale = [1, fqVol > 0 ? fqVol / 20 : 1, 1];
      } else if (i >= perCircle && i < perCircle * 2) {
        radius = 10;
        scale = [1, fqVol > 0 ? fqVol / 7.5 : 1.5, 1];
        shift = 5;
      } else {
        radius = 13;
        scale = [2, fqVol > 0 ? fqVol / 5 : 3, 2];
        shift = 13;
      }
      const distance = Math.PI * radius + shift;
      const offset = (i / perCircle) * Math.PI * 4;
      // todo: move to use effect
      dummy.position.set(
        distance * Math.sin(Math.PI + offset),
        0,
        distance * Math.cos(Math.PI + offset)
      );
      const [x, y, z] = scale;
      dummy.scale.set(x, y, z);
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
    <>
      <group>
        <instancedMesh
          position={[0, 0, 0]}
          ref={meshRef}
          //@ts-ignore
          args={[null, null, INSTANCES_COUNT]}>
          <boxBufferGeometry attach='geometry' args={[3, 1, 3]} />
          {/* @ts-ignore */}
          {/* <skurvenyMaterial attach='material' color='hotpink' /> */}
          <meshStandardMaterial attach='material' color='hotpink' />
        </instancedMesh>
      </group>
      <group>
        <instancedMesh></instancedMesh>
      </group>
      <group>
        <instancedMesh></instancedMesh>
      </group>
    </>
  );
};

// todo: material reacting to height
// todo: rotation speed should be set by tempo
// todo: three circles

export default FrequencyCircular;
