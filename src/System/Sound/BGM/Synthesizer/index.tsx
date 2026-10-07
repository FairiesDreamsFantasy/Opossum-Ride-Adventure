/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from './General';
export * from './Classic_Synthesizer';
export * from './Ultra_Modules';

export class BGMSynthesizer {
  protected activeVoices: { source: OscillatorNode | AudioBufferSourceNode; gain: GainNode; endTime: number }[] = [];

  public stopAll() {
    this.activeVoices.forEach(v => {
      try {
        if ('stop' in v.source) v.source.stop();
        v.source.disconnect();
        v.gain.disconnect();
      } catch (e) {}
    });
    this.activeVoices = [];
  }
}
