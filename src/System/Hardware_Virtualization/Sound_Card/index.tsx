/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VirtualSoundCardMetrics {
  activeSynthVoices: number;
  maxVoiceCapacity: number;
  bufferLatencyMs: number;
  dspUtilizationPercent: number;
}

export class VirtualSoundCardController {
  private maxVoiceCapacity = 32;

  public updateAudioMetrics(activeVoices: number, reverbWetMix: number): VirtualSoundCardMetrics {
    // Standard latency
    const baseLatency = 5.8; // ms
    const latencyJitter = Math.random() * 0.4;

    // DSP load scales with active voice counts and wet reverb mixing
    const dspLoad = (activeVoices / this.maxVoiceCapacity) * 40.0 + (reverbWetMix * 15.0);

    return {
      activeSynthVoices: Math.min(this.maxVoiceCapacity, activeVoices),
      maxVoiceCapacity: this.maxVoiceCapacity,
      bufferLatencyMs: Math.round((baseLatency + latencyJitter) * 10) / 10,
      dspUtilizationPercent: Math.min(100, Math.max(1, Math.round(dspLoad)))
    };
  }

  public getSoundCardSpec(): string {
    return `Virtual Stereo Audio Engine; DSP Synthesis Voices Limit: ${this.maxVoiceCapacity}; Resolution: 24-bit PCM`;
  }
}
