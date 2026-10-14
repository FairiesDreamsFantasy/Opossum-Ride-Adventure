/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Texture Palette Definition
 * Manages material texture properties, bump mapping scales, and roughness coefficients.
 */
export const TexturePalette = {
  grass: {
    color: "#2e7d32",
    bump: 0.1,
    roughness: 0.9,
    description: "Slightly wet blades of wild grass."
  },
  stone: {
    color: "#424242",
    bump: 0.4,
    roughness: 0.7,
    description: "Rough paving slabs of aged granite."
  },
  snow: {
    color: "#e0f7fa",
    bump: 0.15,
    roughness: 0.5,
    description: "Crisp white layer of fresh winter snow."
  },
  mud: {
    color: "#4e342e",
    bump: 0.6,
    roughness: 0.95,
    description: "Viscous soft clay from swampy pathways."
  },
  wood: {
    color: "#5d4037",
    bump: 0.25,
    roughness: 0.8,
    description: "Knotted grain of structural mahogany."
  }
};
