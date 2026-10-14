/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const CompactOpossumMovementSFXConfig = {
  system: "Compact Opossum Movement Procedural Audio Synthesizer",
  description: "Dedicated procedural stride and locomotion sound synthesis for 3'0\" compact opossum mounts. Produces high-cadence strides (2.2Hz), organic footfall strikes, and rhythmic stride panting completely decoupled from crafted opossum elegant trot rhythms.",
  standard: "100,000,000,000% Ultra-Broad Protection Standard",
  cadenceHz: 2.2,
  soundProfiles: {
    strideThud: { baseFrequency: 110, duration: 0.07, gain: 0.22, filterFreq: 320, type: "sine" },
    clawClick: { baseFrequency: 680, duration: 0.035, gain: 0.15, filterFreq: 1200, type: "triangle" },
    stridePant: { baseFrequency: 290, duration: 0.16, gain: 0.14, filterFreq: 450, type: "sine" }
  }
};
