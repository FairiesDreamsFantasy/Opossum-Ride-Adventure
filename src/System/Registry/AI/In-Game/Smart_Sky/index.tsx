/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const SmartSkyRegistry = {
  id: "smart-sky-registry",
  name: "Smart Sky Controller Config Registry",
  description: "System parameters for the real-time day/night cycle and atmosphere emulation",
  cycles: {
    Dawn: {
      label: "Dawn",
      ambientIntensity: 0.6,
      skyColor: "#FFDAB9",
      fogColor: "#FFCCAA",
      reverbWetMixMultiplier: 1.0
    },
    Day: {
      label: "Day",
      ambientIntensity: 1.0,
      skyColor: "#87CEEB",
      fogColor: "#EEEEEE",
      reverbWetMixMultiplier: 1.0
    },
    Dusk: {
      label: "Dusk",
      ambientIntensity: 0.8,
      skyColor: "#FF4500",
      fogColor: "#AA3300",
      reverbWetMixMultiplier: 1.1
    },
    Night: {
      label: "Night",
      ambientIntensity: 0.2,
      skyColor: "#000033",
      fogColor: "#000011",
      reverbWetMixMultiplier: 1.15
    }
  }
};
