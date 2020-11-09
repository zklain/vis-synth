import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro';
import { extend } from 'react-three-fiber';
import { Vector3 } from 'three';

/**
 * Juicy material.
 */
const HeightMaterial = shaderMaterial(
  {
    maxHeight: 1.0,
    color: new Vector3(1.0, 0.41, 0.7),
  },
  // vertex shader
  glsl`
    varying float y;

    void main() {
      y = position.y;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  glsl`
    varying float y;
    uniform float maxHeight;
    uniform vec3 color;
    
    void main() {
      // todo: must be divided by the height of the element
      // todo: pass color 
      float opc = y / maxHeight;
      float alpha = abs(y / 100.0);

      vec3 clr = color * opc;
      gl_FragColor.rgba = vec4(clr, 1.0);
    }
  `
);

extend({ HeightMaterial });
