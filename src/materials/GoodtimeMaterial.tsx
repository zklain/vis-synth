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
    float tempo = 5.0;

    
    void main() {

      // todo: R -> G -> B
      // todo: never go black
      // todo: light on beat


      float opacityR = cos(3.14 + time * tempo * 0.1) ;
      float opacityG = cos(- 3.14 + time * tempo * 0.1);
      float opacityB = sin(time * tempo * 0.1);


      float r = opacityR;
      float g = opacityG;
      float b = opacityB;
      vec3 rgb = vec3(r, g, b);
      gl_FragColor.rgba = vec4(cos(time * 5.0 + 5.0) + 1.0, 1.0, 1.0, 1.0);
    }
  `
);

extend({ GoodtimeMaterial });
