/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

let cachedPastureNoiseBuffer: AudioBuffer | null = null;

function getPastureNoiseBuffer(ctx: AudioContext): AudioBuffer {
  if (!cachedPastureNoiseBuffer || cachedPastureNoiseBuffer.sampleRate !== ctx.sampleRate) {
    const length = Math.max(1, Math.floor(ctx.sampleRate * 0.35));
    cachedPastureNoiseBuffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = cachedPastureNoiseBuffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  return cachedPastureNoiseBuffer;
}

/**
 * GoatMovementSound
 * Synthesizes soft dual-clop caprine hooves (on pasture gravel or wooden ramps)
 * and quiet grass-nibbling graze rustles that never overpower ambience.
 */
export const GoatMovementSound = {
  playHoofClop(
    ctx: AudioContext,
    destination: AudioNode,
    distance: number = 0,
    isKid: boolean = false,
    onWoodRamp: boolean = false
  ): void {
    const now = ctx.currentTime;
    const falloff = Math.max(0.02, 1 / (1 + Math.max(0, distance) * 0.065));
    const maxGain = (isKid ? 0.026 : 0.036) * falloff;

    // Cloven dual-digit clop (0ms and ~28ms)
    const offsets = [0, 0.028];
    offsets.forEach((offset, idx) => {
      const t = now + offset;
      const basePitch = isKid ? 240 : onWoodRamp ? 155 : 115;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(basePitch * (idx === 0 ? 1.0 : 1.12), t);
      osc.frequency.exponentialRampToValueAtTime(basePitch * 0.45, t + 0.055);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(maxGain, t + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.065);

      osc.connect(gain);
      gain.connect(destination);
      osc.start(t);
      osc.stop(t + 0.075);

      if (onWoodRamp) {
        // Subtle hollow wood tap for climbing ramps
        const tapOsc = ctx.createOscillator();
        const tapGain = ctx.createGain();
        tapOsc.type = "sine";
        tapOsc.frequency.setValueAtTime(isKid ? 440 : 310, t);
        tapOsc.frequency.exponentialRampToValueAtTime(160, t + 0.045);
        tapGain.gain.setValueAtTime(0.0001, t);
        tapGain.gain.linearRampToValueAtTime(maxGain * 0.65, t + 0.004);
        tapGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
        tapOsc.connect(tapGain);
        tapGain.connect(destination);
        tapOsc.start(t);
        tapOsc.stop(t + 0.055);
      }
    });
  },

  playGrazeRustle(ctx: AudioContext, destination: AudioNode, distance: number = 0): void {
    const now = ctx.currentTime;
    const falloff = Math.max(0.02, 1 / (1 + Math.max(0, distance) * 0.075));
    const maxGain = 0.022 * falloff;

    const src = ctx.createBufferSource();
    src.buffer = getPastureNoiseBuffer(ctx);

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1650 + Math.random() * 350, now);
    filter.Q.setValueAtTime(2.8, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(maxGain, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(destination);
    src.start(now);
    src.stop(now + 0.2);
  }
};
