import React, { useEffect } from 'react';
import { PointerLockControls } from '@react-three/drei';
import Piedestal from './Piedestal';
import Player from './Player';
import { CirclePit, Psychedelic, SimpleVisualizer } from '../visuals';
import { useAudio } from '../lib/audio';
import { useFrame } from 'react-three-fiber';
import { Bar } from '../visuals/FrequencyCircular';
import WireframePlane from '../visuals/WireframePlane';
import WireframeGround from './Ground';

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
      {/* <Piedestal /> */}
      <WireframeGround />
      <CirclePit />
      <Bar position={[3, 0, 3]} args={[1, 3, 1]} />
      <Bar position={[5, 0, 3]} args={[1, 10, 1]} />
      <Player />
      <PointerLockControls />
      <SimpleVisualizer />
    </group>
  );
};

// todo: switch visualizations, but leave player in the middle

export default ShowRoom;
