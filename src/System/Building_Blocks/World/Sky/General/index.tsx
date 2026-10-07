/**
 * Sky General Module
 * Atmospheric parameters, celestial calculations, and lighting gradients.
 */
export const SkyGeneral = {
  version: "1.0.0",
  cloudDensity: 0.25,
  fogDistance: 800,
  celestialBodies: ["Sun", "Moon", "Stars"],
  horizonGradient: {
    top: "#0f172a",
    bottom: "#1e1b4b"
  }
};
