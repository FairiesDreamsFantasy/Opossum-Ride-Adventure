/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Meditation BGM General Submodule
 * Provides base procedural meditation music architecture in key of E (Japanese Koto & Ambient drones).
 */

export class MeditationBMGEngine {
  public playEKeyMeditationDrone(context: AudioContext, destination: AudioNode): { stop: () => void } {
    const now = context.currentTime;
    const osc1 = context.createOscillator();
    const osc2 = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();

    // Key of E frequency base (~82.41 Hz E2, 329.63 Hz E4)
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(82.41, now);
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(329.63, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 3);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    osc1.start(now);
    osc2.start(now);

    return {
      stop: () => {
        try {
          const stopTime = context.currentTime;
          gain.gain.linearRampToValueAtTime(0.0001, stopTime + 2);
          setTimeout(() => {
            osc1.stop();
            osc2.stop();
            osc1.disconnect();
            osc2.disconnect();
          }, 2000);
        } catch (e) {}
      }
    };
  }

  /**
   * Complex multi-instrument drone synthesis for The Grand Orchard.
   * Features a base drone with 6 additional melodic/harmonic layers.
   * Duration is designed to be short and impactful with a persistent drone.
   */
  public playOrchardMeditationDrone(context: AudioContext, destination: AudioNode, baseFreq: number = 261.63): { stop: () => void } {
    const now = context.currentTime;
    const nodes: any[] = [];
    const masterGain = context.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.12, now + 1.5); // Slightly louder master for orchard
    masterGain.connect(destination);

    const createOsc = (type: OscillatorType, freq: number, g: number, detune: number = 0, attack: number = 2, release: number = 2) => {
      const osc = context.createOscillator();
      const gain = context.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      osc.detune.setValueAtTime(detune, now);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(g, now + attack);
      
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      nodes.push(osc, gain);
      return { osc, gain };
    };

    // 1. Core Deep Drone (Sub-Fundamental)
    createOsc("sine", baseFreq / 2, 0.45, -2, 3, 3);
    
    // 2. Main Harmonic Pad (Fundamental)
    createOsc("triangle", baseFreq, 0.2, 8, 2, 2);

    // 3. Ethereal Glass (Fifth)
    createOsc("sine", baseFreq * 1.5, 0.12, 12, 4, 4);

    // 4. Resonant Pulse (Octave + 7th for tension)
    const pulseOsc = context.createOscillator();
    const pulseGain = context.createGain();
    pulseOsc.type = "sawtooth";
    pulseOsc.frequency.setValueAtTime(baseFreq * 2.1, now); // Slightly off for "different note" feel
    pulseGain.gain.setValueAtTime(0, now);
    pulseOsc.connect(pulseGain);
    pulseGain.connect(masterGain);
    pulseOsc.start(now);
    
    // Periodic LFO for pulse (The "short" duration flickering)
    const lfo = context.createOscillator();
    const lfoGain = context.createGain();
    lfo.frequency.setValueAtTime(0.8, now);
    lfoGain.gain.setValueAtTime(0.015, now);
    lfo.connect(lfoGain);
    lfoGain.connect(pulseGain.gain);
    lfo.start(now);
    nodes.push(pulseOsc, pulseGain, lfo, lfoGain);

    // 5. Soft Woodwind Layer (Major Third)
    createOsc("sine", baseFreq * 1.2599, 0.08, -5, 2.5, 2.5);

    // 6. High Crystalline Sparkle (Harmonic 7)
    createOsc("sine", baseFreq * 7, 0.04, 0, 5, 5);
    
    // 7. Distinct Offset Drone (One track with a different note: Minor 2nd for "mysterious orchard" feel)
    createOsc("sine", baseFreq * 1.0595, 0.03, 0, 6, 6);

    return {
      stop: () => {
        const stopTime = context.currentTime;
        masterGain.gain.linearRampToValueAtTime(0, stopTime + 1.2);
        setTimeout(() => {
          nodes.forEach(n => { try { n.stop(); n.disconnect(); } catch(e) {} });
          masterGain.disconnect();
        }, 1300);
      }
    };
  }
}

export const globalMeditationBGM = new MeditationBMGEngine();
