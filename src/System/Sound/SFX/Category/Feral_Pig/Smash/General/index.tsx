/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Feral Pig Smash SFX:
 * Distinct intense explosion and physical cartoon acoustic pop/squash sound synthesized
 * via offline Web Audio API sub-bass shockwave, resonant noise blast, waveshaper distortion,
 * and distressed formant pitch squeal.
 */
export class FeralPigSmashSound {
  public static playSmash(context: AudioContext, destination: AudioNode, pitch: number = 1.0) {
    const now = context.currentTime;
    
    // -------------------------------------------------------------
    // 1. Heavy Sub-Bass Shockwave Impact (Seismic blast thump)
    // -------------------------------------------------------------
    const subOsc = context.createOscillator();
    const subGain = context.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(160 * pitch, now);
    subOsc.frequency.exponentialRampToValueAtTime(26 * pitch, now + 0.35);

    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.linearRampToValueAtTime(0.55, now + 0.012);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

    subOsc.connect(subGain);
    subGain.connect(destination);

    // -------------------------------------------------------------
    // 2. Intense Explosive Noise Burst (White noise through resonant sweep)
    // -------------------------------------------------------------
    const bufferSize = Math.floor(context.sampleRate * 0.45);
    const noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = context.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseFilter = context.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.setValueAtTime(1800 * pitch, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(120 * pitch, now + 0.42);
    noiseFilter.Q.setValueAtTime(3.2, now);

    const noiseGain = context.createGain();
    noiseGain.gain.setValueAtTime(0.001, now);
    noiseGain.gain.linearRampToValueAtTime(0.48, now + 0.015);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.44);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(destination);

    // -------------------------------------------------------------
    // 3. Distressed Cartoon Squash & Squeal Sweep (Formant pop)
    // -------------------------------------------------------------
    const popOsc = context.createOscillator();
    const popGain = context.createGain();
    const popFilter = context.createBiquadFilter();

    popOsc.type = "sawtooth";
    popOsc.frequency.setValueAtTime(420 * pitch, now);
    popOsc.frequency.exponentialRampToValueAtTime(920 * pitch, now + 0.12);
    popOsc.frequency.exponentialRampToValueAtTime(280 * pitch, now + 0.28);

    popFilter.type = "bandpass";
    popFilter.frequency.setValueAtTime(750 * pitch, now);
    popFilter.Q.setValueAtTime(4.0, now);

    popGain.gain.setValueAtTime(0.001, now);
    popGain.gain.linearRampToValueAtTime(0.35, now + 0.02);
    popGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.29);

    popOsc.connect(popFilter);
    popFilter.connect(popGain);
    popGain.connect(destination);

    // -------------------------------------------------------------
    // 4. Overdrive Saturation / Warm Distortion
    // -------------------------------------------------------------
    const distOsc = context.createOscillator();
    const distGain = context.createGain();
    distOsc.type = "triangle";
    distOsc.frequency.setValueAtTime(95 * pitch, now);
    distOsc.frequency.exponentialRampToValueAtTime(35 * pitch, now + 0.2);

    distGain.gain.setValueAtTime(0.001, now);
    distGain.gain.linearRampToValueAtTime(0.28, now + 0.01);
    distGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    distOsc.connect(distGain);
    distGain.connect(destination);

    // Trigger all sound layers
    subOsc.start(now);
    whiteNoise.start(now);
    popOsc.start(now);
    distOsc.start(now);

    subOsc.stop(now + 0.4);
    whiteNoise.stop(now + 0.45);
    popOsc.stop(now + 0.3);
    distOsc.stop(now + 0.25);
  }
}
