/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Angela's Riding Geometry & Proportions.
 * Height: 6 feet and 8 inches (80 inches).
 * Dignified, tall posture with expansive flowing skirt draping gracefully over opossum mounts.
 */
export const ANGELA_GEOMETRY = {
  heightFeet: "6'8\"",
  heightInches: 80,
  ridingOffset: {
    y: 1.35, // Higher elevation due to 6'8" tall stature
    z: -0.12 // Upright dignified posture
  },
  skirtDimensions: {
    baseRadius: 1.25,
    topRadius: 0.45,
    height: 1.15
  },
  torsoDimensions: {
    width: 0.72,
    height: 0.88,
    depth: 0.48
  },
  tiaraDimensions: {
    baseWidth: 0.42,
    peakHeight: 0.32,
    gemSize: 0.16
  },
  legSpan: 0.95,
  armReach: 0.82
};
