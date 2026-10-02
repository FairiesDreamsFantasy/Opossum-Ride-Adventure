/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Classical and Statistical Thermodynamics Engine.
 * Formulates temperature distributions, heat dissipation, atmospheric thermal lapse rates,
 * and Stefan-Boltzmann radiative transfer for environments and opossum energetics.
 */
export class ThermodynamicsEngine {
  /** Stefan-Boltzmann Constant (W / (m^2 * K^4)) */
  public static readonly SIGMA = 5.670374419e-8;

  /** Standard Tropospheric Lapse Rate (K / m) */
  public static readonly LAPSE_RATE = 0.0065;

  /** Universal Gas Constant R (J / (mol * K)) */
  public static readonly R_GAS = 8.314462618;

  /**
   * Heat transfer via 1D conduction (Fourier's Law):
   * q = -k * A * (dT / dx)
   */
  public static heatConduction(k: number, area: number, deltaT: number, thickness: number): number {
    if (thickness <= 1e-6) return 0;
    return (k * area * deltaT) / thickness;
  }

  /**
   * Stefan-Boltzmann Radiative Heat Loss:
   * P = epsilon * sigma * A * (T_body^4 - T_ambient^4)
   * Essential for modeling fur insulation and nocturnal thermal retention for the 16 opossums.
   */
  public static netRadiationPower(
    emissivity: number,
    surfaceArea: number,
    tBodyKelvin: number,
    tAmbientKelvin: number
  ): number {
    const t4Body = Math.pow(tBodyKelvin, 4);
    const t4Ambient = Math.pow(tAmbientKelvin, 4);
    return emissivity * this.SIGMA * surfaceArea * (t4Body - t4Ambient);
  }

  /**
   * Altitude-dependent temperature model based on standard atmospheric lapse:
   * T(h) = T_sea_level - L * h
   */
  public static altitudeTemperature(seaLevelTempKelvin: number, altitudeMeters: number): number {
    return Math.max(0, seaLevelTempKelvin - this.LAPSE_RATE * Math.max(0, altitudeMeters));
  }

  /**
   * Barometric atmospheric pressure equation:
   * P = P0 * exp(-M * g * h / (R * T))
   */
  public static barometricPressure(
    seaLevelPressurePa: number,
    altitudeMeters: number,
    tempKelvin: number,
    molarMassAir: number = 0.0289644, // kg/mol
    gravity: number = 9.80665
  ): number {
    return seaLevelPressurePa * Math.exp((-molarMassAir * gravity * altitudeMeters) / (this.R_GAS * tempKelvin));
  }

  /**
   * Sensible heat exchange: Q = m * c * deltaT
   */
  public static sensibleHeat(massKg: number, specificHeatCapacity: number, deltaTKelvin: number): number {
    return massKg * specificHeatCapacity * deltaTKelvin;
  }
}
