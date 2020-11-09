import React, { useMemo, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { useAudio } from '../lib/audio';
import * as THREE from 'three';
import { FFT_SIZE } from '../consts';
import { Box } from '@react-three/drei';
import '../materials/HeightMaterial';
import { Vector3 } from 'three';

const INSTANCES_COUNT = FFT_SIZE / 2;
const perCircle = Math.floor(INSTANCES_COUNT / 3);

export const Bar = ({ args = [3, 1, 1], position = [0, 0, 0] }) => {
  return (
    <Box
      attach='geometry'
      // @ts-ignore
      args={args}
      // @ts-ignore
      position={position}>
      {/* @ts-ignore */}
      <heightMaterial
        maxHeight={2}
        attach='material'
        color={new Vector3(1.0, 0.41, 0.7)}
      />
      {/* <meshStandardMaterial attach='material' color='hotpink' /> */}
    </Box>
  );
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
      let scaleY = 0;
      let yPosition = 0;

      if (i < perCircle) {
        radius = 7;
        scaleY = fqVol > 0 ? fqVol / 20 : 1;
        scale = [1, scaleY, 1];
      } else if (i >= perCircle && i < perCircle * 2) {
        radius = 12;
        scaleY = fqVol > 0 ? fqVol / 7.5 : 1.5;
        scale = [1, scaleY, 1];
        shift = Math.PI * 0.5;
      } else {
        radius = 15;
        scaleY = fqVol > 0 ? fqVol / 5 : 3;
        scale = [2, scaleY, 2];
        shift = Math.PI * 0.25;
      }
      const distance = Math.PI * radius;
      const offset = (i / perCircle) * Math.PI * 4 + shift;
      // todo: move position set to use effect?
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
          {/* <heightMaterial attach='material' color='hotpink' /> */}
          <meshStandardMaterial attach='material' color='hotpink' />
        </instancedMesh>
      </group>
    </>
  );
};

// todo: material reacting to height
// todo: rotation speed should be set by tempo
// todo: three circles

export default FrequencyCircular;
