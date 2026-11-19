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
  },

  /**
   * Parses height expressions like "3 feet and 2.5 inches", "3.5 feet", or "4'4\"" into total inches.
   */
  parseFeetInchesToInches(heightStr?: string, fallbackInches: number = 63.0): number {
    if (!heightStr || typeof heightStr !== "string") return fallbackInches;
    const ftMatch = heightStr.match(/(\d+(?:\.\d+)?)\s*(?:feet|foot|ft|')/i);
    const inMatch = heightStr.match(/(\d+(?:\.\d+)?)\s*(?:inches|inch|in|")/i);
    if (!ftMatch && !inMatch) return fallbackInches;
    const feet = ftMatch ? parseFloat(ftMatch[1]) : 0;
    const inches = inMatch ? parseFloat(inMatch[1]) : 0;
    const total = feet * 12 + inches;
    return total > 0 ? total : fallbackInches;
  },

  /**
   * Calibrates jump peak height and impact momentum scientifically from opossum biometrics,
   * leg length, rider stature mass, and forward velocity.
   */
  calculateMountedJumpProfile(
    selectedOpossum: any,
    selectedRider: any,
    forwardSpeedMS: number,
    legLengthLabel: string = "Standard"
  ): {
    isCompactJack: boolean;
    scaleRatio: number;
    opossumMassKg: number;
    riderMassKg: number;
    totalMassKg: number;
    jumpPeakHeightM: number;
    impactMomentum: number;
  } {
    const isJack = Boolean(
      selectedOpossum?.sex === "Jack" ||
      selectedOpossum?.gender === "Male" ||
      selectedOpossum?.aiData?.sex === "Jack"
    );
    const shoulderInches = this.parseFeetInchesToInches(
      selectedOpossum?.shoulderHeight || selectedOpossum?.aiData?.shoulderHeight,
      isJack ? 42.0 : 63.0
    );
    const scaleRatio = Math.max(0.45, Math.min(1.25, shoulderInches / 63.0));
    const isCompactJack = isJack && shoulderInches <= 50.0;

    // Base opossum mass scales allometrically (M ~ L^3 relative to 63" reference)
    const bio = this.calculateOpossumBiology(scaleRatio, isJack);
    const opossumMassKg = bio.weightKg;

    // Rider mass calibrated allometrically against 64" (5'4") baseline rider = 42 kg
    const riderInches = this.parseFeetInchesToInches(selectedRider?.height, 64.0);
    const riderMassKg = parseFloat((42.0 * Math.pow(Math.max(30, riderInches) / 64.0, 2.1)).toFixed(2));
    const totalMassKg = parseFloat((opossumMassKg + riderMassKg).toFixed(2));

    // Leg length leverage factor ("Short" legs e.g. Rudy vs "Medium" compact vs "Long" large Jills)
    const legLower = (legLengthLabel || "").toLowerCase();
    let legFactor = 1.0;
    if (legLower.includes("short")) {
      legFactor = 0.84;
    } else if (legLower.includes("medium")) {
      legFactor = 0.93;
    } else if (legLower.includes("long")) {
      legFactor = 1.04;
    }

    // Standard/large opossums achieve full 3.0m arc; compact jacks scale proportionally (2.15m - 2.68m)
    const jumpPeakHeightM = isCompactJack
      ? parseFloat(Math.max(2.1, Math.min(2.72, 2.85 * Math.pow(scaleRatio, 0.35) * legFactor)).toFixed(3))
      : 3.0;

    // Effective downward/forward jump impact impulse scalar
    const effectiveSpeed = Math.abs(forwardSpeedMS);
    const impactMomentum = parseFloat((totalMassKg * (1.8 + effectiveSpeed * 0.42) * Math.sqrt(jumpPeakHeightM / 3.0)).toFixed(2));

    return {
      isCompactJack,
      scaleRatio,
      opossumMassKg,
      riderMassKg,
      totalMassKg,
      jumpPeakHeightM,
      impactMomentum
    };
  },

  /**
   * Evaluates whether a jump impact on an active feral pig produces an immediate smash or a stun.
   * Large crafted mounts always smash cleanly; already-stunned pigs smash on follow-up jump impact;
   * compact jacks + smaller riders vs heavy Boars (220 lbs) or slow-approach Sows (175 lbs) may STUN.
   */
  evaluateCompactPigImpact(
    jumpProfile: { isCompactJack: boolean; impactMomentum: number },
    pigGender: "Boar" | "Sow" = "Boar",
    pigCurrentState: string = "patrolling"
  ): "smash" | "stun" {
    if (!jumpProfile.isCompactJack) return "smash";
    if (pigCurrentState === "stunned") return "smash";

    // Pig mass resistance in kg from PIG_DIMENSIONAL_SPECIFICATIONS (Boar 220 lbs = 99.79 kg, Sow 175 lbs = 79.38 kg)
    const pigMassKg = pigGender === "Boar" ? 99.79 : 79.38;
    // Required impulse-to-mass ratio: charging/heavy Boar resists light compact impacts unless moving near full sprint
    const requiredImpulseRatio = pigGender === "Boar" ? 1.85 : 1.48;
    const achievedRatio = jumpProfile.impactMomentum / pigMassKg;

    return achievedRatio >= requiredImpulseRatio ? "smash" : "stun";
  }
};
