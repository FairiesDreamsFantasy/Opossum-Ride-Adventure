/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AudioBitDepth,
  PRIMARY_BIT_DEPTH,
  FLOORING_SURFACE_PROFILES_64BIT,
  FlooringSurfaceSoundProfile,
  quantizeAudioParameter
} from "./General";

export * from "./General";

export class FlooringSpecificSoundSystem {
  private currentBitDepth: AudioBitDepth = PRIMARY_BIT_DEPTH;

  public setBitDepth(bitDepth: AudioBitDepth) {
    this.currentBitDepth = bitDepth;
  }

  public getBitDepth(): AudioBitDepth {
    return this.currentBitDepth;
  }

  public getSurfaceProfile(surfaceKey: string, customBitDepth?: AudioBitDepth): FlooringSurfaceSoundProfile {
    const bitDepth = customBitDepth ?? this.currentBitDepth;
    const lowerKey = surfaceKey.toLowerCase();
    const profileKey = Object.keys(FLOORING_SURFACE_PROFILES_64BIT).find(k => lowerKey.includes(k)) || "soil";
    const baseProfile = FLOORING_SURFACE_PROFILES_64BIT[profileKey];

    if (bitDepth === 64) {
      return baseProfile;
    }

    return {
      ...baseProfile,
      bitDepth,
      frequencyHz: quantizeAudioParameter(baseProfile.frequencyHz, bitDepth),
      qualityFactor: quantizeAudioParameter(baseProfile.qualityFactor, bitDepth),
      gainScalar: quantizeAudioParameter(baseProfile.gainScalar, bitDepth),
      thudFrequencyHz: quantizeAudioParameter(baseProfile.thudFrequencyHz, bitDepth),
      resonanceDamping: quantizeAudioParameter(baseProfile.resonanceDamping, bitDepth)
    };
  }
}

export const flooringSpecificSoundSystem = new FlooringSpecificSoundSystem();
