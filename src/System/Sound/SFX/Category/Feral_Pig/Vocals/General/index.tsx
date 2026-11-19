/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GenericBoarSynthesizer } from "../../../../Synthesizer/Special_Effects/Animal/Generic/Pig/Boar";
import { GenericSowSynthesizer } from "../../../../Synthesizer/Special_Effects/Animal/Generic/Pig/Sow";

export class FeralPigVocalSound {
  public static playGrunt(ctx: AudioContext, dest: AudioNode, pitch: number = 1.0) {
    GenericBoarSynthesizer.playBoarGrunt(ctx, dest, pitch);
  }

  public static playLaneSwitchGrunt(
    ctx: AudioContext,
    dest: AudioNode,
    gender: "Boar" | "Sow" = "Boar",
    pitchOffset: number = 1.0
  ) {
    if (gender === "Sow") {
      GenericSowSynthesizer.playSowGrunt(ctx, dest, pitchOffset);
    } else {
      GenericBoarSynthesizer.playBoarGrunt(ctx, dest, pitchOffset);
    }
  }

  /**
   * Realistic dazed/winded feral pig vocalization when stunned by a compact jack's jump impact.
   */
  public static playStunned(
    ctx: AudioContext,
    dest: AudioNode,
    gender: "Boar" | "Sow" = "Boar",
    pitchOffset: number = 1.0
  ) {
    const now = ctx.currentTime;
    const duration = 0.58;

    // 1. Short winded nasal exhale burst on stun impact
    const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * 0.11));
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.45));
    }
    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = noiseBuffer;
    const breathFilter = ctx.createBiquadFilter();
    breathFilter.type = "bandpass";
    breathFilter.frequency.setValueAtTime(gender === "Boar" ? 440 : 620, now);
    breathFilter.Q.setValueAtTime(2.6, now);
    const breathGain = ctx.createGain();
    breathGain.gain.setValueAtTime(0.001, now);
    breathGain.gain.linearRampToValueAtTime(0.2, now + 0.015);
    breathGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);
    noiseSrc.connect(breathFilter);
    breathFilter.connect(breathGain);
    breathGain.connect(dest);
    noiseSrc.start(now);

    // 2. Groggy vocal fold slump (startled oof dropping into low dazed groan)
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const formantFilter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    const startFreq = (gender === "Boar" ? 210 : 320) * pitchOffset;
    const slumpFreq = (gender === "Boar" ? 68 : 108) * pitchOffset;

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(slumpFreq * 1.15, now + 0.14);
    osc.frequency.exponentialRampToValueAtTime(slumpFreq, now + duration);

    // Slow uneven daze tremor
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(7.5, now);
    lfoGain.gain.setValueAtTime(14, now);
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    formantFilter.type = "bandpass";
    formantFilter.frequency.setValueAtTime(gender === "Boar" ? 620 : 880, now);
    formantFilter.frequency.exponentialRampToValueAtTime(gender === "Boar" ? 250 : 360, now + duration);
    formantFilter.Q.setValueAtTime(3.2, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.03);
    gain.gain.setValueAtTime(0.22, now + 0.22);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(formantFilter);
    formantFilter.connect(gain);
    gain.connect(dest);

    osc.start(now);
    lfo.start(now);
    osc.stop(now + duration + 0.03);
    lfo.stop(now + duration + 0.03);
  }
}
