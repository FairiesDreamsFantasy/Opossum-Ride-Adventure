/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural Sliding Glass Door Close & Impact Synthesis
 * Creates the slide scraping sound followed by a solid mechanical impact thud.
 * 
 * @param ctx The active Web Audio API AudioContext instance
 * @param destination The AudioNode to connect the master output to
 */
export const playSlidingDoorClose = (ctx: AudioContext, destination: AudioNode) => {
  const noise = ctx.createBufferSource();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  // 1. Generate 0.8 seconds of scraping slide noise
  const bufferSize = ctx.sampleRate * 0.8;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  noise.buffer = buffer;

  // 2. Frequency sweep downwards as friction slows the door down (1500Hz -> 400Hz)
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1500, ctx.currentTime);
  filter.frequency.linearRampToValueAtTime(400, ctx.currentTime + 0.6);

  // 3. Friction Gain Envelope
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);

  // 4. Route friction noise
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(destination);

  // 5. Playback slide noise
  noise.start();
  noise.stop(ctx.currentTime + 0.8);

  // 6. Impact Synthesis: Triangle wave at 100Hz triggered right as the slide terminates
  const impact = ctx.createOscillator();
  const impactGain = ctx.createGain();
  
  impact.type = 'triangle';
  impact.frequency.setValueAtTime(100, ctx.currentTime + 0.7); // Precise impact sync at 0.7 seconds
  
  // Impact Gain Envelope (Instantaneous onset, quick decay)
  impactGain.gain.setValueAtTime(0, ctx.currentTime + 0.7);
  impactGain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.75);
  impactGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.9);
  
  // Route and start impact thud
  impact.connect(impactGain);
  impactGain.connect(destination);
  
  impact.start(ctx.currentTime + 0.7);
  impact.stop(ctx.currentTime + 0.9);
};
