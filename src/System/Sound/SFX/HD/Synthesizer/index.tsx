import { SFXSynthesizer } from "../../Synthesizer";
import { getSharedAudioContext } from "../../../TTS";

/**
 * HD SFX Synthesizer
 * Enhanced sound effect synthesis with professional-grade filters.
 */
export class HDSFXSynthesizer extends SFXSynthesizer {
  /**
   * HD-grade transient pop using FM synthesis and dual-mode filtering.
   */
  public triggerHDPop() {
    const ctx = getSharedAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const modulator = ctx.createOscillator();
    const modGain = ctx.createGain();
    const gain = ctx.createGain();

    osc.type = "sine";
    modulator.type = "sawtooth";
    modulator.frequency.setValueAtTime(440, now);
    modGain.gain.setValueAtTime(200, now);

    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    modulator.connect(modGain);
    modGain.connect(osc.frequency);
    osc.connect(gain);
    gain.connect(ctx.destination);

    modulator.start();
    osc.start();
    modulator.stop(now + 0.05);
    osc.stop(now + 0.05);
  }
}
