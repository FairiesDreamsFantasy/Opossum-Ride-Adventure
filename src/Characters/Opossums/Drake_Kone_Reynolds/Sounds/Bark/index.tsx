/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural Bark Synthesis for Jack Opossum (Drake Kone-Reynolds).
 * Uses local Web Audio API frequency-swept oscillator nodes and shaped gain envelopes.
 * Completely offline, 100% mathematical, zero cloud or Babylon dependence.
 */
export const playDrakeBark = (
  ctx: AudioContext,
  isRetro: boolean = false,
  destination?: AudioNode
) => {
  try {
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;
    const dest = destination || ctx.destination;

    // Primary Jack Bark Oscillator (Deeper, robust acoustic sweep)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Bandpass filter for realistic animal chest-bark resonance
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(380, now);
    filter.Q.setValueAtTime(3.2, now);

    if (isRetro) {
      osc1.type = "square";
      osc2.type = "sawtooth";
    } else {
      osc1.type = "sawtooth";
      osc2.type = "triangle";
    }

    // Jack Bark Pitch Sweep (Quick attack sweep from 180Hz to 340Hz then down to 120Hz)
    osc1.frequency.setValueAtTime(190, now);
    osc1.frequency.exponentialRampToValueAtTime(340, now + 0.04);
    osc1.frequency.exponentialRampToValueAtTime(125, now + 0.16);

    osc2.frequency.setValueAtTime(140, now);
    osc2.frequency.exponentialRampToValueAtTime(280, now + 0.04);
    osc2.frequency.exponentialRampToValueAtTime(95, now + 0.16);

    // Dynamic Bark Gain Envelope
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.24, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    // Node routing
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(dest);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.19);
    osc2.stop(now + 0.19);
  } catch (err) {
    console.error("Error playing Drake bark sound:", err);
  }
};

export default playDrakeBark;
