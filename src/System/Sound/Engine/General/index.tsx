/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * High-fidelity acoustics physics and sound engineering simulation algorithms.
 */
export const SoundEngineGeneral = {
  /**
   * Calculates Sound Pressure Level (SPL) decibel attenuation over distance (Inverse Square Law).
   * SPL_d = SPL_ref - 20 * log10(d / d_ref)
   */
  calculateAttenuation(
    distance: number,
    referenceDistance: number = 1.0,
    referenceSplDb: number = 85.0
  ): number {
    if (distance <= referenceDistance) {
      return referenceSplDb;
    }
    // SPL attenuation formula
    const attenuation = 20 * Math.log10(distance / referenceDistance);
    return Math.max(0, referenceSplDb - attenuation);
  },

  /**
   * Computes the Doppler Effect frequency shift for moving sound sources (like monkeys or cars).
   * f_shifted = f_original * (v_sound + v_observer) / (v_sound - v_source)
   */
  calculateDopplerShift(
    originalFrequencyHz: number,
    sourceVelocityMS: number,
    observerVelocityMS: number,
    speedOfSoundMS: number = 343.0
  ): number {
    const numerator = speedOfSoundMS + observerVelocityMS;
    const denominator = speedOfSoundMS - sourceVelocityMS;
    
    if (denominator <= 0) {
      return originalFrequencyHz * 3; // Cap to prevent infinite frequency spikes near mach threshold
    }
    
    return parseFloat((originalFrequencyHz * (numerator / denominator)).toFixed(2));
  },

  /**
   * Sabine Formula for Reverberation Decay Time (RT60).
   * Computes the time (in seconds) required for sound pressure levels to drop by 60 decibels.
   * RT60 = 0.161 * (Room_Volume_m3 / Total_Absorption_Sabin)
   */
  calculateSabineReverbTime(
    volumeM3: number,
    surfaceAreaM2: number,
    averageAbsorptionCoefficient: number // Sabine absorption coefficient [0.01 to 0.99]
  ): number {
    const totalAbsorptionSabin = surfaceAreaM2 * Math.max(0.01, averageAbsorptionCoefficient);
    return parseFloat((0.161 * (volumeM3 / totalAbsorptionSabin)).toFixed(3));
  },

  /**
   * Approximates air sound absorption coefficient (decibels per meter) based on humidity.
   * Damp air absorbs high frequencies more heavily than dry air.
   */
  calculateAirAbsorptionDb(
    distanceM: number,
    frequencyHz: number,
    humidityPercent: number
  ): number {
    // Basic scientific model of frequency-dependent dampening relative to humidity
    const baseCoeff = (frequencyHz / 10000) * 0.05;
    const humidityFactor = 1.0 - (humidityPercent / 100) * 0.5;
    const totalDampeningDb = baseCoeff * humidityFactor * distanceM;
    return parseFloat(totalDampeningDb.toFixed(3));
  }
};
