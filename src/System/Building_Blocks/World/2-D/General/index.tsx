/**
 * 2-D General Module
 * Core configurations for 2D parallax rendering, HUD placement, and layer sorting.
 */
export const TwoDGeneral = {
  version: "1.0.0",
  projection: "Orthographic",
  units: "Pixels",
  layerGroups: ["Background", "Middle", "Foreground", "UI"],
  parallaxRatios: {
    sky: 0.1,
    distantHills: 0.3,
    gardenFence: 0.8,
    foreground: 1.0
  }
};
