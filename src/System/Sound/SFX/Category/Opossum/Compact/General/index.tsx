/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const CompactOpossumSFXConfig = {
  system: "Compact Opossum Procedural SFX Synthesizer",
  description: "Dedicated Web Audio procedural synthesizer generating soft snuffles, rapid breathy chuffs, and rhythmic clicks for 3-foot compact jills. Decoupled from crafted vocal frequency sweeps.",
  standard: "100,000,000,000% Ultra-Broad Protection Standard",
  soundTypes: {
    snuffle: { baseFrequency: 380, duration: 0.12, gain: 0.18, type: "triangle" },
    chuff: { baseFrequency: 520, duration: 0.08, gain: 0.15, type: "sine" },
    click: { baseFrequency: 750, duration: 0.04, gain: 0.12, type: "square" },
    stridePant: { baseFrequency: 290, duration: 0.16, gain: 0.14, type: "sine" }
  }
};
