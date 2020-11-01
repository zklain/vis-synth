import { Physics } from '@react-three/cannon';
import { PointerLockControls } from '@react-three/drei';
import React from 'react';
import { Canvas } from 'react-three-fiber';
import './App.css';
import { Ground } from './components';
import Player from './Player';
import { Psychedelic } from './visuals';

function App() {
  return (
    <div className='App'>
      <Canvas camera={{ fov: 65 }}>
        <ambientLight intensity={0.3} />
        <pointLight color='#ffffff' intensity={40} position={[0, 30, 0]} />
        <Physics gravity={[0, -100, 0]}>
          <Psychedelic position={[0, 0, -20]} />
          <Psychedelic
            args={[20, 20]}
            position={[20, 3, 5]}
            rotation={[0, -Math.PI / 2, Math.PI / 6]}
          />
          <Psychedelic
            args={[10, 10]}
            position={[0, 3, 20]}
            rotation={[0, -Math.PI, 0]}
          />
          <Psychedelic
            args={[20, 20]}
            position={[-20, 3, 5]}
            rotation={[0, Math.PI / 2, 0]}
          />
          <Player />
          <Ground />
        </Physics>
        {/* @ts-ignore */}
        <PointerLockControls />
      </Canvas>
    </div>
  );
}

export default App;
