/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * AIOpossumAcousticEngine
 * Scientific acoustic modeling for AI-Generated Opossums (Jills & Jacks).
 * Decoupled from crafted 400ms trot cadences and crude sine sweeps, implementing
 * bio-acoustic formant synthesis, natural downward marsupial chirp sweeps,
 * and adaptive scale-dependent locomotion kinematics.
 */
export class AIOpossumAcousticEngine {
  /**
   * Biomechanical stride frequency calculator for AI-Generated opossums.
   * Completely decoupled from crafted opossums' 400ms trot system.
   * Calculates stride delta distance based on sex, mass, and morphological scale.
   */
  public static calculateStrideFrequency(isJack: boolean, scale: number = 1.0): number {
    const clampedScale = Math.max(0.6, Math.min(1.4, scale));
    if (isJack) {
      // Jack Cadence: Robust, confident 480ms - 520ms step cycle
      // Stride delta ~2.35m * scale^0.33
      return 2.35 * Math.pow(clampedScale, 0.33);
    } else {
      // Jill Cadence: Agile, natural marsupial scurry (~310ms - 340ms cycle)
      // Stride delta ~1.68m * scale^0.33
      return 1.68 * Math.pow(clampedScale, 0.33);
    }
  }

  /**
   * Play dynamic bio-acoustic vocalization for an AI-Generated Opossum.
   */
  public static playVocalization(
    ctx: AudioContext,
    destination: AudioNode,
    sex: "Jill" | "Jack" | string,
    size: number = 1.0,
    vocalSource: "Local Synthesizer" | "Cloud Network Synthesis" | string = "Cloud Network Synthesis"
  ): { nodes: (AudioNode | OscillatorNode | GainNode)[]; endTime: number } {
    const isJill = sex === "Jill" || sex?.toLowerCase() === "female";
    const activeNodes: (AudioNode | OscillatorNode | GainNode)[] = [];
    const now = ctx.currentTime;
    const basePitch = Math.max(0.6, Math.min(1.4, size));
    const isCloud = vocalSource === "Cloud Network Synthesis";

    if (isJill) {
      // --- JILL BIO-ACOUSTIC VOCALIZATION ---
      // Authentic marsupial multi-chirp downward sweep (1350Hz -> 420Hz)
      const chirpCount = isCloud ? 6 : 4;
      const chirpInterval = 0.065;
      const chirpDuration = 0.038;
      const maxVol = isCloud ? 0.22 : 0.18;
      let maxEnd = now;

      // Pitch adjustment: larger size = slightly lower formant, smaller = higher
      const pitchMod = 1.0 / Math.pow(basePitch, 0.4);
      const startFreq = 1350 * pitchMod;
      const endFreq = 420 * pitchMod;

      for (let i = 0; i < chirpCount; i++) {
        const tStart = now + (i * chirpInterval);
        const tEnd = tStart + chirpDuration;
        if (tEnd > maxEnd) maxEnd = tEnd;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Sawtooth carrier provides rich marsupial harmonics, filtered smoothly
        osc.type = isCloud ? "sawtooth" : "triangle";
        osc.frequency.setValueAtTime(startFreq, tStart);
        osc.frequency.exponentialRampToValueAtTime(endFreq, tEnd);

        // Amplitude envelope: instant crisp attack, exponential biological decay
        gain.gain.setValueAtTime(0.001, tStart);
        gain.gain.linearRampToValueAtTime(maxVol, tStart + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0001, tEnd);

        if (isCloud) {
          // Formant throat filter for Cloud Network Synthesis
          const formantFilter = ctx.createBiquadFilter();
          formantFilter.type = "bandpass";
          formantFilter.frequency.setValueAtTime(1100 * pitchMod, tStart);
          formantFilter.Q.setValueAtTime(2.2, tStart);

          osc.connect(formantFilter);
          formantFilter.connect(gain);
          activeNodes.push(formantFilter);
        } else {
          osc.connect(gain);
        }

        gain.connect(destination);
        osc.start(tStart);
        osc.stop(tEnd);
        activeNodes.push(osc, gain);
      }

      return { nodes: activeNodes, endTime: maxEnd };
    } else {
      // --- JACK BIO-ACOUSTIC VOCALIZATION ---
      // Deep resonant masculine marsupial chuff/grunt (95Hz -> 50Hz with 320Hz throat resonance)
      const duration = isCloud ? 0.32 : 0.26;
      const endTime = now + duration;
      const pitchMod = 1.0 / Math.pow(basePitch, 0.45);

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const throatFilter = ctx.createBiquadFilter();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(95 * pitchMod, now);
      osc.frequency.linearRampToValueAtTime(52 * pitchMod, endTime);

      throatFilter.type = "lowpass";
      throatFilter.frequency.setValueAtTime(isCloud ? 360 : 310, now);
      throatFilter.Q.setValueAtTime(3.0, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(isCloud ? 0.24 : 0.19, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, endTime);

      osc.connect(throatFilter);
      throatFilter.connect(gain);
      gain.connect(destination);

      osc.start(now);
      osc.stop(endTime);
      activeNodes.push(osc, throatFilter, gain);

      return { nodes: activeNodes, endTime };
    }
  }

  /**
   * Play dynamic bio-acoustic jump launch sound for an AI-Generated Opossum.
   */
  public static playJumpImpulse(
    ctx: AudioContext,
    destination: AudioNode,
    sex: "Jill" | "Jack" | string,
    size: number = 1.0
  ): { nodes: (AudioNode | OscillatorNode | GainNode)[]; endTime: number } {
    const isJill = sex === "Jill" || sex?.toLowerCase() === "female";
    const now = ctx.currentTime;
    const basePitch = Math.max(0.6, Math.min(1.4, size));
    const activeNodes: (AudioNode | OscillatorNode | GainNode)[] = [];

    if (isJill) {
      // Agile parabolic spring impulse
      const duration = 0.28;
      const endTime = now + duration;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(220 / basePitch, now);
      osc.frequency.exponentialRampToValueAtTime(580 / basePitch, endTime);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, endTime);

      osc.connect(gain);
      gain.connect(destination);
      osc.start(now);
      osc.stop(endTime);
      activeNodes.push(osc, gain);
      return { nodes: activeNodes, endTime };
    } else {
      // Grounded masculine spring impulse
      const duration = 0.35;
      const endTime = now + duration;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(110 / basePitch, now);
      osc.frequency.exponentialRampToValueAtTime(320 / basePitch, endTime);

      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, endTime);

      osc.connect(gain);
      gain.connect(destination);
      osc.start(now);
      osc.stop(endTime);
      activeNodes.push(osc, gain);
      return { nodes: activeNodes, endTime };
    }
  }
}

export default AIOpossumAcousticEngine;
