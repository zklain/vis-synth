import React, { useEffect } from 'react';
import { PointerLockControls } from '@react-three/drei';
import Piedestal from './Piedestal';
import Player from './Player';
import { CirclePit, Psychedelic, SimpleVisualizer } from '../visuals';
import { useAudio } from '../lib/audio';
import { useFrame } from 'react-three-fiber';

const ShowRoom = () => {
  const initAudio = useAudio((state) => state.initAudio);
  const analyzeFq = useAudio((state) => state.analyzeFq);

  useEffect(() => {
    initAudio();
  }, []);
  useFrame(() => {
    analyzeFq();
  });

  return (
    <group>
      <ambientLight intensity={0.3} position={[0, 100, 0]} />
      <pointLight color='#ffffff' intensity={40} position={[0, 100, 0]} />
      {/* <Psychedelic position={[0, 0, -20]} /> */}
      <CirclePit />
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
