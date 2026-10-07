/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural Sliding Glass Door Open Synthesis
 * Creates the scraping sound of a sliding door opening on metal tracks.
 * 
 * @param ctx The active Web Audio API AudioContext instance
 * @param destination The AudioNode to connect the master output to (e.g., master gain or compressor)
 */
export const playSlidingDoorOpen = (ctx: AudioContext, destination: AudioNode) => {
  const noise = ctx.createBufferSource();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  // 1. Generate 1.5 seconds of high-fidelity white noise
  const bufferSize = ctx.sampleRate * 1.5;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  noise.buffer = buffer;

  // 2. Linear frequency sweep to simulate the sliding door picking up speed (800Hz -> 1500Hz)
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, ctx.currentTime);
  filter.frequency.linearRampToValueAtTime(1500, ctx.currentTime + 1.2);

  // 3. Gain envelope (Fade-in then slow exponential decay)
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);

  // 4. Node routing
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(destination);

  // 5. Playback schedule
  noise.start();
  noise.stop(ctx.currentTime + 1.5);
};
