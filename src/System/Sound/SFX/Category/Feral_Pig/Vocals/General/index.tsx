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

  /**
   * Rhythmic snout-rooting forage snuffle while pigs nose through soil/brush.
   */
  public static playForageSnuffle(
    ctx: AudioContext,
    dest: AudioNode,
    gender: "Boar" | "Sow" = "Boar",
    pitchOffset: number = 1.0
  ) {
    const now = ctx.currentTime;
    const pulses = 2;
    for (let i = 0; i < pulses; i++) {
      const t = now + i * 0.11;
      const bufSize = Math.max(1, Math.floor(ctx.sampleRate * 0.075));
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let s = 0; s < bufSize; s++) {
        data[s] = (Math.random() * 2 - 1) * Math.sin((s / bufSize) * Math.PI);
      }

      const src = ctx.createBufferSource();
      src.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.setValueAtTime((gender === "Boar" ? 360 : 490) * pitchOffset, t);
      bp.Q.setValueAtTime(3.8, t);

      const g = ctx.createGain();
      g.gain.setValueAtTime(0.001, t);
      g.gain.linearRampToValueAtTime(0.24, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.075);

      src.connect(bp);
      bp.connect(g);
      g.connect(dest);
      src.start(t);

      // Soft low nasal oink undertone
      const osc = ctx.createOscillator();
      const og = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime((gender === "Boar" ? 110 : 155) * pitchOffset, t);
      osc.frequency.exponentialRampToValueAtTime((gender === "Boar" ? 82 : 120) * pitchOffset, t + 0.07);
      og.gain.setValueAtTime(0.001, t);
      og.gain.linearRampToValueAtTime(0.14, t + 0.015);
      og.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
      osc.connect(og);
      og.connect(dest);
      osc.start(t);
      osc.stop(t + 0.08);
    }
  }

  /**
   * Sharp territorial double-chuff challenge emitted when an alert feral pig locks onto an intruder.
   */
  public static playAlertChuff(
    ctx: AudioContext,
    dest: AudioNode,
    gender: "Boar" | "Sow" = "Boar",
    pitchOffset: number = 1.0
  ) {
    const now = ctx.currentTime;
    [0, 0.13].forEach((offset, idx) => {
      const t = now + offset;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const g = ctx.createGain();

      const startHz = (gender === "Boar" ? 155 : 225) * pitchOffset * (idx === 0 ? 1.0 : 1.08);
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(startHz, t);
      osc.frequency.exponentialRampToValueAtTime(startHz * 0.62, t + 0.1);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(gender === "Boar" ? 480 : 720, t);
      filter.Q.setValueAtTime(3.6, t);

      g.gain.setValueAtTime(0.001, t);
      g.gain.linearRampToValueAtTime(0.28, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.105);

      osc.connect(filter);
      filter.connect(g);
      g.connect(dest);
      osc.start(t);
      osc.stop(t + 0.115);
    });
  }
}
