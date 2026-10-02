/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MonkeyJumpOptions {
  pitch?: number; // Base frequency multiplier
  velocity?: number; // Jump speed (0.5 to 2.0)
  volume?: number;
  style?: "acrobatic_vault" | "branch_spring" | "panic_hop" | "canopy_glide";
}

export const MonkeyJumpGeneral = {
  name: "Monkey Jump SFX General Registry",
  description: "Procedural synthesis routines for monkey acrobatic leaps, canopy vaults, and spring jumps.",
  defaults: {
    duration: 0.36,
    baseFreqHz: 320,
    peakFreqHz: 920,
    springModHz: 28
  }
};
