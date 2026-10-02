/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Preserved Sliding Door Close Synthesis - Rastafarian Opossums In the Royal Queendom
 */

export const playRastafarianRoyalQueendomSlidingDoorClose = (ctx: AudioContext, destination: AudioNode) => {
  const now = ctx.currentTime;
  const duration = 0.6;
  
  const sampleRate = ctx.sampleRate;
  const bufferSize = Math.max(1, Math.floor(sampleRate * duration));
  const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(500, now);
  filter.frequency.exponentialRampToValueAtTime(350, now + duration * 0.8);
  filter.Q.setValueAtTime(3, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.15, now + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(destination);
  noise.start(now);
  noise.stop(now + duration);

  const clickOsc = ctx.createOscillator();
  const clickGain = ctx.createGain();
  clickOsc.type = "triangle";
  clickOsc.frequency.setValueAtTime(140, now + duration - 0.05);
  clickGain.gain.setValueAtTime(0.001, now);
  clickGain.gain.setValueAtTime(0.07, now + duration - 0.05);
  clickGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  clickOsc.connect(clickGain);
  clickGain.connect(destination);
  
  clickOsc.start(now);
  clickOsc.stop(now + duration + 0.02);
};
