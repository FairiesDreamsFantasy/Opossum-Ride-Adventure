/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural Carved Stone Double Sliding Door Close Synthesis
 * Produces a heavy sliding stone friction sound tapering gently into stone rest—strictly NO post-close click or latch thud.
 */
export const playStoneCarvedSlidingDoorClose = (ctx: AudioContext, destination: AudioNode) => {
  const now = ctx.currentTime;
  const duration = 1.05;

  // 1. Stone-track granular friction noise tapering down in pitch
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
  stoneBand.frequency.setValueAtTime(310, now);
  stoneBand.frequency.linearRampToValueAtTime(145, now + duration * 0.9);
  stoneBand.Q.setValueAtTime(2.4, now);

  const stoneLP = ctx.createBiquadFilter();
  stoneLP.type = "lowpass";
  stoneLP.frequency.setValueAtTime(840, now);
  stoneLP.frequency.linearRampToValueAtTime(420, now + duration * 0.95);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.001, now);
  noiseGain.gain.linearRampToValueAtTime(0.6, now + 0.08);
  noiseGain.gain.setValueAtTime(0.48, now + duration * 0.55);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noise.connect(stoneBand);
  stoneBand.connect(stoneLP);
  stoneLP.connect(noiseGain);
  noiseGain.connect(destination);

  // 2. Heavy stone mass rumble fading out cleanly (no click afterward)
  const rumbleOsc = ctx.createOscillator();
  rumbleOsc.type = "triangle";
  rumbleOsc.frequency.setValueAtTime(72, now);
  rumbleOsc.frequency.linearRampToValueAtTime(48, now + duration);

  const rumbleGain = ctx.createGain();
  rumbleGain.gain.setValueAtTime(0.001, now);
  rumbleOsc.connect(rumbleGain);
  rumbleGain.gain.linearRampToValueAtTime(0.3, now + 0.1);
  rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  rumbleGain.connect(destination);

  noise.start(now);
  noise.stop(now + duration);
  rumbleOsc.start(now);
  rumbleOsc.stop(now + duration);
};
