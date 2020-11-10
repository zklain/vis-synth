import React from 'react';
import Psychedelic from '../visuals/Psychedelic';

const PsychedleicGallery = () => {
  return (
    <group>
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
    </group>
  );
};

export default PsychedleicGallery;
