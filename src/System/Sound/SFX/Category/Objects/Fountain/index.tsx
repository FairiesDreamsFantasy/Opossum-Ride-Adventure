/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OBJECT_SOUND_PROFILES } from "../General";

/**
 * Procedural Fountain Water Synthesizer
 * Generates realistic rushing and splashing water nodes via randomized LFO amplitude modulated white noise.
 */
export function playProceduralFountain(ctx: AudioContext, destination: AudioNode) {
  const profile = OBJECT_SOUND_PROFILES.fountain;
  const now = ctx.currentTime;
  const duration = 1.2; // brief bubbling burst

  // Create White Noise Buffer
  const bufferSize = ctx.sampleRate * duration;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const outputData = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    outputData[i] = Math.random() * 2 - 1;
  }

  const noiseNode = ctx.createBufferSource();
  noiseNode.buffer = noiseBuffer;

  // Dual filtration: high-pass for splash, bandpass for bubbling cavity body
  const hpFilter = ctx.createBiquadFilter();
  hpFilter.type = "highpass";
  hpFilter.frequency.setValueAtTime(600, now);

  const bpFilter = ctx.createBiquadFilter();
  bpFilter.type = "bandpass";
  bpFilter.frequency.setValueAtTime(profile.baseFrequency, now);
  bpFilter.Q.setValueAtTime(3, now);

  // Modulate bandpass frequency to simulate shifting bubbles
  bpFilter.frequency.linearRampToValueAtTime(profile.baseFrequency - 300, now + duration);

  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0.001, now);
  gainNode.gain.linearRampToValueAtTime(profile.gainScalar, now + 0.1);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

  // Setup bubble clusters (LFO amplitude modulation)
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.type = "sine";
  lfo.frequency.setValueAtTime(14, now); // 14 Hz rapid bubbling amplitude pulse
  lfoGain.gain.setValueAtTime(0.35, now);

  lfo.connect(lfoGain);
  lfoGain.connect(gainNode.gain);

  noiseNode.connect(hpFilter);
  hpFilter.connect(bpFilter);
  bpFilter.connect(gainNode);
  gainNode.connect(destination);

  lfo.start(now);
  noiseNode.start(now);

  lfo.stop(now + duration);
  noiseNode.stop(now + duration);
}
