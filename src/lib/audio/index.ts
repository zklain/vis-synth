// import { create } from 'zustand';

import create from 'zustand';
import { FFT_SIZE } from '../../consts';

export type AudioState = {
  ctx: AudioContext | null;
  analyser: AnalyserNode | null;
  playing: boolean;
  tempo: number;
  data: Uint8Array;
  initAudio: () => Promise<void>;
  analyzeFq: () => void;
};

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

  return { ctx, analyser };
};

export const useAudio = create<AudioState>((set, get) => ({
  ctx: null,
  analyser: null,
  playing: false,
  tempo: 100,
  data: new Uint8Array(0),
  initAudio: async () => {
    const { ctx, analyser } = await setupAudioContext();
    const data = new Uint8Array(analyser.frequencyBinCount);
    const tempo = 100;
    set((state) => ({ ctx, analyser, data, playing: true, tempo }));
  },
  analyzeFq: () => {
    const analyser = get().analyser;
    const data = get().data;
    if (!analyser) return;
    analyser.getByteFrequencyData(data);
    set((state) => ({ ...state, data }));
  },
}));
// todo: audio controls from here?
// todo: create playback
// todo: take sound created from oscilator as a context
