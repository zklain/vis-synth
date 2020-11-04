// import { create } from 'zustand';

import { FFT_SIZE } from '../../consts';

// const audioState = create((set) => ({
//   ctx: null,
//   analyzer:
//   initContext: () => set(state => (
//     const ctx =
//     return {...state, ctx}
//     ))
// }));

// todo: add to state
export const setupAudioContext = async () => {
  window.AudioContext =
    //@ts-ignore
    window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContext();
  const analyser = ctx.createAnalyser();
  // todo: can be changed?
  analyser.fftSize = FFT_SIZE;
  const audioElem = document.getElementById('mp3-source') as HTMLMediaElement;
  if (!audioElem) {
    throw new Error('No audio source!');
  }

  audioElem.onplay = () => {
    ctx.resume();
  };

  // create source
  const source = ctx.createMediaElementSource(audioElem);

  // connect analyser
  source.connect(analyser);
  // connect to output
  source.connect(ctx.destination);

  return { ctx, analyzer: analyser };
};

// todo: create playback
// todo: take sound created from oscilator as a context
