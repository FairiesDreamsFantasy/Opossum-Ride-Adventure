/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AtmosphericMetrics {
  airDensityKgM3: number;
  temperatureCelsius: number;
  pressureKPa: number;
}

/**
 * Atmospheric pressure decay profiles.
 */
export const DataAtmosphereProfiles = {
  /**
   * Calculates atmospheric metrics based on altitude/elevation (meters).
   * Models the troposphere standard pressure decay curve.
   */
  getAtmosphereByAltitude(altitudeMeters: number): AtmosphericMetrics {
    const seaLevelPressure = 101.325; // kPa
    const seaLevelTemp = 15.0; // Celsius
    const lapseRate = 0.0065; // C / m
    const airGasConstant = 287.05; // J / (kg * K)

    const tempK = (seaLevelTemp - lapseRate * altitudeMeters) + 273.15;
    const exponent = 9.80665 / (lapseRate * airGasConstant);
    const pressureKPa = seaLevelPressure * Math.pow(tempK / (seaLevelTemp + 273.15), exponent);

    // Ideal gas law: rho = p / (R * T)
    const airDensityKgM3 = (pressureKPa * 1000) / (airGasConstant * tempK);

    return {
      airDensityKgM3: parseFloat(airDensityKgM3.toFixed(4)),
      temperatureCelsius: parseFloat((tempK - 273.15).toFixed(2)),
      pressureKPa: parseFloat(pressureKPa.toFixed(3))
    };
  }
};
