import React from 'react';
import { Box } from '@react-three/drei';
import { ThreeProps } from '../@types/three';

const Bar: React.FC<ThreeProps & { scale?: number }> = ({
  args = [3, 1, 1],
  position = [0, 0, 0],
  color,
  scale = 1,
}) => {
  return (
    <Box
      scale={[1, scale, 1]}
      position={position}
      attach='geometry'
      args={args}>
      {/* @ts-ignore */}
      <heightMat maxHeight={10} attach='material' color={color} />
    </Box>
  );
};

export default Bar;
