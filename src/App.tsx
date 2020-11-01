import { Physics, usePlane } from '@react-three/cannon';
import { Box, Plane, PointerLockControls } from '@react-three/drei';
import React, { useRef } from 'react';
import { Canvas, extend, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import './App.css';
import Player from './Player';

//@ts-ignore
import glsl from 'babel-plugin-glsl/macro';
import { shaderMaterial } from '@react-three/drei';
import { Euler } from 'three/src/math/Euler';

const ColorShiftMaterial = shaderMaterial(
  {
    time: 0.0,
    vertexDisplacement: 1.0,
    color: new THREE.Color(0.2, 0.0, 0.1),
  },
  // vertex shader
  glsl`
    attribute float vertexDisplacement;
    uniform float time;
    varying vec2 vUv;
    varying vec3 vPos;

    void main() {
      vUv = uv;
      vec3 pos = position;
      vPos = position;


      // pos.y += cos(time) * sin(time + pos.z * 5.0);
      // pos.z += 5.0 * sin(time + pos.x);

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

extend({ ColorShiftMaterial });

const JuicyPlane = ({
  position,
  rotation = [0, 0, 0],
}: {
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
      args={[50, 50]}>
      {/* @ts-ignore */}
      <colorShiftMaterial />
    </Plane>
  );
};

const SkyBox = () => {
  const ref = useRef();

  useFrame((state, delta) => {
    //@ts-ignore
    ref.current.material.time += delta;
  });

  return (
    <>
      {/* @ts-ignore */}
      <Box ref={ref} position={[0, 10, 0]} args={[200, 100, 150]}>
        {/* @ts-ignore */}
        <colorShiftMaterial
          side={THREE.BackSide}
          attach='material'
          color='hotpink'
        />
      </Box>
    </>
  );
};

const Ground = () => {
  const [ref] = usePlane(() => ({
    type: 'Dynamic',
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));

  return (
    //@ts-ignore
    <Plane ref={ref} args={[3, 3]}>
      <meshStandardMaterial color='#303203' metalness={0.3} />
    </Plane>
  );
};

function App() {
  return (
    <div className='App'>
      <Canvas camera={{ fov: 65 }}>
        <ambientLight intensity={1} />
        <pointLight color='#ffffff' intensity={4} position={[0, 30, 0]} />
        <Physics gravity={[0, -100, 0]}>
          {/* <SkyBox /> */}
          <JuicyPlane position={[0, 0, -40]} />
          <JuicyPlane position={[-10, 0, 10]} />
          <JuicyPlane position={[-10, 0, 10]} />
          <JuicyPlane position={[-10, 0, 10]} />
          <JuicyPlane position={[-10, 0, 10]} />
          <Ground />
          <Player />
        </Physics>
        {/* @ts-ignore */}
        <PointerLockControls />
      </Canvas>
    </div>
  );
}

export default App;
