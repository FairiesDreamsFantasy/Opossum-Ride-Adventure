/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural Carved Stone Double Sliding Door Open Synthesis
 * Models heavy carved stone slabs sliding cleanly into temple wall pockets with stone-on-stone rumble and grit.
 */
export const playStoneCarvedSlidingDoorOpen = (ctx: AudioContext, destination: AudioNode) => {
  const now = ctx.currentTime;
  const duration = 1.15;

  // 1. Stone-track granular friction noise
  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const stoneBand = ctx.createBiquadFilter();
  stoneBand.type = "bandpass";
  stoneBand.frequency.setValueAtTime(190, now);
  stoneBand.frequency.linearRampToValueAtTime(340, now + 0.75);
  stoneBand.frequency.linearRampToValueAtTime(260, now + duration);
  stoneBand.Q.setValueAtTime(2.2, now);

  const stoneLP = ctx.createBiquadFilter();
  stoneLP.type = "lowpass";
  stoneLP.frequency.setValueAtTime(720, now);
  stoneLP.frequency.linearRampToValueAtTime(980, now + 0.65);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.001, now);
  noiseGain.gain.linearRampToValueAtTime(0.62, now + 0.08);
  noiseGain.gain.setValueAtTime(0.55, now + duration * 0.65);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noise.connect(stoneBand);
  stoneBand.connect(stoneLP);
  stoneLP.connect(noiseGain);
  noiseGain.connect(destination);

  // 2. Heavy stone mass sub-resonance (no metallic click)
  const rumbleOsc = ctx.createOscillator();
  rumbleOsc.type = "triangle";
  rumbleOsc.frequency.setValueAtTime(58, now);
  rumbleOsc.frequency.linearRampToValueAtTime(76, now + duration * 0.7);
  rumbleOsc.frequency.linearRampToValueAtTime(62, now + duration);

  const rumbleGain = ctx.createGain();
  rumbleGain.gain.setValueAtTime(0.001, now);
  rumbleGain.gain.linearRampToValueAtTime(0.32, now + 0.12);
  rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  rumbleOsc.connect(rumbleGain);
  rumbleGain.connect(destination);

  noise.start(now);
  noise.stop(now + duration);
  rumbleOsc.start(now);
  rumbleOsc.stop(now + duration);
};
