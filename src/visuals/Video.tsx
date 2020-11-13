import { Box, Plane, useAspect } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import '../materials/ChromaticAbberation';
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
  Glitch,
  Pixelation,
  ChromaticAberration,
} from '@react-three/postprocessing';
import { Vector2 } from 'three';

const videoConstraints = {
  video: {
    width: { min: 300, ideal: 1280, max: 1620 },
    height: { min: 400, ideal: 720, max: 1080 },
    facingMode: 'user',
  },
};

const startCamera = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();

  const videoDevices = devices.filter((device) => device.kind === 'videoinput');
  console.log(JSON.stringify(videoDevices, null, 2));

  if (!videoDevices.length) {
    console.error('NO video devices');
  }
  // todo: enumerate devices and let choose device
  const stream = await navigator.mediaDevices.getUserMedia(videoConstraints);
  return stream;
};

const Video = () => {
  const [x, y] = useAspect('cover', 1920, 1680);
  const [video, setVideo] = useState<HTMLVideoElement>();
  const ref = useRef();

  const [offset, setOffset] = useState<Vector2>(new Vector2(0.1, 0.2));

  useEffect(() => {
    (async () => {
      if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
        const stream = await startCamera();
        const vid = document.createElement('video');
        vid.srcObject = stream;
        vid.crossOrigin = 'Anonymous';
        vid.play();
        setVideo(vid);
      } else {
        console.error('NO VIDEO DEVICES');
      }
    })();
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      //@ts-ignore
      ref.current.material.time += delta;
    }
  });

  return video ? (
    <EffectComposer>
      <ChromaticAberration offset={new Vector2(0.01, 0.002)} />
      <Glitch strength={new Vector2(0.3, 1.0)} />
      {/* <Noise /> */}
      <Plane
        args={[10, 10]}
        ref={ref}
        scale={[x, y, 1]}
        position={[0, 0, -15]}
        rotation={[0, 0, 0]}>
        {/* <meshBasicMaterial> */}
        {/* @ts-ignore */}
        <chromaticAbberation attach='material' map={video}>
          <videoTexture attach='map' args={[video]} />
          {/* @ts-ignore */}
        </chromaticAbberation>
        {/* </meshBasicMaterial> */}
      </Plane>

      <Box position={[1, 3, -10]} args={[]}>
        <meshStandardMaterial color='hotpink' />
      </Box>
    </EffectComposer>
  ) : (
    <Box />
  );
};

// todo: custom material
// todo: start video
// todo: stop video
// todo: RGB Controlls
// todo: apply rgb shift shader
// todo: select cameras (rear/front)

export default Video;
