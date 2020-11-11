import { extend } from 'react-three-fiber';
import { Color, ShaderMaterial } from 'three';

class HeightMat extends ShaderMaterial {
  constructor() {
    super({
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
    
          vec3 clr = color * opc;
          gl_FragColor.rgba = vec4(clr, 1.0);
        } 
      `,

      morphNormals: true,
    });
  }
  get color() {
    return this.uniforms.color.value;
  }
}

extend({ HeightMat });
