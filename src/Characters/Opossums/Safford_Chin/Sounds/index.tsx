/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural Web Audio synthesizer generating Safford Chin's authentic opossum-like bark.
 * Models a focused resonant saw-pulse down-sweep simulating a builder jack opossum's vocal signature.
 */
export function playSaffordChinBark(ctx?: AudioContext, _isRetro: boolean = false, dest?: AudioNode) {
  try {
    const audioCtx = ctx || (typeof window !== "undefined" && ((window as any).AudioContext || (window as any).webkitAudioContext) ? new ((window as any).AudioContext || (window as any).webkitAudioContext)() : null);
    if (!audioCtx) return;
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    const output = dest || audioCtx.destination;
    const now = audioCtx.currentTime;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(270, now);
    osc.frequency.exponentialRampToValueAtTime(112, now + 0.13);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.23, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

    osc.connect(gain);
    gain.connect(output);

    osc.start(now);
    osc.stop(now + 0.13);
  } catch (e) {
    console.warn("Safford Chin vocal bark synthesis failed gracefully:", e);
  }
}

export const SaffordChinSounds = {
  playChatter: playSaffordChinBark
};

export default SaffordChinSounds;
