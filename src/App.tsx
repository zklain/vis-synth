import { Physics } from '@react-three/cannon';
import React from 'react';
import { Canvas } from 'react-three-fiber';
import './App.css';
import { ShowRoom } from './components';
import AudioSource from './components/AudioSource';

function App() {
  return (
    <div className='App'>
      <Canvas camera={{ fov: 65 }}>
        <Physics gravity={[0, -100, 0]}>
          <ShowRoom />
        </Physics>
      </Canvas>
      {/* <AudioSource /> */}
    </div>
  );
}

// todo: height reflecting
// todo: RGB Shift
// todo: kaleidoscope
// todo: tempo
// todo: circular
// todo: tunnel
// todo: organic structure, growing on beat?
// todo: Head with wire
// todo: video input plus controls
// todo: scrolling between scenes
// todo: stacking
// todo: The New Pope cross
// todo: flashlight with spotLight

// todo: try connecting spotify/bandcamp/soundcloud?

export default App;
