import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro';
import { extend } from 'react-three-fiber';

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
    varying vec3 vPos;
    
    void main() {

      // todo: opacity should change according to tempo
      // todo: amplitude should change on a certain frequency
      // todo: opacities can also be affected by the frequencies (blue for bass, red for high notes)
      float opacityR = cos(time);
      float opacityG = sin(time);
      float opacityB = cos(time);

      float amplitude = sin(-vPos.y + time * 5.0) + sin(time * 0.2 + 10.0)  * cos(time + vPos.y * 0.2);

      float r = opacityR * sin(vPos.x - amplitude);
      float g = opacityG * sin(5.0 + vPos.x - amplitude);
      float b = opacityB * sin(-5.0 + vPos.x - amplitude);
      vec3 rgb = vec3(r, g, b);
      gl_FragColor.rgba = vec4(rgb, 1.0);
    }
  `
);

extend({ PsychedelicMaterial });
