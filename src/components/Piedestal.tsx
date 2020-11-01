import { usePlane } from '@react-three/cannon';
import React from 'react';
import { Plane } from '@react-three/drei';

const Piedestal = () => {
  const [ref] = usePlane(() => ({
    type: 'Dynamic',
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));

  return (
    //@ts-ignore
    <Plane ref={ref} args={[3, 3]}>
      <meshStandardMaterial color='#000000' metalness={0.9} roughness={0.2} />
    </Plane>
  );
};
export default Piedestal;
