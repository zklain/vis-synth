import React from 'react';
import { PointerLockControls } from '@react-three/drei';
import Piedestal from './Piedestal';
import Player from './Player';
import { Psychedelic, SimpleVisualizer } from '../visuals';

const ShowRoom = () => {
  return (
    <group>
      <ambientLight intensity={0.3} />
      <pointLight color='#ffffff' intensity={40} position={[0, 30, 0]} />
      <Psychedelic position={[0, 0, -20]} />
      {/* <Psychedelic
        args={[20, 20]}
        position={[20, 3, 5]}
        rotation={[0, -Math.PI / 2, Math.PI / 6]}
      /> */}
      {/* <Psychedelic
        args={[10, 10]}
        position={[0, 3, 20]}
        rotation={[0, -Math.PI, 0]}
      /> */}
      {/* <Psychedelic
        args={[20, 20]}
        position={[-20, 3, 5]}
        rotation={[0, Math.PI / 2, 0]}
      /> */}
      <Player />
      <Piedestal />
      <PointerLockControls />
      <SimpleVisualizer />
    </group>
  );
};

export default ShowRoom;
