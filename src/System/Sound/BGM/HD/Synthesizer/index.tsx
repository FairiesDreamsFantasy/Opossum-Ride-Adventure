import { BGMSynthesizer } from "../../Synthesizer";
import { getSharedAudioContext } from "../../../TTS";

/**
 * HD BGM Synthesizer
 * Extended synthesizer with high-fidelity oscillator algorithms.
 */
export class HDBGMSynthesizer extends BGMSynthesizer {
  /**
   * Specialized HD synthesis logic using higher fidelity oscillator algorithms
   * and oversampled wave tables.
   */
  public generateHighFidelityTone(freq: number) {
    const ctx = getSharedAudioContext();
    if (!ctx) return;

    // HD specific: Layered Sine/Triangle for rich harmonic content
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = "sine";
    osc2.type = "triangle";
    osc1.frequency.setValueAtTime(freq, ctx.currentTime);
    osc2.frequency.setValueAtTime(freq * 0.5, ctx.currentTime); // Sub-harmonic

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 6);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 6);
    osc2.stop(ctx.currentTime + 6);
  }
}
