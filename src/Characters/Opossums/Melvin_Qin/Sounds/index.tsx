/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural Web Audio synthesizer generating Melvin Qin's realistic opossum bark.
 * Models a sharp down-chirping sawtooth sweep coupled with an acoustic throat formant envelope.
 */
export function playMelvinQinBark(ctx?: AudioContext, _isRetro: boolean = false, dest?: AudioNode) {
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
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(105, now + 0.14);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.24, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(output);

    osc.start(now);
    osc.stop(now + 0.14);
  } catch (e) {
    console.warn("Melvin Qin vocal bark synthesis failed gracefully:", e);
  }
}

export const MelvinQinSounds = {
  playChatter: playMelvinQinBark
};

export default MelvinQinSounds;
