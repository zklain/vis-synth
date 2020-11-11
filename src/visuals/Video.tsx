import { Box, Plane, useAspect } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import '../materials/GlitchMaterial';

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
  const [x, y] = useAspect('cover', 1800, 1000);
  const [video, setVideo] = useState<HTMLVideoElement>();

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

  return video ? (
    <Plane args={[100, 100]} position={[0, 0, -20]} rotation={[0, 0, 0]}>
      {/* @ts-ignore */}
      <glitchMaterial color='hotpink' map={video}>
        <videoTexture attach='map' args={[video]} />
        {/* @ts-ignore */}
      </glitchMaterial>
    </Plane>
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
