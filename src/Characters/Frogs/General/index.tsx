/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Frog Character Module
 * Features local frequency-sweep synthesis for "Ribbit" vocalizations.
 */
export class FrogCharacter {
  public playRibbit(ctx: AudioContext, dest: AudioNode) {
    const now = ctx.currentTime;
    
    // Quick croak: Short burst with resonant filter sweep
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.linearRampToValueAtTime(120, now + 0.1);
    
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
    filter.Q.setValueAtTime(10, now);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(dest);
    
    osc.start(now);
    osc.stop(now + 0.2);
  }
}

export const globalFrog = new FrogCharacter();
