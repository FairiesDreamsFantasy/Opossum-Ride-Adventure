/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Opossum Ride Adventure - Game Boot General Registry
 * Defines mathematical initialization vectors and scientific boot states.
 */

export enum BootPhase {
  STASIS = 0,
  VALIDATION = 1,
  ORCHESTRATION = 2,
  RESOLVING = 3,
  ACTIVE = 4,
  FAILURE = -1
}

export interface BootProgress {
  phase: BootPhase;
  completionPercentage: number; // 0.0 to 1.0
  activeModule: string;
  timestamp: number;
}

export const INITIAL_BOOT_PROGRESS: BootProgress = {
  phase: BootPhase.STASIS,
  completionPercentage: 0.0,
  activeModule: "None",
  timestamp: Date.now()
};

export const BOOT_CONSTANTS = {
  MIN_INITIALIZATION_TIME_MS: 500, // Scientific buffer for stable mount
  REQUIRED_MEMORY_HEADROOM_MB: 50,
  STABILITY_THRESHOLD: 0.999
};
