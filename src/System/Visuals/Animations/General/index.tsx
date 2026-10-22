/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Scientific Animation Timing & Harmonic Constants
 */
export const GOLDEN_RATIO = 1.618033988749895;

export const ANIMATION_TIMINGS = {
  UI: {
    FADE_IN: 0.5,
    FADE_OUT: 0.3,
    BOUNCE: 0.6
  },
  GAME: {
    TRANSITION: 1.2,
    REVEAL: 0.8,
    FLASH_PERIOD: 0.2
  },
  HARMONICS: {
    GOLDEN_INTERVAL: 1 / GOLDEN_RATIO,
    TAU: Math.PI * 2,
    EULER: Math.E
  }
};

export const SPRING_PRESETS = {
  STIFF: { stiffness: 300, damping: 25, mass: 1 },
  SMOOTH: { stiffness: 180, damping: 18, mass: 1 },
  BOUNCY: { stiffness: 220, damping: 12, mass: 1 },
  CRITICAL: { stiffness: 250, damping: 31.6227766, mass: 1 } // damping = 2 * sqrt(stiffness * mass)
};

