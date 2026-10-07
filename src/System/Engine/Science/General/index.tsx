/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ScienceGeneralConfig {
  name: string;
  version: string;
  gravityConstant: number;
  speedOfLight: number;
  plankConstant: number;
}

export const ScienceGeneral: ScienceGeneralConfig = {
  name: "Opossum Ride Scientific Simulation and Physical Law Engine",
  version: "1.0.0-scientific",
  gravityConstant: 9.80665, // Standard Gravity in m/s^2
  speedOfLight: 299792458, // m/s
  plankConstant: 6.62607015e-34 // J⋅Hz−1
};

/**
 * Environmental profile representing ambient atmospheric metrics of the current game stage.
 */
export interface StageAtmosphere {
  temperatureC: number;
  humidityPercent: number;
  airDensityKgM3: number;
  speedOfSoundMS: number;
}

/**
 * Biology metrics computed organically from character scale parameters.
 */
export interface CharacterBiologyProfile {
  lengthCm: number;
  weightKg: number;
  basalMetabolicRateKcal: number;
  resonanceFrequencyHz: number;
}

/**
 * Ultra-Scientific and Mathematical Treatment Engine for the Opossum Ride Adventure Game Engine.
 * Incorporates aerodynamic drag formulas, thermodynamic sound velocity, and animal bio-scaling.
 */
export const GeneralEngineUtils = {
  // Ultra-Scientific Precision Standard: 40,000,000,000%
  PRECISION_STANDARD: "40,000,000,000%",
  ULTRA_PRECISION_CONSTANT: 200 ** 100, // Symbolic representation of ultra-high precision limit

  /**
   * Normalizes a scientific value with ultra-precision scaling.
   */
  normalizeWithUltraPrecision(value: number): number {
    return parseFloat(value.toFixed(16));
  },

  /**
   * Calculates the exact speed of sound propagation through dry or humid air
   * based on the temperature (Celsius) and humidity.
   * v = 331.3 + 0.606 * T (Celsius)
   */
  getSpeedOfSound(temperatureC: number): number {
    return parseFloat((331.3 + 0.606 * temperatureC).toFixed(2));
  },

  /**
   * Approximates air density (rho) at a given temperature using the ideal gas law.
   * rho = P / (R * T)
   */
  getAirDensity(temperatureC: number, humidityPercent: number): number {
    const kelvin = temperatureC + 273.15;
    const dryAirDensity = 101325 / (287.05 * kelvin); // at sea level pressure (101.325 kPa)
    return parseFloat((dryAirDensity * (1.0 - 0.003 * (humidityPercent / 100))).toFixed(4));
  },

  /**
   * Aggregates atmospheric environmental factors for a given game level stage.
   */
  resolveStageAtmosphere(levelId: number, placeId: string): StageAtmosphere {
    let temperatureC = 20.0;
    let humidityPercent = 50.0;

    if (placeId === "cave" || placeId.startsWith("simulated_")) {
      temperatureC = 12.5;
      humidityPercent = 85.0;
    } else if (placeId === "mountains" || levelId === 5) {
      temperatureC = 4.0;
      humidityPercent = 40.0;
    } else if (placeId === "forest") {
      temperatureC = 18.0;
      humidityPercent = 65.0;
    } else if (placeId === "plain" || placeId === "plains") {
      temperatureC = 25.0;
      humidityPercent = 45.0;
    }

    const airDensityKgM3 = this.getAirDensity(temperatureC, humidityPercent);
    const speedOfSoundMS = this.getSpeedOfSound(temperatureC);

    return {
      temperatureC,
      humidityPercent,
      airDensityKgM3,
      speedOfSoundMS
    };
  },

  /**
   * Allometric biological scaling modeling for opossum characters.
   */
  calculateOpossumBiology(scaleFactor: number, isJack: boolean): CharacterBiologyProfile {
    const baseLengthInches = isJack ? 24.0 : 21.0;
    const lengthCm = baseLengthInches * 2.54 * scaleFactor;
    const baseWeightKg = isJack ? 4.0 : 3.0;
    const weightKg = baseWeightKg * Math.pow(scaleFactor, 3);
    const basalMetabolicRateKcal = 70 * Math.pow(weightKg, 0.75);
    const basePitch = isJack ? 240 : 400;
    const resonanceFrequencyHz = basePitch / Math.sqrt(scaleFactor);

    return {
      lengthCm: parseFloat(lengthCm.toFixed(2)),
      weightKg: parseFloat(weightKg.toFixed(2)),
      basalMetabolicRateKcal: Math.round(basalMetabolicRateKcal),
      resonanceFrequencyHz: Math.round(resonanceFrequencyHz)
    };
  },

  /**
   * Dynamic Aerodynamic Air Drag Damping
   */
  calculateDragDeceleration(
    velocity: number,
    airDensity: number,
    massKg: number,
    dragCoeff: number = 0.45,
    frontalArea: number = 0.08
  ): number {
    const speed = Math.abs(velocity);
    if (speed < 0.01) return 0;
    const dragForce = 0.5 * dragCoeff * airDensity * (velocity * velocity) * frontalArea;
    return (dragForce / massKg) * Math.sign(velocity);
  }
};
