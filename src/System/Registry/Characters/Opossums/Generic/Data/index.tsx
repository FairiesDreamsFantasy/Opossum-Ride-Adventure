/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Data Registry of Generic Opossums
 * Holds the actual scientific data structures.
 */
export const GenericOpossumsData = {
  id: "generic_opossums",
  description: "Registry for generic (non-named) opossums.",
  template: {
    id: "generic_opossum_template",
    name: "Generic Opossum",
    width: 36,
    length: 80,
    headWidth: 35,
    headHeight: 35,
    shoulderHeight: "5 feet",
    color: "Gray",
    eyeColor: "Dark",
    noseColor: "Pink",
    tailColor: "Pink",
    innerEarColor: "Pink",
    gender: "Variable"
  },
  variants: [
    { id: "natural_gray", color: "Gray" },
    { id: "natural_brown", color: "Brown" },
    { id: "natural_white", color: "White" },
    { id: "natural_light_brown", color: "Light-Brown" },
    { id: "natural_yellow", color: "Yellow" },
    { id: "natural_red", color: "Red" }
  ]
};
