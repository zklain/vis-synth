import React, { useEffect, useState } from 'react';
import { PointerLockControls } from '@react-three/drei';
import Player from './Player';
import { CirclePit, Psychedelic, SimpleVisualizer } from '../visuals';
import { useAudio } from '../lib/audio';
import { useFrame } from 'react-three-fiber';
import Bar from '../components/Bar';
import WireframeGround from './Ground';
import Video from '../visuals/Video';
import GoodtimeGal from '../spaces/GoodtimeGal';

const ShowRoom = () => {
  const initAudio = useAudio((state) => state.initAudio);
  const analyzeFq = useAudio((state) => state.analyzeFq);

  const [scale, setScale] = useState(1);
  const [time, setTime] = useState(1.0);

  useEffect(() => {
    // initAudio();
  }, []);

  useFrame((state, delta) => {
    // analyzeFq();
    setTime(time + delta);
    // setScale();
  });

  return (
    <group>
      <ambientLight intensity={0.3} position={[0, 100, 0]} />
      <pointLight color='#ffffff' intensity={40} position={[0, 100, 0]} />
      {/* <Video /> */}
      <GoodtimeGal time={time} />
      {/* <Piedestal /> */}
      {/* <WireframeGround /> */}
      {/* <CirclePit /> */}
      {/* <Bar position={[3, 0, 3]} args={[1, 3, 1]} scale={Math.sin(time + 5)} />
      <Bar
        scale={Math.cos(time) + 0.1}
        position={[5, 0, 3]}
        args={[1, 10, 1]}
      /> */}
      <Player />
      <PointerLockControls />
      {/* <SimpleVisualizer /> */}
    </group>
  );
};

// todo: switch visualizations, but leave player in the middle

export default ShowRoom;
