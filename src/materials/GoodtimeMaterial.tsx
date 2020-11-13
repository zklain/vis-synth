import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro';
import { extend } from 'react-three-fiber';

/**
 * Juicy material.
 */
const GoodtimeMaterial = shaderMaterial(
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
    varying vec3 vPos;
    
    void main() {

      // todo: R -> G -> B

      float opacityR = sin(time);
      float opacityG = cos(time);
      float opacityB = sin(time + 3.14);


      float r = opacityR;
      float g = opacityG;
      float b = opacityB;
      vec3 rgb = vec3(r, g, b);
      gl_FragColor.rgba = vec4(2.4, 0.01, 0.01, 1.0);
    }
  `
);

extend({ GoodtimeMaterial });
