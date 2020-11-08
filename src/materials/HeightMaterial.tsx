import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro';
import { extend } from 'react-three-fiber';

/**
 * Juicy material.
 */
const HeightMaterial = shaderMaterial(
  {},
  // vertex shader
  glsl`
    varying vec3 vPos;

    void main() {
      vPos = position;

      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition;
    }
  `,
  // fragment shader
  glsl`
    uniform vec3 color;
    varying vec3 vPos;
    
    void main() {
      float opacity = vPos.z + 0.7;

      // vec3 rgb = vec3(r, g, b);
      gl_FragColor.rgba = vec4(color, 1.0);
    }
  `
);

extend({ HeightMaterial });
