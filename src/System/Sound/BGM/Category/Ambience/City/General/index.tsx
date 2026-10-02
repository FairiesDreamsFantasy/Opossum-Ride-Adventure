/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class CityAmbienceEngine {
  public static playCityRumble(context: AudioContext, destination: AudioNode): { stop: () => void } {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(65, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(300, now);

    gain.gain.setValueAtTime(0.08, now);

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
