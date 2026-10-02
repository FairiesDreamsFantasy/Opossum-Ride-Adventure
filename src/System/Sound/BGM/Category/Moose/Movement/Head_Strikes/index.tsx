/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural head strikes: hollow bone click and heavy clattering resonating frequencies of antlers
 */
export const playHeadStrike = (context: AudioContext, destination: AudioNode, startTime: number) => {
  const now = startTime;

  // Sharp initial click transient
  const oscClick = context.createOscillator();
  const gainClick = context.createGain();
  oscClick.connect(gainClick);
  gainClick.connect(destination);

  oscClick.type = "sawtooth";
  oscClick.frequency.setValueAtTime(1200, now);
  oscClick.frequency.linearRampToValueAtTime(100, now + 0.05);

  gainClick.gain.setValueAtTime(0.4, now);
  gainClick.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  oscClick.start(now);
  oscClick.stop(now + 0.05);

  // Hollow resonant body thump
  const oscRes = context.createOscillator();
  const gainRes = context.createGain();
  oscRes.connect(gainRes);
  gainRes.connect(destination);

  oscRes.type = "triangle";
  oscRes.frequency.setValueAtTime(220, now);
  oscRes.frequency.linearRampToValueAtTime(80, now + 0.25);

  gainRes.gain.setValueAtTime(0.5, now);
  gainRes.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  oscRes.start(now);
  oscRes.stop(now + 0.26);

  // High-pitched wood-crack scatter
  const oscScatter = context.createOscillator();
  const gainScatter = context.createGain();
  oscScatter.connect(gainScatter);
  gainScatter.connect(destination);

  oscScatter.type = "square";
  oscScatter.frequency.setValueAtTime(800, now + 0.02);
  oscScatter.frequency.exponentialRampToValueAtTime(300, now + 0.12);

  gainScatter.gain.setValueAtTime(0.12, now + 0.02);
  gainScatter.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  oscScatter.start(now + 0.02);
  oscScatter.stop(now + 0.13);

  return { endTime: now + 0.26 };
};
