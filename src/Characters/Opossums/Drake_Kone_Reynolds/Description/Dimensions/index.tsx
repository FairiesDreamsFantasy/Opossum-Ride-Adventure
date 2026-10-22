/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const DRAKE_KONE_REYNOLDS_DIMENSIONS = {
  width: 28, // 28 inches body width
  length: 72, // 6 feet (72 inches) excluding head and tail
  headWidth: 26, // 26 inches head width
  headHeight: 36, // 36 inches head height excluding ears
  shoulderHeight: "4 feet and 0 inches",
  maxRiderHeight: {
    feet: 4,
    inches: 0
  },
  snoutScale: 0.9, // 10% shorter than Dagmar's snout length
  tailScale: 0.7, // Shortened by 30% for scale (short-tailed opossum subtype)
  furryFaceCoveragePercentage: 30,
  tailFurryPercentage: 5,
  stockyBuild: true,
  stripeCount: 7,
  stripeWidthInches: 7,
  stripeBorderCentimeters: 1
};

export default DRAKE_KONE_REYNOLDS_DIMENSIONS;
