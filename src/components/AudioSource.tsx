import React from 'react';

const AudioSource = () => {
  return (
    <div id='audio-source-holder'>
      <audio
        autoPlay={true}
        controls
        id='mp3-source'
        src='/Porcelain.mp3'></audio>
    </div>
  );
};

export default AudioSource;

// todo: choose audio source
