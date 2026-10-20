/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class ForestAmbienceEngine {
  public static playForestBreeze(context: AudioContext, destination: AudioNode): { stop: () => void } {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(120, now);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(400, now);
    filter.Q.setValueAtTime(0.5, now);

    gain.gain.setValueAtTime(0.1, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    osc.start(now);

    return {
      stop: () => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {}
      }
    };
  }
}
