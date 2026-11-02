/**
 * Texture Palette General Module
 * Procedural surface textures for dirt, stone, wood fences, leaves, and pavement.
 */
export const TexturePaletteGeneral = {
  version: "1.0.0",
  textures: {
    stone: { roughness: 0.8, bumpScale: 0.15 },
    wood: { grainFrequency: 2.5, bumpScale: 0.08 },
    grass: { bladeDensity: 120, heightVariation: 0.2 },
    dirt: { grainScale: 0.05, dampness: 0.3 }
  }
};
