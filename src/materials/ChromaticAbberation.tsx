import { extend } from 'react-three-fiber';
import { Color, ShaderMaterial } from 'three';

class ChromaticAbberation extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        offset: { value: 0 },
        angle: { value: 0 },
        map: { value: null },
        hasTexture: { value: 0 },
        color: { value: new Color('hotpink') },
        scale: { value: 0 },
        time: { value: 1.0 },
      },

      vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
      
      `,
      fragmentShader: `

      varying vec2 vUv;

      uniform float offset;
      uniform vec3 color;
      uniform float scale;
      uniform sampler2D map;
      uniform float time;
      uniform float hasTexture;
      varying vec3 vPosition;

      void main() {

        if (hasTexture == 1.0) {
          vec2 texPos = vUv;
          vec4 mc = texture2D(map, texPos);

          float opacityR = cos(time);
          float amplitude = sin(-vPosition.y + time * 5.0) + sin(time * 0.2 + 10.0)  * cos(time + vPosition.y * 0.2);

          float r = mc.r * opacityR * sin(vPosition.y - amplitude);
          float g = sin(time) * mc.g;
          float b = mc.b;


          gl_FragColor = vec4(r, g, b, 1.0);
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
    return this.uniforms.map.value;
  }

  set offset(value: number) {
    this.uniforms.offset.value = value;
  }

  get offset() {
    return this.uniforms.offset.value;
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

  set time(value: number) {
    this.uniforms.time.value = value;
  }

  get time() {
    return this.uniforms.time.value;
  }
}

extend({ ChromaticAbberation });
