import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { useAudio } from '../lib/audio';
import * as THREE from 'three';
import { FFT_SIZE } from '../consts';
import { Box } from '@react-three/drei';
import '../materials/HeightMaterial';
import '../materials/Psychedelic';
import { Color, Vector3 } from 'three';
import { ThreeProps } from '../@types/three';

const INSTANCES_COUNT = FFT_SIZE / 2;
const perCircle = Math.floor(INSTANCES_COUNT / 3);

const FrequencyCircular = () => {
  const data = useAudio((state) => state.data);
  const meshRef = useRef();

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new Color('hotpink') },
          maxHeight: { value: 1 },
        },
        vertexShader: `
    varying float y;

    void main() {
      y = position.y;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
        fragmentShader: `
      varying float y;
      uniform float maxHeight;
      uniform vec3 color;
      
      void main() {
        float opc = y / maxHeight;
        float alpha = abs(y / 100.0);
  
        vec3 clr = color * opc;
        gl_FragColor.rgba = vec4(clr, 1.0);
      } 
    `,
      }),
    []
  );

  useEffect(() => {
    if (meshRef.current === undefined) {
      return;
    }
    // @ts-ignore
    meshRef.current.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    for (let i = 0; i < INSTANCES_COUNT; i++) {
      let radius;
      let scale = [];
      let shift = 0;
      let scaleY = 0;
      let yPosition = 0;

      if (i < perCircle) {
        radius = 7;
        // scaleY = fqVol > 0 ? fqVol / 20 : 1;
        scale = [1, scaleY, 1];
      } else if (i >= perCircle && i < perCircle * 2) {
        radius = 12;
        // scaleY = fqVol > 0 ? fqVol / 7.5 : 1.5;
        scale = [1, scaleY, 1];
        shift = Math.PI * 0.5;
      } else {
        radius = 15;
        // scaleY = fqVol > 0 ? fqVol / 5 : 3;
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
      // const [x, y, z] = scale;
      // dummy.scale.set(x, y, z);
      dummy.updateMatrix();
      //@ts-ignore
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    // @ts-ignore
    meshRef.current.instanceMatrix.needsUpdate = true;

    // return obj;
  }, []);

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
      dummy.position.set(
        distance * Math.sin(Math.PI + offset),
        0,
        distance * Math.cos(Math.PI + offset)
      );
      const [x, y, z] = scale;
      dummy.scale.set(x, y, z);
      dummy.updateMatrix();

      // ! todo: don't set position again, just copy (getMatrixAt)

      //@ts-ignore
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    //@ts-ignore
    meshRef.current.instanceMatrix.needsUpdate = true;
    //@ts-ignore
    meshRef.current.rotation.y += 0.002;
  });

  return (
    <>
      <group>
        <instancedMesh
          ref={meshRef}
          //@ts-ignore
          args={[null, null, INSTANCES_COUNT]}>
          <boxBufferGeometry attach='geometry' args={[3, 1, 3]} />
          {/* @ts-ignore */}
          <heightMat maxHeight={3} attach='material' color='#00eeee' />

          {/* <meshStandardMaterial
            wireframe={true}
            attach='material'
            color='hotpink'
          /> */}
          {/* <wireframeMaterial /> */}
          {/* <psychedelicMaterial /> */}
        </instancedMesh>
      </group>
    </>
  );
};

// ! todo: try instantiating the objects or use array of positions
// todo: instancedMesh.setPositionAt() https://medium.com/@pailhead011/instancing-with-three-js-part-3-a3fe15bcee3a
export default FrequencyCircular;
