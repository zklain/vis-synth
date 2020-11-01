import glsl from 'babel-plugin-glsl/macro';
import { Plane, shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from 'react-three-fiber';
import React, { useRef } from 'react';
import { Euler } from 'three/src/math/Euler';

/**
 * Juicy material.
 */
const PsychedelicMaterial = shaderMaterial(
  {
    time: 0.0,
  },
  // vertex shader
  glsl`
    uniform float time;
    varying vec2 vUv;
    varying vec3 vPos;

    void main() {
      vUv = uv;
      vec3 pos = position;
      vPos = position;

      vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);

      gl_Position = projectionMatrix * modelViewPosition;
    }
  `,
  // fragment shader
  glsl`
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    varying vec3 vPos;
    
    void main() {

      float opacity = cos(time);
      float opacityG = sin(time);
      float opacityB = tan(time * 0.7);

      float amplitude = sin(-vPos.y + time * 5.0) + sin(time * 0.2 + 10.0);

      float r = opacity * sin(vPos.x - amplitude * cos(time + vPos.y * 0.2));
      float g = opacityG * sin(5.0 + vPos.x - amplitude * cos(time + vPos.y * 0.2));
      float b = opacityB * cos(-5.0 + vPos.x - amplitude * cos(time + vPos.y * 0.2));
      vec3 rgb = vec3(r, g, b);
      gl_FragColor.rgba = vec4(rgb, 1.0);
    }
  `
);

extend({ PsychedelicMaterial });

const PsychedelicPlane = ({
  position,
  args = [50, 50],
  rotation = [0, 0, 0],
}: {
  args?:
    | [
        (number | undefined)?,
        (number | undefined)?,
        (number | undefined)?,
        (number | undefined)?
      ]
    | undefined;
  position?: THREE.Vector3 | [x: number, y: number, y: number];
  rotation?:
    | THREE.Vector3
    | Euler
    | [x: number, y: number, z: number, order?: string | undefined];
}) => {
  const ref = useRef();
  useFrame((state, delta) => {
    //@ts-ignore
    ref.current.material.time += delta;
  });

  return (
    <Plane
      ref={ref}
      position={position}
      // @ts-ignore
      rotation={rotation}
      args={args}>
      {/* @ts-ignore */}
      <psychedelicMaterial />
    </Plane>
  );
};

export default PsychedelicPlane;
