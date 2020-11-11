import { extend } from 'react-three-fiber';
import { Color, ShaderMaterial } from 'three';

class GlitchMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        shiftAmount: { value: 0 },
        angle: { value: 0 },
        map: { value: null },
        hasTexture: { value: 0 },
        color: { value: new Color('hotpink') },
        scale: { value: 0 },
      },

      vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
      
      `,
      fragmentShader: `
      varying vec2 vUv;
      uniform vec3 color;
      uniform float scale;
      uniform sampler2D map;
      uniform float hasTexture;

      void main() {

        if (hasTexture == 1.0) {
          // todo: proper video size
          vec2 texPos = vUv;
          vec4 mc = texture2D(map, texPos);
          gl_FragColor = vec4(mc.r, mc.g, mc.b, 1.0);
        } else {
          gl_FragColor = vec4(color, 1.0);
        }
      }
      `,
    });
  }

  set map(value: any) {
    this.uniforms.hasTexture.value = !!value;
    this.uniforms.map.value = value;
  }

  get map() {
    // this.uniforms.hasTexture.value = !!value;
    return this.uniforms.map.value;
  }

  set shiftAmount(value: number) {
    this.uniforms.shiftAmount.value = value;
  }

  set color(value: Color | string | number) {
    this.uniforms.color.value = new Color(value);
  }

  get color() {
    return this.uniforms.color.value;
  }

  set scale(value: number) {
    this.uniforms.scale.value = new Color(value);
  }

  get scale() {
    return this.uniforms.scale.value;
  }
}

extend({ GlitchMaterial });
