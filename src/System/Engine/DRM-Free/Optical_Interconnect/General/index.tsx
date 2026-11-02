/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Optical_Interconnect General: Photonics Data Models
 */

export class OpticalInterconnectMath {
  /**
   * Models the bandwidth throughput of a multi-core 
   * photonic fiber interconnect.
   */
  public static calculateOpticalThroughput(coreCount: number, waveLengthCount: number): number {
    return coreCount * waveLengthCount * 100000; // Result in Mbps
  }

  /**
   * Calculates signal attenuation based on photon-scattering constants.
   */
  public static calculateAttenuation(lengthMeters: number): number {
    return 0.15 * lengthMeters; // Linear approximation for short-range optical PCB
  }
}

export default OpticalInterconnectMath;
