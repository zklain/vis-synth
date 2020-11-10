import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro';
import { extend } from 'react-three-fiber';
import { Vector3 } from 'three';

const WireframeMaterial = shaderMaterial(
  {
    bgColor: new Vector3(0),
    color: new Vector3(1.0, 1.0, 1.0),
    density: 10.0,
  },
  // fragment shader
  glsl`
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // vertex shader
  glsl`
    varying vec2 vUv;
    uniform vec3 color;
    uniform vec3 bgColor;
    uniform float density;

    void main() {
      if (fract(vUv.x * density) < 0.02 || fract(vUv.y * density) < 0.02) {
        gl_FragColor = vec4(color, 1.0);
      } else {
        gl_FragColor = vec4(bgColor, 1.0);
      }
    }
  `
);

extend({ WireframeMaterial });
