import { Physics } from '@react-three/cannon';
import React from 'react';
import { Canvas } from 'react-three-fiber';
import './App.css';
import { ShowRoom } from './components';

function App() {
  return (
    <div className='App'>
      <Canvas camera={{ fov: 65 }}>
        <Physics gravity={[0, -100, 0]}>
          <ShowRoom />
          {/* @ts-ignore */}
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
